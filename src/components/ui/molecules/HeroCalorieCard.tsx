import React from 'react';
import { View, Text, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface IHeroCalorieCardProps {
  remainingKcal: number;
  consumedKcal: number;
  targetKcal: number;
  burnRateKcal: number;
  onQuickLogPress: () => void;
}

export const HeroCalorieCard: React.FC<IHeroCalorieCardProps> = ({
  remainingKcal = 1420,
  consumedKcal = 780,
  targetKcal = 2200,
  burnRateKcal = 480,
  onQuickLogPress,
}) => {
  const heroImageUri =
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80';

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: heroImageUri }} style={styles.bgImage} imageStyle={styles.imageRadius}>
        <View style={styles.gradientOverlay}>
          {/* Top Glassmorphic Telemetry Card */}
          <View style={styles.glassCard}>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.targetLabel}>DAILY CALORIE BUDGET</Text>
                <Text style={styles.remainingVal}>
                  {remainingKcal.toLocaleString()} <Text style={styles.unitText}>kcal left</Text>
                </Text>
              </View>
              {/* Quick Log Embedded Floating Action Chip */}
              <Pressable
                style={styles.quickLogChip}
                onPress={onQuickLogPress}
                accessibilityRole="button"
                accessibilityLabel="Quick AI Log Meal"
              >
                <Text style={styles.chipText}>+ Log Meal</Text>
              </Pressable>
            </View>

            {/* Burn Rate & Macro Stat Footer */}
            <View style={styles.statRow}>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{consumedKcal} kcal</Text>
                <Text style={styles.statLabel}>Consumed ({targetKcal} Goal)</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statBox}>
                <Text style={[styles.statVal, styles.burnVal]}>+{burnRateKcal} kcal</Text>
                <Text style={styles.statLabel}>BLE Burned (BMR + HR)</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
    height: 210,
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: 24,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 11, 14, 0.45)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  glassCard: {
    backgroundColor: 'rgba(27, 27, 34, 0.85)',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  targetLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.neonOrange,
    letterSpacing: 1.2,
  },
  remainingVal: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  unitText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  quickLogChip: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.onPrimary,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingTop: 12,
  },
  statBox: {
    flex: 1,
  },
  statVal: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.onSurface,
  },
  burnVal: {
    color: colors.neonOrange,
  },
  statLabel: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: colors.outlineVariant,
    marginHorizontal: 12,
  },
});
