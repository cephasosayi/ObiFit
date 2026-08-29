import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../tokens/color-system';

export interface IScheduledTrainingCardProps {
  id: string;
  type: string;
  durationMinutes: number;
  trainerName: string;
  timeString: string;
  onPressStart: () => void;
}

export const ScheduledTrainingCard: React.FC<IScheduledTrainingCardProps> = ({
  type,
  durationMinutes,
  trainerName,
  timeString,
  onPressStart,
}) => {
  return (
    <View style={styles.card}>
      {/* 3-Column Metadata Header Grid */}
      <View style={styles.metaGrid}>
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>Type</Text>
          <Text numberOfLines={1} style={styles.metaValHighlight}>
            {type.toUpperCase()}
          </Text>
        </View>

        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>Duration</Text>
          <Text style={styles.metaVal}>{durationMinutes} MIN</Text>
        </View>

        <View style={styles.metaColRight}>
          <Text style={styles.metaLabel}>Trainer</Text>
          <Text numberOfLines={1} style={styles.trainerVal}>
            {trainerName.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Main Time Row with Circular Arrow CTA Button */}
      <View style={styles.timeRow}>
        <Text style={styles.timeDisplay}>{timeString}</Text>

        <Pressable
          style={styles.arrowBtn}
          onPress={onPressStart}
          accessibilityRole="button"
          accessibilityLabel={`Start ${type} session at ${timeString}`}
        >
          <MaterialCommunityIcons name="arrow-right" size={20} color={colors.primary} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  metaCol: {
    flex: 1,
  },
  metaColRight: {
    flex: 1.3,
    alignItems: 'flex-end',
  },
  metaLabel: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginBottom: 2,
  },
  metaVal: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.onSurface,
  },
  metaValHighlight: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.neonOrange,
  },
  trainerVal: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.primary,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeDisplay: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  arrowBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  arrowIcon: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
});
