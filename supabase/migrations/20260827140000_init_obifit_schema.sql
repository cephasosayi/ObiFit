-- ObiFit Core Database Schema & Row Level Security (RLS) Policies
-- Migration: 20260827140000_init_obifit_schema.sql

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    fitness_goal TEXT,
    momentum_score INT DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view and update own profile"
    ON public.profiles
    FOR ALL
    USING (auth.uid() = id);

-- 2. Meal Logs Table (Idempotent UUID primary key log_id)
CREATE TABLE IF NOT EXISTS public.meal_logs (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    meal_name TEXT NOT NULL,
    meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
    calories INT NOT NULL,
    protein_g NUMERIC(6, 2) DEFAULT 0,
    carbs_g NUMERIC(6, 2) DEFAULT 0,
    fat_g NUMERIC(6, 2) DEFAULT 0,
    raw_input_text TEXT,
    is_synced BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.meal_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own meal logs"
    ON public.meal_logs
    FOR ALL
    USING (auth.uid() = user_id);

-- 3. Workout Logs Table
CREATE TABLE IF NOT EXISTS public.workout_logs (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    routine_name TEXT NOT NULL,
    duration_minutes INT NOT NULL,
    calories_burned INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own workout logs"
    ON public.workout_logs
    FOR ALL
    USING (auth.uid() = user_id);

-- 4. Health Metrics & Wearable Sync Table
CREATE TABLE IF NOT EXISTS public.health_metrics (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    steps INT DEFAULT 0,
    calories_burned INT DEFAULT 0,
    active_minutes INT DEFAULT 0,
    wearable_source TEXT,
    synced_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.health_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own health metrics"
    ON public.health_metrics
    FOR ALL
    USING (auth.uid() = user_id);
