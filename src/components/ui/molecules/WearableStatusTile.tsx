import React from 'react';
import { View, Text, Pressable } from 'react-native';

export interface IWearableStatusTileProps {
  deviceName: string;
  isConnected: boolean;
  stepsCount: number;
  lastSynced: string;
  onSyncPress: () => void;
}

export const WearableStatusTile: React.FC<IWearableStatusTileProps> = ({
  deviceName,
  isConnected,
  stepsCount,
  lastSynced,
  onSyncPress,
}) => {
  return (
    <View className="p-4 bg-surface-container rounded-card border border-outline-variant mb-4">
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          <View
            className={`w-3 h-3 rounded-full mr-2 ${
              isConnected ? 'bg-primary-container' : 'bg-outline'
            }`}
          />
          <Text className="text-body-md font-bold text-text-primary">{deviceName}</Text>
        </View>
        <Text className="text-caption-sm text-text-secondary">{isConnected ? 'Connected' : 'Offline'}</Text>
      </View>

      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-heading-lg font-bold text-text-primary">{stepsCount.toLocaleString()}</Text>
          <Text className="text-caption-sm text-text-secondary">Steps synced today ({lastSynced})</Text>
        </View>
        <Pressable
          onPress={onSyncPress}
          accessibilityRole="button"
          accessibilityLabel={`Sync data from ${deviceName}`}
          className="min-h-[44px] min-w-[44px] px-4 py-2 bg-secondary-container rounded-full items-center justify-center active:opacity-80"
        >
          <Text className="text-caption-sm font-bold text-text-primary">Sync Now</Text>
        </Pressable>
      </View>
    </View>
  );
};
