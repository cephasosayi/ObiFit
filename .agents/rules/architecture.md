---
trigger: always_on
---

Markdown

# ARCHITECTURE.MD

## 1. System Overview

ObiFit is a client-heavy, offline-first React Native (Expo) mobile application supported by a Supabase (PostgreSQL) backend and server-side AI processing functions.

[React Native App (Expo)]
├── Native Bridges (Health Connect / HealthKit / BLE)
├── Local Storage Engine (Offline First Sync)
├── Audio & 3D Engine (Expo-AV + Three.js/Skia)
└── Supabase Client (Auth + Direct DB Reads/Writes)
└── Server-Side Edge Functions (DeepSeek/Llama AI Food Parser)

## 2. Client-Side Architecture (React Native)

- **State Management & Offline Storage:** Use Zustand for lightweight global app state and TanStack Query (React Query) paired with MMKV storage for API caching and offline-first queueing.
- **Wearable Synchronization Layer:**
  - Android: `react-native-health-connect` to aggregate data from Oraimo Health, Da Fit, My Health, and Garmin.
  - iOS: `react-native-health` (HealthKit) for Apple Watch and native health sync.
  - Native fallback: Sensor Pedometer API for steps when no wearable is connected.
- **Media & Audio Engine:** Custom React hooks managing `Expo-AV` for background genre music and Text-to-Speech (TTS) voice coaching with automated 70% audio ducking during cues.
- **3D Rendering Pipeline:** Low-polygon GLTF/GLB avatar models loaded via Three.js / React Native Skia, capped under 5MB per exercise asset.

## 3. Server-Side & AI Architecture

- **Database & Auth:** Supabase PostgreSQL with strict Row Level Security (RLS).
- **AI Food Parsing Pipeline:** Frontend sends raw text to a Supabase Edge Function -> Edge Function validates request, attaches secret API key, calls open-source LLM (DeepSeek/Llama via Groq) -> Parses response into structured JSON payload -> Saves to PostgreSQL and returns payload to client.

## 4. Architectural Rules

- **Offline First:** All user logs (food, water, workouts) write locally first before attempting network sync.
- **Zero Heavy Processing on Main Thread:** 3D rendering and sensor tracking must run off the main UI thread.
- **Decoupled Wearable Bridge:** Wearable sync logic must be abstract so new hardware APIs can be added without touching the UI screens.
