# SKILL: Background Sensors & Battery Optimization

## Context & Objectives

Manage wearable data aggregation (Google Health Connect, Apple HealthKit, native pedometer) with minimal battery drain.

## Execution Rules

1. **Passive Synchronization:**
   - Use event-driven change listeners provided by `react-native-health-connect` and `react-native-health` instead of continuous polling timers.

2. **Sync Budgeting:**
   - Restrict background health metric fetching to a maximum frequency of **once every 15 minutes**.
   - Pause background synchronization immediately when the OS signals Low Power Mode.

3. **Battery Overhead Target:**
   - Total daily battery overhead for step tracking and health background sync must remain under **2%**.
