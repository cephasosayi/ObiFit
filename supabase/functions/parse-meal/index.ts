import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { z } from 'https://deno.land/x/zod/mod.ts';

const RequestSchema = z.object({
  log_id: z.string().uuid(),
  raw_text: z.string().min(2).max(500),
  meal_type: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
});

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Auth Token' }), { status: 401 });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_ANON_KEY') || '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await req.json();
    const parseResult = RequestSchema.safeParse(body);
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid Payload', details: parseResult.error.issues }),
        { status: 400 }
      );
    }

    const { log_id, raw_text, meal_type } = parseResult.data;

    // AI Guardrail Prompt Construction with XML Delimiters
    const prompt = `Parse the following West African meal description into structured nutritional macros.
    User input: <user_input>${raw_text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</user_input>
    Respond ONLY in valid JSON with keys: meal_name, calories, protein_g, carbs_g, fat_g.`;

    // Simulated LLM (DeepSeek / Llama via Groq) JSON response
    const parsedMeal = {
      log_id,
      meal_name: raw_text,
      meal_type,
      calories: 620,
      protein_g: 38,
      carbs_g: 72,
      fat_g: 16,
      confidence_score: 0.94,
    };

    return new Response(JSON.stringify({ success: true, data: parsedMeal }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
});
