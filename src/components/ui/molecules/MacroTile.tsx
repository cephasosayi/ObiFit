import React from 'react';
import { View, Text } from 'react-native';

export interface IMacroTileProps {
  label: string;
  currentGrams: number;
  targetGrams: number;
  variant: 'protein' | 'carbs' | 'fats';
}

export const MacroTile: React.FC<IMacroTileProps> = ({
  label,
  currentGrams,
  targetGrams,
  variant,
}) => {
  const percentage = Math.min(Math.round((currentGrams / targetGrams) * 100), 100);

  const getVariantBg = () => {
    switch (variant) {
      case 'protein':
        return 'bg-primary-container';
      case 'carbs':
        return 'bg-tertiary-container';
      case 'fats':
        return 'bg-secondary-container';
    }
  };

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={`${label} ${currentGrams} grams of ${targetGrams} grams`}
      className="p-4 bg-surface-container rounded-card mb-3 shadow-sm border border-outline-variant"
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-body-md font-semibold text-text-primary">{label}</Text>
        <Text className="text-caption-sm text-text-secondary">
          {currentGrams}g / {targetGrams}g
        </Text>
      </View>
      <View className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
        <View
          className={`h-full ${getVariantBg()}`}
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  );
};
