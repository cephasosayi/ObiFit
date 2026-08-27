import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface IMealItemCardProps {
  name: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  onPress?: () => void;
}

export const MealItemCard: React.FC<IMealItemCardProps> = ({
  name,
  calories,
  proteinGrams,
  carbsGrams,
  fatGrams,
  mealType,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${calories} calories, ${mealType}`}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.calories}>{calories} kcal</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.type}>{mealType}</Text>
        <Text style={styles.macros}>
          P: {proteinGrams}g | C: {carbsGrams}g | F: {fatGrams}g
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 16,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    flex: 1,
  },
  calories: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  type: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    textTransform: 'capitalize',
  },
  macros: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
});
