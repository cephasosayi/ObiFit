import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../tokens/color-system';

export interface IActivityBarChartCardProps {
  stepCount?: number;
  distanceKm?: number;
  caloriesBurned?: number;
  onPressDetails?: () => void;
}

export const ActivityBarChartCard: React.FC<IActivityBarChartCardProps> = ({
  stepCount = 3246,
  distanceKm = 2.51,
  caloriesBurned = 123.45,
  onPressDetails,
}) => {
  const chartData = [
    { day: 'M', heightPct: 35 },
    { day: 'T', heightPct: 50 },
    { day: 'W', heightPct: 40 },
    { day: 'T', heightPct: 75 },
    { day: 'F', heightPct: 100, isCurrent: true },
    { day: 'S', heightPct: 80 },
    { day: 'S', heightPct: 45 },
  ];

  return (
    <View style={styles.card}>
      <Pressable style={styles.headerRow} onPress={onPressDetails}>
        <View style={styles.titleRow}>
          <MaterialCommunityIcons name="shoe-print" size={18} color={colors.primary} />
          <Text style={styles.cardTitle}>Steps</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.onSurfaceVariant} />
      </Pressable>

      <View style={styles.contentRow}>
        {/* Left Telemetry Column */}
        <View style={styles.textCol}>
          <Text style={styles.stepsVal}>{stepCount.toLocaleString()} steps</Text>
          <Text style={styles.subtitle}>
            {distanceKm} km | {caloriesBurned} kcal
          </Text>
        </View>

        {/* Right 7-Day Vertical Bar Chart */}
        <View style={styles.chartCol}>
          <View style={styles.barGrid}>
            {chartData.map((b, idx) => (
              <View key={idx} style={styles.barItem}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { height: `${b.heightPct}%` },
                      b.isCurrent && styles.barFillActive,
                    ]}
                  />
                </View>
                <Text style={[styles.dayLabel, b.isCurrent && styles.dayLabelActive]}>
                  {b.day}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconEmoji: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  arrowIcon: {
    fontSize: 20,
    color: colors.onSurfaceVariant,
    fontWeight: '600',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  textCol: {
    flex: 1,
  },
  stepsVal: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.onSurface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  chartCol: {
    width: 140,
  },
  barGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 60,
  },
  barItem: {
    alignItems: 'center',
    width: 14,
  },
  barTrack: {
    width: 10,
    height: 44,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 5,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: colors.neonOrange,
    borderRadius: 5,
    opacity: 0.7,
  },
  barFillActive: {
    opacity: 1,
    backgroundColor: colors.primary,
  },
  dayLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  dayLabelActive: {
    color: colors.primary,
  },
});
