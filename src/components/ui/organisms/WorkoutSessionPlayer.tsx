import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from '../atoms/Button';
import { useAudioDucking } from '../../../hooks/useAudioDucking';
import { use3DAvatarMemory } from '../../../hooks/use3DAvatarMemory';

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
    triggerVoiceCue(3000); // 70% audio ducking for 3s voice cue
  };

  return (
    <View className="p-6 bg-surface-container rounded-card border border-outline-variant mb-6 shadow-sm">
      <Text className="text-heading-lg font-bold text-text-primary mb-1">{routineName}</Text>
      <Text className="text-caption-sm text-text-secondary mb-4">
        {durationMinutes} min session • 3D Avatar capped at {targetFPS} FPS
      </Text>

      <View className="h-48 bg-surface-variant rounded-card items-center justify-center mb-4">
        <Text className="text-body-md text-text-secondary font-medium">
          [3D Avatar Demonstrator View]
        </Text>
        {isDucked ? (
          <Text className="text-caption-sm text-primary-container mt-2 font-bold">
            🎙️ Voice Coach Active (Music Ducked 70%)
          </Text>
        ) : null}
      </View>

      <Button
        label={isPlaying ? 'Pause Workout' : 'Start Session'}
        onPress={isPlaying ? () => setIsPlaying(false) : handleStartCue}
      />
      {isPlaying ? (
        <View className="mt-3">
          <Button label="Finish Workout" variant="secondary" onPress={onComplete} />
        </View>
      ) : null}
    </View>
  );
};
