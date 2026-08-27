import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

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
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.deviceRow}>
          <View
            style={[
              styles.dot,
              { backgroundColor: isConnected ? colors.primary : colors.outline },
            ]}
          />
          <Text style={styles.deviceName}>{deviceName}</Text>
        </View>
        <Text style={styles.statusText}>{isConnected ? 'Connected' : 'Offline'}</Text>
      </View>

      <View style={styles.body}>
        <View>
          <Text style={styles.stepsText}>{stepsCount.toLocaleString()}</Text>
          <Text style={styles.syncedText}>Steps synced today ({lastSynced})</Text>
        </View>
        <Pressable
          onPress={onSyncPress}
          accessibilityRole="button"
          accessibilityLabel={`Sync data from ${deviceName}`}
          style={styles.syncButton}
        >
          <Text style={styles.syncText}>Sync Now</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  deviceName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
  statusText: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepsText: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.onSurface,
  },
  syncedText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  syncButton: {
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.secondaryContainer,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
  },
});
