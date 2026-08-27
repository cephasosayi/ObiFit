# SKILL: DB Migration & Schema Integrity Runner

## Context & Objectives

Ensure all database schema changes in Supabase (PostgreSQL) are repeatable, version-controlled, zero-downtime compliant, and strictly secured via Row Level Security (RLS).

## Execution Rules

1. **Migration File Generation:**
   - Write all migrations declaratively in `supabase/migrations/YYYYMMDDHHMMSS_<description>.sql`.
   - Never perform direct manual schema modifications on production database instances.

2. **Mandatory Security Policies (RLS):**
   - Every table creation statement MUST be immediately followed by:
     ```sql
     ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;
     CREATE POLICY "Users access own data" ON <table_name>
       FOR ALL USING (auth.uid() = user_id);
     ```

3. **Zero-Downtime Alterations:**
   - Schema updates must be non-breaking to existing offline clients.
   - New columns must be `NULLABLE` or carry default values.
   - Never drop or rename columns in a single migration without a multi-phase client deprecation cycle.
