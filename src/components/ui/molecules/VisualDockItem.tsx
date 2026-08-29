import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface IVisualDockItemProps {
  id: 'home' | 'nutrition' | 'workouts' | 'metrics';
  label: string;
  imageUri: string;
  isActive: boolean;
  onPress: () => void;
  badgeDotColor?: string;
}

export const VisualDockItem: React.FC<IVisualDockItemProps> = ({
  id,
  label,
  imageUri,
  isActive,
  onPress,
  badgeDotColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} Tab`}
      style={[
        styles.dockCard,
        isActive ? styles.dockCardActive : styles.dockCardInactive,
      ]}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUri }}
          style={[styles.thumbnail, !isActive && styles.thumbnailInactive]}
          resizeMode="cover"
        />

        {/* Dynamic BLE / Status Pulse Dot */}
        {badgeDotColor ? (
          <View style={[styles.statusDot, { backgroundColor: badgeDotColor }]} />
        ) : null}

        {/* Active Ring Glow Overlay */}
        {isActive ? <View style={styles.activeGlowRing} /> : null}
      </View>

      <Text
        numberOfLines={1}
        style={[styles.labelText, isActive && styles.labelTextActive]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dockCard: {
    minHeight: 52,
    minWidth: 56,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(24, 24, 29, 0.75)',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  dockCardActive: {
    paddingHorizontal: 14,
    backgroundColor: colors.surfaceContainerHighest,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  dockCardInactive: {
    opacity: 0.7,
  },
  imageWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailInactive: {
    opacity: 0.45,
  },
  statusDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    borderWidth: 1,
    borderColor: '#000',
  },
  activeGlowRing: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: colors.neonOrange,
  },
  labelText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    marginTop: 3,
  },
  labelTextActive: {
    color: colors.onSurface,
    fontWeight: '900',
  },
});
