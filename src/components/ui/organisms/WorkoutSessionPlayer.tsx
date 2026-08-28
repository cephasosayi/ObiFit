import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Button } from '../atoms/Button';
import { useAudioDucking } from '../../../hooks/useAudioDucking';
import { use3DAvatarMemory } from '../../../hooks/use3DAvatarMemory';
import { colors } from '../../../tokens/color-system';

export interface IWorkoutSessionPlayerProps {
  routineName: string;
  durationMinutes: number;
  targetMuscles?: { name: string; percentage: number }[];
  onComplete: () => void;
}

export const WorkoutSessionPlayer: React.FC<IWorkoutSessionPlayerProps> = ({
  routineName,
  durationMinutes,
  targetMuscles = [
    { name: 'Abdominals', percentage: 65 },
    { name: 'Lower Back', percentage: 35 },
  ],
  onComplete,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [restSeconds, setRestSeconds] = useState(55);
  const [completedSets, setCompletedSets] = useState<boolean[]>([true, true, false, false]);
  const { isDucked, triggerVoiceCue } = useAudioDucking();
  const { targetFPS } = use3DAvatarMemory();

  const handleStartCue = () => {
    setIsPlaying(true);
    triggerVoiceCue(3000);
  };

  const toggleSet = (index: number) => {
    const updated = [...completedSets];
    updated[index] = !updated[index];
    setCompletedSets(updated);
  };

  return (
    <View style={styles.card}>
      {/* Header Info */}
      <View style={styles.header}>
        <Text style={styles.routineTitle}>{routineName}</Text>
        <Text style={styles.subtitle}>
          🔥 {durationMinutes} min • 3D Mannequin active ({targetFPS} FPS)
        </Text>
      </View>

      {/* Target Muscles Heatmap Widget */}
      <View style={styles.muscleRow}>
        {targetMuscles.map((m, idx) => (
          <View key={idx} style={styles.muscleBadge}>
            <View style={styles.muscleGlowDot} />
            <Text style={styles.muscleText}>
              {m.name} <Text style={styles.musclePercent}>{m.percentage}%</Text>
            </Text>
          </View>
        ))}
      </View>

      {/* 3D Mannequin Viewport Studio */}
      <View style={styles.mannequinStudio}>
        <Text style={styles.mannequinTitle}>3D ANATOMICAL MANNEQUIN</Text>
        <Text style={styles.mannequinSub}>[ Bronze Male Mannequin • Active Muscle Heatmap ]</Text>

        {isDucked ? (
          <View style={styles.voiceBadge}>
            <Text style={styles.voiceText}>🎙️ Voice Coach Cues Active (Music Ducked 70%)</Text>
          </View>
        ) : null}
      </View>

      {/* Interactive Rest Time Timer */}
      {isPlaying ? (
        <View style={styles.timerContainer}>
          <Text style={styles.restLabel}>REST TIME</Text>
          <Text style={styles.timerDisplay}>
            00:{restSeconds < 10 ? `0${restSeconds}` : restSeconds}
          </Text>
          <View style={styles.timerControls}>
            <Pressable style={styles.timerBtn} onPress={() => setRestSeconds(Math.max(0, restSeconds - 10))}>
              <Text style={styles.timerBtnText}>- 10</Text>
            </Pressable>
            <Pressable style={[styles.timerBtn, styles.skipBtn]} onPress={() => setRestSeconds(0)}>
              <Text style={[styles.timerBtnText, styles.skipText]}>SKIP</Text>
            </Pressable>
            <Pressable style={styles.timerBtn} onPress={() => setRestSeconds(restSeconds + 10)}>
              <Text style={styles.timerBtnText}>+ 10</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      {/* Set & Rep Tracker */}
      <View style={styles.setRow}>
        <Text style={styles.setLabel}>Completed Sets:</Text>
        <View style={styles.setCheckboxes}>
          {completedSets.map((done, idx) => (
            <Pressable key={idx} style={[styles.setCircle, done && styles.setCircleDone]} onPress={() => toggleSet(idx)}>
              <Text style={[styles.setText, done && styles.setTextDone]}>{done ? '✓' : idx + 1}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <Button
        label={isPlaying ? 'Pause Routine' : 'Start 3D Session'}
        onPress={isPlaying ? () => setIsPlaying(false) : handleStartCue}
      />
      {isPlaying ? (
        <View style={styles.finishContainer}>
          <Button label="Finish Workout & Log" variant="outline" onPress={onComplete} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: 20,
  },
  header: {
    marginBottom: 12,
  },
  routineTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.onSurface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  muscleRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  muscleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  muscleGlowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neonOrange,
    marginRight: 6,
  },
  muscleText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurface,
  },
  musclePercent: {
    color: colors.neonOrange,
    fontWeight: '800',
  },
  mannequinStudio: {
    height: 200,
    backgroundColor: '#16080A', // Dark Crimson gradient studio tint
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    padding: 16,
  },
  mannequinTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  mannequinSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  voiceBadge: {
    marginTop: 12,
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  voiceText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onPrimaryContainer,
  },
  timerContainer: {
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  restLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.onSurfaceVariant,
    letterSpacing: 1.5,
  },
  timerDisplay: {
    fontSize: 38,
    fontWeight: '900',
    color: colors.neonOrange,
    marginVertical: 4,
    fontFamily: 'monospace',
  },
  timerControls: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  timerBtn: {
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  timerBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.onSurface,
  },
  skipBtn: {
    backgroundColor: colors.primaryContainer,
  },
  skipText: {
    color: colors.primary,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  setLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  setCheckboxes: {
    flexDirection: 'row',
    gap: 8,
  },
  setCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setCircleDone: {
    backgroundColor: colors.accentLime,
  },
  setText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.onSurfaceVariant,
  },
  setTextDone: {
    color: colors.onAccentLime,
  },
  finishContainer: {
    marginTop: 10,
  },
});
