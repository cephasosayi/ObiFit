import { useState, useCallback, useEffect } from 'react';
import { Audio } from 'expo-av';

/**
 * Audio Focus & Voice Coaching Hook
 * Manages background music channels & TTS voice coaching with automated 70% audio ducking.
 */
export function useAudioDucking() {
  const [isDucked, setIsDucked] = useState(false);
  const [musicVolume, setMusicVolume] = useState(1.0);

  useEffect(() => {
    async function configureAudio() {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
        });
      } catch (error) {
        console.warn('Audio mode setup failed:', error);
      }
    }
    configureAudio();
  }, []);

  const triggerVoiceCue = useCallback(async (cueDurationMs: number = 3000) => {
    setIsDucked(true);
    setMusicVolume(0.3); // Duck music by 70%

    setTimeout(() => {
      setMusicVolume(1.0); // Restore music to 100%
      setIsDucked(false);
    }, cueDurationMs);
  }, []);

  return {
    isDucked,
    musicVolume,
    triggerVoiceCue,
  };
}
