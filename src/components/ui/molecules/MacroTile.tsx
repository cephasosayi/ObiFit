import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

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

  const getBarColor = () => {
    switch (variant) {
      case 'protein':
        return colors.primary;
      case 'carbs':
        return colors.tertiary;
      case 'fats':
        return colors.secondary;
    }
  };

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={`${label} ${currentGrams} grams of ${targetGrams} grams`}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{label}</Text>
        <Text style={styles.subtitle}>
          {currentGrams}g / {targetGrams}g
        </Text>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${percentage}%`, backgroundColor: getBarColor() },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
  },
  subtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  track: {
    height: 8,
    width: '100%',
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});
