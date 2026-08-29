import { useState, useEffect, useCallback } from 'react';
import { encryptedStorage } from '../services/mmkvStorage';

export interface IActiveWorkoutState {
  routineId: string;
  routineTitle: string;
  startedAt: string;
  completedSets: boolean[];
  currentExerciseIndex: number;
  rpeRating?: 'easy' | 'just_right' | 'hard';
}

const STORAGE_KEY = 'active_workout_session_backup';

export function useWorkoutPersistence() {
  const [unfinishedSession, setUnfinishedSession] = useState<IActiveWorkoutState | null>(null);

  useEffect(() => {
    async function checkSavedSession() {
      try {
        const raw = await encryptedStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setUnfinishedSession(parsed);
        }
      } catch (err) {
        console.warn('Failed to check active workout session:', err);
      }
    }
    checkSavedSession();
  }, []);

  const saveActiveSession = useCallback(async (state: IActiveWorkoutState) => {
    try {
      await encryptedStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setUnfinishedSession(state);
    } catch (err) {
      console.warn('Failed to backup active workout state:', err);
    }
  }, []);

  const clearActiveSession = useCallback(async () => {
    try {
      await encryptedStorage.removeItem(STORAGE_KEY);
      setUnfinishedSession(null);
    } catch (err) {
      console.warn('Failed to clear workout backup:', err);
    }
  }, []);

  return {
    unfinishedSession,
    saveActiveSession,
    clearActiveSession,
  };
}
