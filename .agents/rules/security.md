---
trigger: always_on
---

# SECURITY.MD

## 1. Core Security Directive

**All handling of sensitive user data, private keys, and credential processing must be managed exclusively by the backend/server side.**

## 2. Data Protection & Sensitive Fields

- **Sensitive Categories:** Weight, height, age, medical conditions (back pain, pelvic floor issues), health metrics, passwords, and tokens.
- **Encryption Standards:**
  - Data at Rest: PostgreSQL database disk encryption via Supabase.
  - Data in Transit: Mandatory HTTPS / TLS 1.3 for all REST and WebSocket connections.

## 3. Authentication & Authorization Rules

- **Row Level Security (RLS):** Every PostgreSQL table containing user data MUST have Supabase RLS enabled. Users can ONLY read or write their own records (`auth.uid() = user_id`).
- **Token Management:** JWTs must be stored securely using Expo SecureStore (Keychain on iOS, EncryptedSharedPreferences on Android). Never store JWTs in AsyncStorage.

## 4. API & AI Key Protection

- **Zero Client Exposure:** Secret keys (`SUPABASE_SERVICE_ROLE_KEY`, `AI_PARSER_API_KEY`) must NEVER exist in React Native client bundles or `EXPO_PUBLIC_` environment variables.
- **Input Sanitization:** User text sent for AI meal parsing must be sanitized on the server to prevent prompt injection attacks.
