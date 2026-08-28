import React, { useState } from 'react';
import { ScrollView, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors } from '../tokens/color-system';
import { WorkoutDetailScreen } from './WorkoutDetailScreen';

export const WorkoutsScreen: React.FC = () => {
  const [selectedRoutine, setSelectedRoutine] = useState<any | null>(null);

  const routines = [
    {
      id: 'back-relief',
      routineTitle: 'Lower Back Pain Relief & Core Alignment',
      category: 'Posture & Relief',
      durationMinutes: 15,
      calories: 220,
      level: 'Beginner',
      mannequinImage: require('../../assets/mannequin/IMG_9660.jpg'),
      targetMuscles: [
        { name: 'Abdominals', percentage: 65 },
        { name: 'Lower Back', percentage: 35 },
      ],
    },
    {
      id: 'kegel-routine',
      routineTitle: 'Pelvic Floor & Kegel Strength Routine',
      category: 'Pelvic & Core',
      durationMinutes: 10,
      calories: 140,
      level: 'All Levels',
      mannequinImage: require('../../assets/mannequin/IMG_9668.jpg'),
      targetMuscles: [
        { name: 'Pelvic Floor', percentage: 80 },
        { name: 'Glutes', percentage: 20 },
      ],
    },
    {
      id: 'calisthenics-push',
      routineTitle: 'Home Calisthenics Push & Chest Burnout',
      category: 'Bodyweight Calisthenics',
      durationMinutes: 20,
      calories: 380,
      level: 'Intermediate',
      mannequinImage: require('../../assets/mannequin/IMG_9663.jpg'),
      targetMuscles: [
        { name: 'Chest', percentage: 60 },
        { name: 'Triceps', percentage: 40 },
      ],
    },
  ];

  if (selectedRoutine) {
    return (
      <WorkoutDetailScreen
        {...selectedRoutine}
        onBack={() => setSelectedRoutine(null)}
      />
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>3D Guided Workouts</Text>
        <Text style={styles.subtitle}>Select a routine to view 3D Anatomical Mannequin cues</Text>
      </View>

      {routines.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => setSelectedRoutine(item)}
          style={styles.card}
        >
          <View style={styles.imageContainer}>
            <Image source={item.mannequinImage} style={styles.cardImg} resizeMode="cover" />
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>
          </View>

          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{item.routineTitle}</Text>
            
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>⏱️ {item.durationMinutes} min</Text>
              <Text style={styles.metaText}>🔥 {item.calories} Cal</Text>
              <Text style={styles.levelText}>{item.level}</Text>
            </View>

            <View style={styles.muscleRow}>
              {item.targetMuscles.map((m, idx) => (
                <View key={idx} style={styles.muscleChip}>
                  <Text style={styles.muscleChipText}>
                    {m.name} {m.percentage}%
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Pressable>
      ))}
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
    paddingBottom: 100,
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
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 180,
    backgroundColor: '#16080A',
    position: 'relative',
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.accentLime,
    marginLeft: 'auto',
  },
  muscleRow: {
    flexDirection: 'row',
    gap: 6,
  },
  muscleChip: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  muscleChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.neonOrange,
  },
});
