import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { WorkoutSessionPlayer } from '../components/ui/organisms/WorkoutSessionPlayer';
import { colors } from '../tokens/color-system';

export const WorkoutsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Home Workouts</Text>
        <Text style={styles.subtitle}>Science-Backed Routines & 3D Avatar Cues</Text>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.onSurface,
  },
  subtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
});
