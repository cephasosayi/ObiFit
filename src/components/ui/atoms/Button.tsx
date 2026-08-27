import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface IButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
}

export const Button: React.FC<IButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  accessibilityLabel,
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryContainer;
      case 'outline':
        return styles.outlineContainer;
      default:
        return styles.primaryContainer;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityState={{ disabled: disabled || isLoading }}
      style={[
        styles.buttonBase,
        getContainerStyle(),
        disabled && styles.disabled,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.onPrimary} />
      ) : (
        <Text style={[styles.textBase, getTextStyle()]}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryContainer: {
    backgroundColor: colors.primary,
  },
  secondaryContainer: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.outline,
  },
  disabled: {
    opacity: 0.5,
  },
  textBase: {
    fontSize: 15,
    textAlign: 'center',
  },
  primaryText: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  secondaryText: {
    color: colors.onSurface,
    fontWeight: '600',
  },
  outlineText: {
    color: colors.onSurface,
    fontWeight: '600',
  },
});
