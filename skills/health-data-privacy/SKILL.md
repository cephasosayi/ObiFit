# SKILL: Health Data Privacy & NDPR Compliance

## Context & Objectives

Protect user health records (weight, medical conditions, pelvic floor logs, back pain records) in compliance with NDPR and international privacy standards.

## Execution Rules

1. **Encrypted Local Storage:**
   - Use `react-native-mmkv` with a key stored in Expo `SecureStore` (iOS Keychain / Android EncryptedSharedPreferences) for all client-side cached health data.
   - **STRICTLY BANNED:** Storing health metrics, user tokens, or PII in standard `AsyncStorage`.

2. **PII Scrubbing & Telemetry:**
   - Strip all PII (emails, names, exact geolocation, health metrics) before dispatching error reports to monitoring services (e.g., Sentry).

3. **Client-Side Authorization Check:**
   - Before requesting or caching sensitive health records, verify active JWT validity locally.
