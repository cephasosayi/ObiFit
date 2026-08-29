import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../tokens/color-system';

export interface IDailyChecklistCardProps {
  dateTitle: string;
  exerciseTitle: string;
  exerciseDurationMinutes?: number;
  foodTargetKcal?: number;
  currentSteps?: number;
  targetSteps?: number;
  currentWaterLiters?: number;
  targetWaterLiters?: number;
  onStartWorkout?: () => void;
  onOpenMealLogger?: () => void;
}

export const DailyChecklistCard: React.FC<IDailyChecklistCardProps> = ({
  exerciseTitle = 'Upper Body & Core Alignment',
  exerciseDurationMinutes = 45,
  foodTargetKcal = 2200,
  currentSteps = 7420,
  targetSteps = 8000,
  currentWaterLiters = 1.75,
  targetWaterLiters = 2.5,
  onStartWorkout,
  onOpenMealLogger,
}) => {
  return (
    <View style={styles.checklistGroup}>
      {/* Goal Card 1: Exercise Goal */}
      <View style={styles.goalCard}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.titleGroup}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(247, 37, 69, 0.15)' }]}>
              <MaterialCommunityIcons name="dumbbell" size={18} color={colors.primary} />
            </View>
            <View style={styles.textMetaGroup}>
              <Text style={styles.goalCardTitle}>{exerciseTitle}</Text>
              <Text style={styles.goalCardSub}>{exerciseDurationMinutes} MIN Workout Routine</Text>
            </View>
          </View>

          {onStartWorkout ? (
            <Pressable style={styles.actionBtnPrimary} onPress={onStartWorkout}>
              <Text style={styles.actionBtnText}>Start</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* Goal Card 2: Food Log Goal */}
      <View style={styles.goalCard}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.titleGroup}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(255, 85, 0, 0.15)' }]}>
              <MaterialCommunityIcons name="food-outline" size={18} color={colors.neonOrange} />
            </View>
            <View style={styles.textMetaGroup}>
              <Text style={styles.goalCardTitle}>Log Regional Meals & Macros</Text>
              <Text style={styles.goalCardSub}>Target: {foodTargetKcal} Kcal</Text>
            </View>
          </View>

          {onOpenMealLogger ? (
            <Pressable style={styles.actionBtnSecondary} onPress={onOpenMealLogger}>
              <Text style={styles.actionBtnSecText}>Log Food</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* Goal Card 3: Daily Steps Goal */}
      <View style={styles.goalCard}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.titleGroup}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(0, 176, 255, 0.15)' }]}>
              <MaterialCommunityIcons name="shoe-print" size={18} color="#00B0FF" />
            </View>
            <View style={styles.textMetaGroup}>
              <Text style={styles.goalCardTitle}>Daily Steps Goal</Text>
              <Text style={styles.goalCardSub}>
                {currentSteps.toLocaleString()} / {targetSteps.toLocaleString()} steps
              </Text>
            </View>
          </View>

          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.onSurfaceVariant} />
        </View>
      </View>

      {/* Goal Card 4: Water Hydration Goal */}
      <View style={styles.goalCard}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.titleGroup}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(0, 229, 255, 0.15)' }]}>
              <MaterialCommunityIcons name="water-outline" size={18} color="#00E5FF" />
            </View>
            <View style={styles.textMetaGroup}>
              <Text style={styles.goalCardTitle}>Water Hydration Goal</Text>
              <Text style={styles.goalCardSub}>
                {currentWaterLiters}L / {targetWaterLiters}L Hydrated
              </Text>
            </View>
          </View>

          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.onSurfaceVariant} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checklistGroup: {
    gap: 12,
    marginBottom: 20,
  },
  goalCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textMetaGroup: {
    flex: 1,
  },
  goalCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 2,
  },
  goalCardSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '600',
  },
  actionBtnPrimary: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 14,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  actionBtnSecondary: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  actionBtnSecText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.neonOrange,
  },
});
