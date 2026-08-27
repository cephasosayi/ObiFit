import React from 'react';
import { TextInput, View, Text, TextInputProps, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface IInputProps extends TextInputProps {
  label?: string;
  error?: string;
  accessibilityLabel?: string;
}

export const Input: React.FC<IInputProps> = ({
  label,
  error,
  accessibilityLabel,
  style,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        accessibilityRole="none"
        accessibilityLabel={accessibilityLabel || label || 'Input field'}
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={colors.outline}
        {...rest}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    marginBottom: 6,
  },
  input: {
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    fontSize: 15,
    color: colors.onSurface,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
  },
});
