# SKILL: API Management & Key Security

## Context & Objectives

Govern server-side API execution, secret isolation, payload validation, and external service resilience (DeepSeek, Groq, Supabase).

## Execution Rules

1. **Zero Client Secret Exposure:**
   - Private keys (`SUPABASE_SERVICE_ROLE_KEY`, `AI_PARSER_API_KEY`) must never exist in React Native client bundles or `EXPO_PUBLIC_` variables.
   - All third-party service calls must route through Supabase Edge Functions.

2. **Payload Validation & Sanitization:**
   - Incoming REST payloads to Edge Functions must be validated using Zod schemas before processing. Reject invalid payloads with HTTP `400 Bad Request`.

3. **Rate Limiting & Retries:**
   - Enforce per-user token bucket rate limiting on Edge Functions (e.g., 20 AI parsing calls per user/hour).
   - Wrap outbound third-party calls in an exponential backoff loop with jitter (max 3 retries).
