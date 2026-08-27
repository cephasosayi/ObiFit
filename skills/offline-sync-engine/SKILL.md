# SKILL: Offline Sync & Idempotent Conflict Resolution

## Context & Objectives

Enable full offline meal, hydration, and workout logging with background network synchronization and duplicate prevention.

## Execution Rules

1. **Local-First Writes:**
   - Write new logs immediately to local encrypted storage with `is_synced: false` and a client-generated UUID `log_id`.
   - Update UI states optimistically before network verification.

2. **Idempotent Sync Endpoints:**
   - Outbound sync payloads must pass the client-generated `log_id`.
   - PostgreSQL insert statements must handle conflicts gracefully:
     ```sql
     INSERT INTO meal_logs (id, user_id, ...) VALUES (...)
     ON CONFLICT (id) DO NOTHING;
     ```

3. **Queue Processing:**
   - Execute background sync using TanStack Query mutations when network state transitions to online.
