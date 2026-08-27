import React from 'react';
import { Pressable, Text } from 'react-native';

export interface IChipProps {
  label: string;
  isSelected?: boolean;
  onPress?: () => void;
}

export const Chip: React.FC<IChipProps> = ({
  label,
  isSelected = false,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: isSelected }}
      className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-full border items-center justify-center mr-2 mb-2 ${
        isSelected
          ? 'bg-primary-container border-primary-container'
          : 'bg-surface-container border-outline-variant'
      }`}
    >
      <Text
        className={`text-caption-sm font-medium ${
          isSelected ? 'text-on-primary font-semibold' : 'text-text-primary'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
};
