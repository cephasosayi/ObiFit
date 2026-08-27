import { supabase } from './supabase';

export interface IMealParseRequest {
  log_id: string;
  raw_text: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface IMealParseResponse {
  meal_name: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  confidence_score: number;
}

/**
 * AI Meal Parser Service
 * Sends raw natural language descriptions to Supabase Edge Function.
 * Uses client UUID log_id for idempotency.
 */
export async function parseMealWithAI(payload: IMealParseRequest): Promise<IMealParseResponse> {
  const { data, error } = await supabase.functions.invoke('parse-meal', {
    body: payload,
  });

  if (error || !data) {
    throw new Error(error?.message || 'Failed to parse meal response from Edge Function');
  }

  return data as IMealParseResponse;
}
