import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface IMealPlanItem {
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  title: string;
  kcal: number;
  proteinGrams: number;
  time: string;
  imageUri: string;
}

export interface IDailyFoodPlanCardProps {
  dailyTargetKcal?: number;
  dailyTargetProtein?: number;
  mealList?: IMealPlanItem[];
  onOpenMealLogger?: () => void;
}

export const DailyFoodPlanCard: React.FC<IDailyFoodPlanCardProps> = ({
  dailyTargetKcal = 2200,
  dailyTargetProtein = 130,
  mealList = [
    {
      type: 'Breakfast',
      title: 'Oatmeal, Peanut Butter & Boiled Eggs',
      kcal: 450,
      proteinGrams: 28,
      time: '08:00 AM',
      imageUri: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=300&auto=format&fit=crop&q=80',
    },
    {
      type: 'Lunch',
      title: 'Jollof Rice, Grilled Chicken & Plantain',
      kcal: 720,
      proteinGrams: 48,
      time: '01:30 PM',
      imageUri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80',
    },
    {
      type: 'Dinner',
      title: 'Pounded Yam & Egusi Soup with Goat Meat',
      kcal: 680,
      proteinGrams: 40,
      time: '07:00 PM',
      imageUri: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&auto=format&fit=crop&q=80',
    },
    {
      type: 'Snack',
      title: 'Suya Beef Skewers & Fresh Papaya',
      kcal: 350,
      proteinGrams: 22,
      time: '04:30 PM',
      imageUri: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80',
    },
  ],
  onOpenMealLogger,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <View style={styles.planBadge}>
            <Text style={styles.planBadgeText}>WEST AFRICAN NUTRITION PLAN</Text>
          </View>
          <Text style={styles.targetTag}>
            🎯 {dailyTargetKcal} kcal | {dailyTargetProtein}g P
          </Text>
        </View>
        <Text style={styles.title}>Today&apos;s Structured Meal Plan</Text>
      </View>

      {/* Meal Items Breakdown List */}
      <View style={styles.mealList}>
        {mealList.map((m, idx) => (
          <View key={idx} style={styles.mealRow}>
            <Image source={{ uri: m.imageUri }} style={styles.mealThumb} resizeMode="cover" />
            <View style={styles.mealInfo}>
              <View style={styles.mealTitleRow}>
                <Text style={styles.mealType}>{m.type.toUpperCase()}</Text>
                <Text style={styles.mealTime}>{m.time}</Text>
              </View>
              <Text numberOfLines={1} style={styles.mealTitle}>
                {m.title}
              </Text>
              <Text style={styles.mealMeta}>
                🔥 {m.kcal} kcal • <Text style={styles.proteinText}>{m.proteinGrams}g Protein</Text>
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Pressable
        style={styles.actionBtn}
        onPress={onOpenMealLogger}
        accessibilityRole="button"
        accessibilityLabel="Log or Adjust Meal Plan"
      >
        <Text style={styles.actionBtnText}>Log & Adjust Meal Plan 🥗</Text>
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
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
  planBadge: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  planBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 1,
  },
  targetTag: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.onSurface,
  },
  mealList: {
    gap: 12,
    marginBottom: 18,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  mealThumb: {
    width: 48,
    height: 48,
    borderRadius: 14,
    marginRight: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  mealType: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.neonOrange,
    letterSpacing: 0.5,
  },
  mealTime: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.onSurface,
  },
  mealMeta: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  proteinText: {
    color: colors.neonOrange,
    fontWeight: '700',
  },
  actionBtn: {
    backgroundColor: colors.surfaceContainerHighest,
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  actionBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.onSurface,
  },
});
