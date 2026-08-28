import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { MacroTile } from '../components/ui/molecules/MacroTile';
import { Button } from '../components/ui/atoms/Button';
import { Chip } from '../components/ui/atoms/Chip';
import { useWearableSync } from '../hooks/useWearableSync';
import { colors } from '../tokens/color-system';

export const HomeScreen: React.FC = () => {
  const { metrics, syncMetrics } = useWearableSync();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Header Banner */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>ObiFit</Text>
          <Text style={styles.appSubtitle}>West Africa Health & Momentum Tracker</Text>
        </View>
        <View style={styles.badgeLime}>
          <Text style={styles.badgeLimeText}>PRO</Text>
        </View>
      </View>

      {/* Quick Category Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
        <Chip label="Home Workout" isSelected={true} />
        <Chip label="Posture Fix" isSelected={false} />
        <Chip label="Kegel Routine" isSelected={false} />
        <Chip label="Jollof & Amala" isSelected={false} />
      </ScrollView>

      {/* High-Impact Momentum Score Card */}
      <View style={styles.momentumCard}>
        <Text style={styles.momentumLabel}>HOLISTIC MOMENTUM SCORE</Text>
        <View style={styles.scoreRow}>
          <Text style={styles.momentumScore}>88</Text>
          <Text style={styles.scoreMax}>/ 100</Text>
        </View>
        <Text style={styles.momentumDesc}>
          ⚡ 5-Day Streak active! Consistency tracked across Nutrition, Steps & Workouts.
        </Text>
      </View>

      {/* Activity Ring Gauges Widget */}
      <View style={styles.activityCard}>
        <Text style={styles.sectionTitle}>Daily Activity Gauges</Text>
        <View style={styles.gaugeGrid}>
          <View style={styles.gaugeBox}>
            <Text style={styles.gaugeVal}>{metrics?.steps ? metrics.steps.toLocaleString() : '7,420'}</Text>
            <Text style={styles.gaugeLabel}>Steps (Goal 10k)</Text>
          </View>

          <View style={[styles.gaugeBox, styles.gaugeBoxLime]}>
            <Text style={[styles.gaugeVal, styles.limeVal]}>480 kcal</Text>
            <Text style={styles.gaugeLabel}>Active Burn</Text>
          </View>

          <View style={styles.gaugeBox}>
            <Text style={styles.gaugeVal}>2.1 L</Text>
            <Text style={styles.gaugeLabel}>Hydration</Text>
          </View>
        </View>
      </View>

      {/* Macro Tracking Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Nutrition Targets</Text>
        <MacroTile label="Protein (Local Meats & Fish)" currentGrams={65} targetGrams={120} variant="protein" />
        <MacroTile label="Carbohydrates (Rice & Swallow)" currentGrams={180} targetGrams={220} variant="carbs" />
        <MacroTile label="Healthy Fats (Egusi & Palm Oil)" currentGrams={45} targetGrams={65} variant="fats" />
      </View>

      {/* Smartwatch Sync Tile */}
      <View style={styles.syncCard}>
        <Text style={styles.syncTitle}>Wearable Hardware Sync</Text>
        <Text style={styles.syncSubtitle}>
          Connected: {metrics?.source || 'Oraimo Health'} • Auto-synced 14:00
        </Text>
        <Button label="Sync Smartwatch Now" variant="secondary" onPress={() => syncMetrics(true)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  badgeLime: {
    backgroundColor: colors.accentLime,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  badgeLimeText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.onAccentLime,
  },
  chipRow: {
    marginBottom: 20,
  },
  momentumCard: {
    padding: 24,
    backgroundColor: colors.primary,
    borderRadius: 24,
    marginBottom: 20,
  },
  momentumLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.onPrimary,
    letterSpacing: 1.5,
    opacity: 0.9,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 4,
  },
  momentumScore: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.onPrimary,
  },
  scoreMax: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onPrimary,
    opacity: 0.8,
    marginLeft: 6,
  },
  momentumDesc: {
    fontSize: 13,
    color: colors.onPrimary,
    opacity: 0.95,
  },
  activityCard: {
    padding: 20,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 14,
  },
  gaugeGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  gaugeBox: {
    flex: 1,
    backgroundColor: colors.surfaceContainerHigh,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  gaugeBoxLime: {
    borderColor: colors.accentLime,
  },
  gaugeVal: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.onSurface,
  },
  limeVal: {
    color: colors.accentLime,
  },
  gaugeLabel: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  syncCard: {
    padding: 20,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  syncTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  syncSubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    marginBottom: 14,
  },
});
