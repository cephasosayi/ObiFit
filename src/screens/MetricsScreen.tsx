import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { WearableStatusTile } from '../components/ui/molecules/WearableStatusTile';
import { useWearableSync } from '../hooks/useWearableSync';

export const MetricsScreen: React.FC = () => {
  const { metrics, syncMetrics } = useWearableSync();

  return (
    <ScrollView className="flex-1 bg-surface p-6">
      <View className="mb-6">
        <Text className="text-heading-xl font-bold text-text-primary">Health Metrics</Text>
        <Text className="text-caption-sm text-text-secondary">Smartwatch Synchronization & Activity Trends</Text>
      </View>

      <WearableStatusTile
        deviceName="Oraimo Smartwatch (Health Connect)"
        isConnected={true}
        stepsCount={metrics?.steps || 7420}
        lastSynced={metrics?.lastSyncedAt ? new Date(metrics.lastSyncedAt).toLocaleTimeString() : '14:00'}
        onSyncPress={() => syncMetrics(true)}
      />

      <View className="p-4 bg-surface-container rounded-card border border-outline-variant">
        <Text className="text-body-md font-bold text-text-primary mb-2">Supported Devices</Text>
        <Text className="text-caption-sm text-text-secondary">
          • Oraimo Health, itel Fit, Infinix Watch
        </Text>
        <Text className="text-caption-sm text-text-secondary">
          • Apple Watch (iOS HealthKit)
        </Text>
        <Text className="text-caption-sm text-text-secondary">
          • Fitbit & Garmin Connect
        </Text>
      </View>
    </ScrollView>
  );
};
