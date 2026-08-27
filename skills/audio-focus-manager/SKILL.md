# SKILL: Audio Focus & Interruption Manager

## Context & Objectives

Orchestrate background workout music channels alongside Text-to-Speech (TTS) voice cues without audio glitches or permanent volume loss.

## Execution Rules

1. **Native Audio Mode Setup:**
   - Configure Expo-AV audio modes globally:
     ```typescript
     Audio.setAudioModeAsync({
       allowsRecordingIOS: false,
       staysActiveInBackground: true,
       playsInSilentModeIOS: true,
       shouldDuckAndroid: true,
     });
     ```

2. **Audio Ducking Pipeline:**
   - During TTS voice coaching cues, duck background music volume by **70%** (`volume: 0.3`).
   - Restore music volume to **100%** (`volume: 1.0`) immediately upon voice cue completion or cancellation.

3. **Interruption Recovery:**
   - Listen for OS audio focus loss (e.g., phone calls, alarms). Pause playback automatically and resume state upon focus regain.
