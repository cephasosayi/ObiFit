import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { WorkoutSessionPlayer } from '../components/ui/organisms/WorkoutSessionPlayer';

export const WorkoutsScreen: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-surface p-6">
      <View className="mb-6">
        <Text className="text-heading-xl font-bold text-text-primary">Home Workouts</Text>
        <Text className="text-caption-sm text-text-secondary">Science-Backed Routines & 3D Avatar Cues</Text>
      </View>

      <WorkoutSessionPlayer
        routineName="Lower Back Pain Relief & Core Alignment"
        durationMinutes={15}
        onComplete={() => console.log('Routine finished!')}
      />

      <WorkoutSessionPlayer
        routineName="Pelvic Floor & Kegel Strength Routine"
        durationMinutes={10}
        onComplete={() => console.log('Kegel session finished!')}
      />
    </ScrollView>
  );
};
