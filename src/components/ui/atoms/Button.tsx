import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';

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
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-surface-container-high border-transparent';
      case 'outline':
        return 'bg-transparent border-2 border-outline';
      default:
        return 'bg-primary-container border-transparent';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'text-text-primary font-semibold';
      case 'outline':
        return 'text-text-primary font-semibold';
      default:
        return 'text-on-primary font-bold';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      accessibilityState={{ disabled: disabled || isLoading }}
      className={`min-h-[44px] min-w-[44px] px-6 py-3 rounded-full flex-row items-center justify-center ${getVariantStyles()} ${
        disabled ? 'opacity-50' : 'active:opacity-80'
      }`}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text className={`text-body-md text-center ${getTextStyles()}`}>{label}</Text>
      )}
    </Pressable>
  );
};
