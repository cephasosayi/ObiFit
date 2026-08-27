# Product Requirement Document (PRD): Localized Health & Fitness Platform

## 1. Document Overview & Objective

This Product Requirement Document defines the functional, technical, and architectural specifications for a cross-platform mobile health and fitness application tailored for West Africa and global audiences. The product bridges critical gaps in existing fitness apps through a West African nutrition database with AI natural language parsing, science-backed home and gym workout progressions, 3D animated biomechanical demonstrations, universal wearable synchronization (including Oraimo, itel, and Infinix ecosystems), and holistic health tracking.

---

## 2. Target Audience & Core Personas

- **Primary Target:** Individuals seeking home or gym workouts, calisthenics progressions, posture alignment, or pelvic floor (Kegel) exercises without requiring expensive gym equipment.
- **Secondary Target:** Users consuming West African diets (Jollof, swallows, oil-based soups) who cannot accurately track macros on existing westernized databases.
- **Hardware Profile:** Android and iOS users using budget-to-midrange smartwatches (Oraimo, itel, Infinix, Xiaomi) alongside premium wearables (Apple Watch, Fitbit, Garmin).

---

## 3. System Architecture & Technical Stack

| System Tier             | Technology Choice                       | Function & Integration Purpose                                                   |
| ----------------------- | --------------------------------------- | -------------------------------------------------------------------------------- |
| **Mobile Frontend**     | React Native (Expo / Bare Workflow)     | Cross-platform UI, native device sensor integration, BLE engine.                 |
| **Backend & Database**  | PostgreSQL via Supabase / Prisma        | Relational scale for user data, exercise taxonomies, dynamic food matrices.      |
| **AI Meal Parsing**     | Open-source LLM (DeepSeek-V3 / Llama 3) | Converts plain-text meal descriptions into structured JSON micro/macro logs.     |
| **Health Sync Bridge**  | Google Health Connect & Apple HealthKit | Aggregates data from Oraimo Health, Da Fit, My Health, Apple Watch, and Garmin.  |
| **3D Rendering Engine** | React Native Three / Skia               | Renders gender-selectable 3D exercise models with muscle highlights.             |
| **Audio Pipeline**      | Expo-AV with Audio Ducking              | Plays background music streams while auto-lowering volume during TTS voice cues. |

---

## 4. Functional Requirements & Feature Breakdown

### Module 1: Localized Nutrition Engine & AI Natural Language Parsing

- **West African Seed Database:** Pre-configured database containing verified nutritional entries for regional staples (Jollof Rice, Egusi, Efo Riro, Amala, Pounded Yam, Suya, Pepper Soup, Akara, Bole, etc.) with custom sliders to adjust palm oil and vegetable oil density.
- **Natural Language Text Ingestion:** Users log meals by typing natural descriptions (e.g., _"Breakfast: 2 medium wraps of amala with efo riro, two pieces of goat meat"_).
- **AI Extraction Payload:** The LLM converts unstructured text into a structured JSON response containing:
- Estimated weight in grams/milliliters.
- Macronutrient breakdown (Calories, Protein, Carbohydrates, Total Fat).
- Micronutrient breakdown (Fiber, Sodium, Iron, Potassium).

- **Visual Portioning UX:** Alternative logger using visual standards (fist-sized swallows, ladle volume counts, piece counts) for users without food scales.

### Module 2: Science-Backed Workout Engine & 3D Interactive Avatars

- **Disciplines & Equipment:** Calisthenics, traditional gym weightlifting, and minimal-equipment home setups (resistance bands, dumbbells, bodyweight, water jugs).
- **Targeting & Level Taxonomy:**
- _Anatomical Target:_ Isolation/Body-Part (Chest, Back, Quads, Glutes, Shoulders, Core) and Full Body options.
- _Progression Tiers:_ Beginner $\rightarrow$ Intermediate $\rightarrow$ Advanced, built on progressive overload principles (tempo, levers, volume accumulation).

- **Specialty Health Tracks (Unisex, Men's & Women's):**
- _Pelvic Floor & Kegel Exercises:_ Visual contraction and relaxation timers tailored for postpartum recovery, prostate health, and pelvic stability.
- _Posture Correction & Pain Relief:_ Target tracks for "tech neck," rounded shoulders, lower back pain decompression, and anterior pelvic tilt.
- _Stretching & Mobility:_ Desk stretches, bedtime cool-downs, and morning joint mobility sequences.

- **3D AI Demonstrator Avatars:** Gender-selectable (Male/Female) interactive 3D models with 360-degree rotation, zoom control, and highlighted muscle groups during movement execution.
- **Voice Coaching & Audio Ducking:** Integrated Text-to-Speech (TTS) audio cues for reps, rest intervals, and form tips. Automatically ducks (lowers volume by 70%) background audio during voice playback.

### Module 3: Universal Wearable Integration & Daily Tracking

- **Hardware Sync Framework:** Direct integration with **Google Health Connect** (Android) and **Apple HealthKit** (iOS). Synchronizes steps, heart rate, active energy, and sleep metrics recorded by Oraimo Health, Da Fit (itel/Infinix), Apple Fitness, and Fitbit.
- **Direct BLE Fallback:** Native Bluetooth Low Energy (BLE) listener to stream heart rate from standalone chest straps or smartwatches during live sessions.
- **Hydration Tracker:** Manual logging paired with smart reminder intervals and target calculation based on weight, climate, and daily activity.

### Module 4: Audio Engine, Gamification & Reminders

- **In-App Music Streamer:** Genre-based background audio player (Afrobeats, Amapiano, Lofi, Highlife, Gospel, Hip-Hop, Meditation). Supports native OS playback controls to bridge external apps (Spotify, Apple Music).
- **Momentum Streak System:** Holistic daily health score calculated across 4 pillars (Nutrition, Hydration, Steps, Workout completion). Prevents complete streak resets if a single habit target is missed.
- **Contextual Notification Engine:** Local scheduling for meal logs, hydration breaks, workout times, and posture reset prompts.

---

## 5. PostgreSQL Database Schema Definition

```sql
-- 1. USER PROFILES & GOALS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    weight_kg DECIMAL(5,2),
    height_cm DECIMAL(5,2),
    gender VARCHAR(20), -- 'male', 'female', 'other'
    primary_goal VARCHAR(50) -- 'fat_loss', 'muscle_gain', 'posture_fix', 'maintenance'
);

-- 2. NUTRITION DATABASE
CREATE TABLE foods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    is_west_african BOOLEAN DEFAULT TRUE,
    serving_unit VARCHAR(50), -- 'gram', 'wrap', 'ladle', 'piece'
    calories_per_unit DECIMAL(6,2),
    protein_g DECIMAL(5,2),
    carbs_g DECIMAL(5,2),
    fat_g DECIMAL(5,2),
    fiber_g DECIMAL(5,2),
    iron_mg DECIMAL(5,2),
    sodium_mg DECIMAL(5,2),
    potassium_mg DECIMAL(5,2)
);

-- 3. MEAL LOGGING & AI HISTORY
CREATE TABLE meal_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    meal_type VARCHAR(20), -- 'breakfast', 'lunch', 'dinner', 'snack'
    raw_input_text TEXT,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE meal_log_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meal_log_id UUID REFERENCES meal_logs(id) ON DELETE CASCADE,
    food_id UUID REFERENCES foods(id),
    quantity DECIMAL(5,2),
    calculated_calories DECIMAL(6,2),
    oil_density_ratio DECIMAL(3,2) DEFAULT 1.00
);

-- 4. EXERCISE TAXONOMY & SPECIALTY ROUTINES
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50), -- 'calisthenics', 'gym_weights', 'bodyweight', 'stretching'
    difficulty_level VARCHAR(20), -- 'beginner', 'intermediate', 'advanced'
    target_muscle_group VARCHAR(50), -- 'chest', 'back', 'legs', 'core', 'full_body'
    equipment_needed VARCHAR(50), -- 'none', 'bands', 'dumbbells', 'pullup_bar'
    is_kegel BOOLEAN DEFAULT FALSE,
    is_posture_fix BOOLEAN DEFAULT FALSE,
    is_back_pain_fix BOOLEAN DEFAULT FALSE,
    gender_target VARCHAR(20) DEFAULT 'unisex', -- 'male', 'female', 'unisex'
    avatar_model_male_key VARCHAR(255),
    avatar_model_female_key VARCHAR(255),
    voice_script TEXT
);

-- 5. WORKOUT LOGS & WEARABLE SYNC DATA
CREATE TABLE workout_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    total_volume_kg DECIMAL(8,2),
    calories_burned DECIMAL(6,2)
);

CREATE TABLE daily_health_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    metric_date DATE NOT NULL,
    step_count INT DEFAULT 0,
    water_intake_ml INT DEFAULT 0,
    synced_source VARCHAR(50), -- 'health_connect', 'healthkit', 'manual', 'ble'
    momentum_score INT DEFAULT 0,
    UNIQUE(user_id, metric_date)
);

```

---

## 6. Non-Functional Requirements & Performance Targets

- **Offline First Logging:** Meal inputs, water logs, and workout tracking must function offline and synchronize to PostgreSQL when connectivity is restored.
- **AI Processing Latency:** LLM food text parsing response time must remain under **1.8 seconds** via optimized inference endpoints (Groq / DeepSeek API).
- **3D Rendering Optimization:** 3D avatar animations must maintain **60 FPS** on mid-range Android devices with model asset sizes capped under **5 MB** per exercise file.
- **Battery Efficiency:** Background step counting and Health Connect sync must utilize less than **2% daily battery overhead**.

---

## 7. Delivery Roadmap & Key Milestones

```
Phase 1: Architecture & Nutrition Engine
├── Database deployment on PostgreSQL
├── React Native UI setup & Offline-first State Management
└── West African Food Database Seeding & Open-Source LLM API Parsing Endpoint

Phase 2: Exercise Engine, 3D Avatars & Specialty Routines
├── Exercise Taxonomy Seeding (Calisthenics, Gym, Posture, Kegel, Back Pain)
├── 3D Avatar Rendering Integration (Male/Female)
└── Audio Engine implementation (TTS Voice Cues + Music Ducking)

Phase 3: Wearable Integration & Metric Tracking
├── Android Health Connect & iOS HealthKit Bridge Integration
├── Verification for Oraimo (Oraimo Health) and itel/Infinix (Da Fit) data pass-through
└── Step, Water, and BLE Heart Rate tracking module

Phase 4: Gamification, Testing & Launch
├── Momentum Score Algorithm deployment
├── Contextual Push Notification engine
└── Closed Beta testing & Launch rollout

```
