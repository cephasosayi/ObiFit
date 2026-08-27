import React from 'react';
import { View, Text, Pressable } from 'react-native';

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
      className="min-h-[44px] p-4 bg-surface-container rounded-card mb-3 border border-outline-variant active:opacity-90"
    >
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-body-md font-bold text-text-primary">{name}</Text>
        <Text className="text-body-md font-semibold text-primary-container">{calories} kcal</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-caption-sm text-text-secondary capitalize">{mealType}</Text>
        <Text className="text-caption-sm text-text-secondary">
          P: {proteinGrams}g | C: {carbsGrams}g | F: {fatGrams}g
        </Text>
      </View>
    </Pressable>
  );
};
