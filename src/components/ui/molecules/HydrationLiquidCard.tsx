import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface IHydrationLiquidCardProps {
  initialMl?: number;
  targetMl?: number;
}

export const HydrationLiquidCard: React.FC<IHydrationLiquidCardProps> = ({
  initialMl = 2250,
  targetMl = 3000,
}) => {
  const [currentMl, setCurrentMl] = useState(initialMl);

  const addWater = (amount: number) => {
    setCurrentMl((prev) => Math.min(5000, prev + amount));
  };

  const percentage = Math.min(100, Math.round((currentMl / targetMl) * 100));

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.cardTitle}>HYDRATION ENGINE</Text>
          <Text style={styles.volumeText}>
            {currentMl.toLocaleString()} <Text style={styles.unitText}>/ {targetMl.toLocaleString()} ml</Text>
          </Text>
        </View>
        <View style={styles.percentBadge}>
          <Text style={styles.percentText}>{percentage}%</Text>
        </View>
      </View>

      {/* Liquid Fill Gauge Track */}
      <View style={styles.liquidTrack}>
        <View style={[styles.liquidFill, { width: `${percentage}%` }]} />
      </View>

      {/* Image-backed Quick Tap Add Cards */}
      <View style={styles.quickAddGrid}>
        {(
          [
            { amount: 250, label: '+250ml', icon: '🥛', desc: 'Glass' },
            { amount: 500, label: '+500ml', icon: '🍼', desc: 'Bottle' },
            { amount: 750, label: '+750ml', icon: '🎒', desc: 'Pack' },
          ] as const
        ).map((item) => (
          <Pressable
            key={item.amount}
            style={styles.quickAddCard}
            onPress={() => addWater(item.amount)}
            accessibilityRole="button"
            accessibilityLabel={`Add ${item.amount} ml water`}
          >
            <Text style={styles.iconText}>{item.icon}</Text>
            <Text style={styles.labelVal}>{item.label}</Text>
            <Text style={styles.descText}>{item.desc}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#00B0FF',
    letterSpacing: 1.2,
  },
  volumeText: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.onSurface,
    marginTop: 2,
  },
  unitText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  percentBadge: {
    backgroundColor: 'rgba(0, 176, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#00B0FF',
  },
  percentText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#00B0FF',
  },
  liquidTrack: {
    height: 10,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 18,
  },
  liquidFill: {
    height: '100%',
    backgroundColor: '#00B0FF',
    borderRadius: 5,
  },
  quickAddGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  quickAddCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerHigh,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  iconText: {
    fontSize: 22,
    marginBottom: 4,
  },
  labelVal: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.onSurface,
  },
  descText: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
});
