import { useState, useEffect, useCallback } from 'react';
import { fetchHealthMetrics, IHealthMetrics } from '../services/healthConnect';

/**
 * Wearable Aggregation Hook
 * Event-driven health metric synchronization with 15-minute sync budgeting.
 */
export function useWearableSync() {
  const [metrics, setMetrics] = useState<IHealthMetrics | null>(null);
  const [loading, setLoading] = useState(false);

  const syncMetrics = useCallback(async (force = false) => {
    setLoading(true);
    try {
      const data = await fetchHealthMetrics(force);
      setMetrics(data);
    } catch (err) {
      console.warn('Wearable sync failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    syncMetrics();
  }, [syncMetrics]);

  return { metrics, loading, syncMetrics };
}
