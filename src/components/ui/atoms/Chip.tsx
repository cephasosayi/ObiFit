import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

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
      style={[styles.chip, isSelected ? styles.chipSelected : styles.chipUnselected]}
    >
      <Text style={[styles.text, isSelected ? styles.textSelected : styles.textUnselected]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipUnselected: {
    backgroundColor: colors.surfaceContainer,
    borderColor: colors.outlineVariant,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  textSelected: {
    color: colors.onPrimary,
  },
  textUnselected: {
    color: colors.onSurface,
  },
});
