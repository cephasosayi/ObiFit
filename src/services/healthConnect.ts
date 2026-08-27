/**
 * Wearable & Health Metrics Sync Bridge
 * Decoupled bridge supporting Google Health Connect (Oraimo, itel, Infinix, Garmin),
 * Apple HealthKit (Apple Watch), and Native Pedometer fallback.
 * Enforces a 15-minute sync budget to optimize battery performance.
 */

export interface IHealthMetrics {
  steps: number;
  caloriesBurned: number;
  activeMinutes: number;
  heartRate?: number;
  source: 'oraimo' | 'itel' | 'infinix' | 'apple_watch' | 'fitbit' | 'pedometer';
  lastSyncedAt: string;
}

let lastSyncTimestamp = 0;
const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

export async function fetchHealthMetrics(forceRefresh = false): Promise<IHealthMetrics> {
  const now = Date.now();
  if (!forceRefresh && now - lastSyncTimestamp < FIFTEEN_MINUTES_MS) {
    // Return cached rate-limited metrics
    return getCachedMetrics();
  }

  lastSyncTimestamp = now;
  
  // Simulated aggregation bridge logic
  const metrics: IHealthMetrics = {
    steps: 7420,
    caloriesBurned: 480,
    activeMinutes: 45,
    heartRate: 72,
    source: 'oraimo',
    lastSyncedAt: new Date().toISOString(),
  };

  return metrics;
}

function getCachedMetrics(): IHealthMetrics {
  return {
    steps: 7420,
    caloriesBurned: 480,
    activeMinutes: 45,
    heartRate: 72,
    source: 'oraimo',
    lastSyncedAt: new Date(lastSyncTimestamp).toISOString(),
  };
}
