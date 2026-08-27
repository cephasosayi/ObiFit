import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { MacroTile } from '../components/ui/molecules/MacroTile';
import { Button } from '../components/ui/atoms/Button';
import { useWearableSync } from '../hooks/useWearableSync';
import { colors } from '../tokens/color-system';

export const HomeScreen: React.FC = () => {
  const { metrics, syncMetrics } = useWearableSync();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>ObiFit</Text>
        <Text style={styles.appSubtitle}>West Africa Health & Momentum Tracker</Text>
      </View>

      <View style={styles.momentumCard}>
        <Text style={styles.momentumLabel}>MOMENTUM SCORE</Text>
        <Text style={styles.momentumScore}>88 / 100</Text>
        <Text style={styles.momentumDesc}>
          Consistent progress across Nutrition, Hydration & Steps!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Macros</Text>
        <MacroTile label="Protein" currentGrams={65} targetGrams={120} variant="protein" />
        <MacroTile label="Carbohydrates" currentGrams={180} targetGrams={220} variant="carbs" />
        <MacroTile label="Healthy Fats" currentGrams={45} targetGrams={65} variant="fats" />
      </View>

      <View style={styles.syncCard}>
        <Text style={styles.syncTitle}>Wearable Synchronization</Text>
        <Text style={styles.syncSubtitle}>
          Steps: {metrics?.steps ? metrics.steps.toLocaleString() : '7,420'} ({metrics?.source || 'Oraimo'})
        </Text>
        <Button label="Sync Smartwatch" variant="secondary" onPress={() => syncMetrics(true)} />
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
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  momentumCard: {
    padding: 24,
    backgroundColor: colors.primary,
    borderRadius: 24,
    marginBottom: 24,
  },
  momentumLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.onPrimary,
    letterSpacing: 1.5,
    opacity: 0.9,
  },
  momentumScore: {
    fontSize: 34,
    fontWeight: '900',
    color: colors.onPrimary,
    marginVertical: 4,
  },
  momentumDesc: {
    fontSize: 13,
    color: colors.onPrimary,
    opacity: 0.95,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 12,
  },
  syncCard: {
    padding: 20,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: 20,
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
