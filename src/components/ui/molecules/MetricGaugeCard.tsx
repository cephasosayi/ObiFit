import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../tokens/color-system';

export interface IMetricGaugeCardProps {
  type: 'calories' | 'durations';
  valueText: string;
  ringColor?: string;
  onPress?: () => void;
}

export const MetricGaugeCard: React.FC<IMetricGaugeCardProps> = ({
  type,
  valueText,
  ringColor = type === 'calories' ? colors.neonOrange : '#00B0FF',
  onPress,
}) => {
  const isCalories = type === 'calories';

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <MaterialCommunityIcons
            name={isCalories ? 'fire' : 'clock-outline'}
            size={18}
            color={ringColor}
          />
          <Text style={styles.title}>{isCalories ? 'Calories' : 'Durations'}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={18} color={colors.onSurfaceVariant} />
      </View>

      <View style={styles.contentRow}>
        <Text style={styles.valueDisplay}>{valueText}</Text>

        {/* Circular Progress Ring Representation */}
        <View style={[styles.ringContainer, { borderColor: ringColor }]}>
          <View style={[styles.ringInner, { backgroundColor: ringColor }]} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    fontSize: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  arrowIcon: {
    fontSize: 18,
    color: colors.onSurfaceVariant,
    fontWeight: '600',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueDisplay: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.onSurface,
  },
  ringContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
