import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface INavDockItemProps {
  label: string;
  icon: string;
  isActive: boolean;
  onPress: () => void;
  badgeDotColor?: string;
}

export const NavDockItem: React.FC<INavDockItemProps> = ({
  label,
  icon,
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
      <View style={styles.iconWrapper}>
        <Text style={[styles.iconText, isActive && styles.iconTextActive]}>{icon}</Text>
        {badgeDotColor ? (
          <View style={[styles.statusDot, { backgroundColor: badgeDotColor }]} />
        ) : null}
      </View>
      <Text style={[styles.labelText, isActive && styles.labelTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dockCard: {
    minHeight: 48,
    minWidth: 56,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  dockCardActive: {
    backgroundColor: colors.surfaceContainerHigh,
    borderColor: colors.outlineVariant,
    borderWidth: 1,
  },
  dockCardInactive: {
    opacity: 0.7,
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
    opacity: 0.65,
  },
  iconTextActive: {
    fontSize: 20,
    opacity: 1,
  },
  statusDot: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  labelText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    marginTop: 3,
  },
  labelTextActive: {
    color: colors.accentLime,
    fontWeight: '800',
  },
});
