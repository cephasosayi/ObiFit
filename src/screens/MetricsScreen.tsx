import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { WearableStatusTile } from '../components/ui/molecules/WearableStatusTile';
import { useWearableSync } from '../hooks/useWearableSync';
import { colors } from '../tokens/color-system';

export const MetricsScreen: React.FC = () => {
  const { metrics, syncMetrics } = useWearableSync();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Health Metrics</Text>
        <Text style={styles.subtitle}>Smartwatch Synchronization & Activity Trends</Text>
      </View>

      <WearableStatusTile
        deviceName="Oraimo Smartwatch (Health Connect)"
        isConnected={true}
        stepsCount={metrics?.steps || 7420}
        lastSynced={metrics?.lastSyncedAt ? new Date(metrics.lastSyncedAt).toLocaleTimeString() : '14:00'}
        onSyncPress={() => syncMetrics(true)}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Supported Wearable Hardware</Text>
        <Text style={styles.cardItem}>• Oraimo Health, itel Fit, Infinix Watch</Text>
        <Text style={styles.cardItem}>• Apple Watch (iOS HealthKit)</Text>
        <Text style={styles.cardItem}>• Fitbit & Garmin Connect</Text>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.onSurface,
  },
  subtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  card: {
    padding: 20,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 10,
  },
  cardItem: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginBottom: 6,
  },
});
