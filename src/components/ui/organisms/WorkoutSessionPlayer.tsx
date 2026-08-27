import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../atoms/Button';
import { useAudioDucking } from '../../../hooks/useAudioDucking';
import { use3DAvatarMemory } from '../../../hooks/use3DAvatarMemory';
import { colors } from '../../../tokens/color-system';

export interface IWorkoutSessionPlayerProps {
  routineName: string;
  durationMinutes: number;
  onComplete: () => void;
}

export const WorkoutSessionPlayer: React.FC<IWorkoutSessionPlayerProps> = ({
  routineName,
  durationMinutes,
  onComplete,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { isDucked, triggerVoiceCue } = useAudioDucking();
  const { targetFPS } = use3DAvatarMemory();

  const handleStartCue = () => {
    setIsPlaying(true);
    triggerVoiceCue(3000);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.routineTitle}>{routineName}</Text>
      <Text style={styles.subtitle}>
        {durationMinutes} min session • 3D Avatar capped at {targetFPS} FPS
      </Text>

      <View style={styles.avatarContainer}>
        <Text style={styles.avatarPlaceholder}>
          [3D Avatar Demonstrator View]
        </Text>
        {isDucked ? (
          <Text style={styles.voiceCoachBadge}>
            🎙️ Voice Coach Active (Music Ducked 70%)
          </Text>
        ) : null}
      </View>

      <Button
        label={isPlaying ? 'Pause Workout' : 'Start Session'}
        onPress={isPlaying ? () => setIsPlaying(false) : handleStartCue}
      />
      {isPlaying ? (
        <View style={styles.finishContainer}>
          <Button label="Finish Workout" variant="secondary" onPress={onComplete} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: 20,
  },
  routineTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginBottom: 16,
  },
  avatarContainer: {
    height: 180,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarPlaceholder: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  voiceCoachBadge: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 8,
  },
  finishContainer: {
    marginTop: 10,
  },
});
