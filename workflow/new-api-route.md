````markdown
# WORKFLOW: Creating a New API Route or Server Endpoint

## Objective

Establish a secure, idempotent, server-side API endpoint or Edge Function for ObiFit, guaranteeing zero client key exposure, strict payload validation, and server-side health data security.

---

## Step-by-Step Execution Workflow

### Step 1: Routing & Endpoint Placement

Determine the appropriate backend execution layer:

- **Direct PostgreSQL Query (Supabase RLS):** For standard CRUD operations where Row Level Security handles user isolation.
- **Supabase Edge Function (`supabase/functions/<route-name>`):** For AI processing, third-party API orchestration, sensitive calculations, or background jobs.

---

### Step 2: Server-Side Secret Isolation & Auth Verification

1. Ensure all secret keys (`SUPABASE_SERVICE_ROLE_KEY`, `AI_PARSER_API_KEY`) reside exclusively in server-side environment variables.
2. Validate incoming JWT authorization headers to identify the authenticated `user_id`.

```typescript
// supabase/functions/parse-meal/index.ts
import { serve } from "[https://deno.land/std@0.168.0/http/server.ts](https://deno.land/std@0.168.0/http/server.ts)";
import { createClient } from "[https://esm.sh/@supabase/supabase-js@2](https://esm.sh/@supabase/supabase-js@2)";

serve(async (req) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Missing Auth Token" }), {
      status: 401,
    });
  }

  // Initialize Supabase Auth Context
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
    });
  }

  // Continue to payload processing...
});
```
````

---

### Step 3: Payload Sanitization & Schema Validation

1. Use Zod schemas to validate and sanitize incoming client request bodies.
2. Reject invalid payloads immediately with HTTP `400 Bad Request`.
3. Wrap untrusted inputs (e.g., natural language food descriptions) in strict XML delimiters before passing them to external AI services.

```typescript
import { z } from "[https://deno.land/x/zod/mod.ts](https://deno.land/x/zod/mod.ts)";

const RequestSchema = z.object({
  log_id: z.string().uuid(),
  raw_text: z.string().min(2).max(500),
  meal_type: z.enum(["breakfast", "lunch", "dinner", "snack"]),
});

// Inside handler
const body = await req.json();
const parseResult = RequestSchema.safeParse(body);

if (!parseResult.success) {
  return new Response(
    JSON.stringify({
      error: "Invalid Payload",
      details: parseResult.error.issues,
    }),
    { status: 400 },
  );
}
```

---

### Step 4: Idempotent Database Operations

1. Use client-supplied UUIDs (`log_id`) as idempotency keys to prevent duplicate records during network retries.
2. Perform database mutations with conflict resolution.

```sql
-- Database Migration Example for Idempotency
INSERT INTO meal_logs (id, user_id, meal_type, raw_input_text)
VALUES (p_log_id, p_user_id, p_meal_type, p_raw_text)
ON CONFLICT (id) DO NOTHING;

```

---

### Step 5: Standardized Error Handling & Response Framing

Return predictable JSON HTTP response structures matching these status codes:

- **`200 OK` / `201 Created`:** Payload processing succeeded.
- **`400 Bad Request`:** Payload failed Zod schema validation.
- **`401 Unauthorized`:** Missing or expired user JWT.
- **`429 Too Many Requests`:** Per-user rate limit exceeded.
- **`500 Internal Server Error`:** Edge Function execution or downstream provider failed.

```typescript
return new Response(
  JSON.stringify({
    success: true,
    data: parsedMealData,
    log_id: parseResult.data.log_id,
  }),
  {
    status: 200,
    headers: { "Content-Type": "application/json" },
  },
);
```

---

### Step 6: Deployment & Security Checklist

- [ ] No API keys or service role secrets exposed to client-side packages.
- [ ] JWT authorization header verified before executing business logic.
- [ ] Input payload validated using Zod.
- [ ] Idempotency key (`log_id`) supported for offline sync compatibility.
- [ ] Database updates respect Row Level Security (RLS) policies (`auth.uid() = user_id`).
- [ ] Rate limiting configured on the Edge Function endpoint.

```

```
