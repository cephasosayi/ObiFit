import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface IExercisePlanItem {
  id: string;
  name: string;
  setsReps: string;
  muscleTag: string;
  imageUri: string;
}

export interface IDailyWorkoutPlanCardProps {
  dayTitle?: string;
  goalName?: string;
  durationMinutes?: number;
  exerciseList?: IExercisePlanItem[];
  onStartSession: () => void;
}

export const DailyWorkoutPlanCard: React.FC<IDailyWorkoutPlanCardProps> = ({
  dayTitle = 'Day 5: Upper Body & Core Stability',
  goalName = 'Calisthenics & Hypertrophy',
  durationMinutes = 45,
  exerciseList = [
    {
      id: 'ex-1',
      name: 'Explosive Push-Up Variations',
      setsReps: '4 Sets × 12 Reps',
      muscleTag: 'Chest & Triceps',
      imageUri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'ex-2',
      name: 'Bodyweight Inverted Rows',
      setsReps: '4 Sets × 10 Reps',
      muscleTag: 'Upper Back & Biceps',
      imageUri: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'ex-3',
      name: 'Core Hollow Body Hold',
      setsReps: '3 Sets × 45s Hold',
      muscleTag: 'Abs & Posture',
      imageUri: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80',
    },
  ],
  onStartSession,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <View style={styles.goalBadge}>
            <Text style={styles.goalBadgeText}>GOAL: {goalName.toUpperCase()}</Text>
          </View>
          <Text style={styles.timeTag}>⏱️ {durationMinutes} mins</Text>
        </View>
        <Text style={styles.dayTitle}>{dayTitle}</Text>
      </View>

      {/* Exercise List Breakdown */}
      <View style={styles.listContainer}>
        {exerciseList.map((ex, idx) => (
          <View key={ex.id} style={styles.exRow}>
            <Image source={{ uri: ex.imageUri }} style={styles.exThumb} resizeMode="cover" />
            <View style={styles.exInfo}>
              <Text style={styles.exName}>
                {idx + 1}. {ex.name}
              </Text>
              <Text style={styles.exMeta}>
                {ex.setsReps} • <Text style={styles.muscleHighlight}>{ex.muscleTag}</Text>
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Primary CTA */}
      <Pressable
        style={styles.startBtn}
        onPress={onStartSession}
        accessibilityRole="button"
        accessibilityLabel="Start Today Structured Workout"
      >
        <Text style={styles.startBtnText}>Start Today&apos;s Workout 🚀</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalBadge: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  goalBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 1,
  },
  timeTag: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.onSurface,
  },
  listContainer: {
    gap: 12,
    marginBottom: 20,
  },
  exRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  exThumb: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginRight: 12,
  },
  exInfo: {
    flex: 1,
  },
  exName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.onSurface,
  },
  exMeta: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  muscleHighlight: {
    color: colors.accentLime,
    fontWeight: '700',
  },
  startBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.onPrimary,
  },
});
