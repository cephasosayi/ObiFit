import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

export interface IInputProps extends TextInputProps {
  label?: string;
  error?: string;
  accessibilityLabel?: string;
}

export const Input: React.FC<IInputProps> = ({
  label,
  error,
  accessibilityLabel,
  className = '',
  ...rest
}) => {
  return (
    <View className="w-full mb-4">
      {label ? (
        <Text className="text-caption-sm font-medium text-text-secondary mb-1">{label}</Text>
      ) : null}
      <TextInput
        accessibilityRole="none"
        accessibilityLabel={accessibilityLabel || label || 'Input field'}
        className={`min-h-[44px] px-4 py-3 bg-surface-container rounded-card border text-body-md text-text-primary ${
          error ? 'border-error' : 'border-outline-variant focus:border-outline'
        } ${className}`}
        placeholderTextColor="#888888"
        {...rest}
      />
      {error ? (
        <Text className="text-caption-sm text-error mt-1">{error}</Text>
      ) : null}
    </View>
  );
};
