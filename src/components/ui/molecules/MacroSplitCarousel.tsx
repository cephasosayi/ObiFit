import React from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface IMacroCardData {
  id: string;
  label: string;
  consumed: number;
  target: number;
  unit: string;
  imageUri: string;
  accentColor: string;
}

export const MacroSplitCarousel: React.FC = () => {
  const cards: IMacroCardData[] = [
    {
      id: 'protein',
      label: 'PROTEIN (Suya & Meats)',
      consumed: 120,
      target: 160,
      unit: 'g',
      imageUri:
        'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80',
      accentColor: colors.primary,
    },
    {
      id: 'carbs',
      label: 'CARBS (Jollof & Swallows)',
      consumed: 210,
      target: 250,
      unit: 'g',
      imageUri:
        'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&auto=format&fit=crop&q=80',
      accentColor: colors.primary,
    },
    {
      id: 'fats',
      label: 'FATS (Avocado & Oils)',
      consumed: 45,
      target: 65,
      unit: 'g',
      imageUri:
        'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&auto=format&fit=crop&q=80',
      accentColor: colors.neonOrange,
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.carouselContainer}
      contentContainerStyle={styles.contentPadding}
    >
      {cards.map((c) => {
        const percent = Math.min(100, Math.round((c.consumed / c.target) * 100));
        return (
          <View key={c.id} style={styles.cardWrapper}>
            <ImageBackground source={{ uri: c.imageUri }} style={styles.bgImage} imageStyle={styles.imageRadius}>
              <View style={styles.darkOverlay}>
                <Text style={styles.macroLabel}>{c.label}</Text>

                <View style={styles.valRow}>
                  <Text style={styles.consumedVal}>
                    {c.consumed}
                    <Text style={styles.targetVal}> / {c.target}{c.unit}</Text>
                  </Text>
                  <Text style={[styles.percentBadge, { color: c.accentColor }]}>{percent}%</Text>
                </View>

                {/* Fill Progress Bar */}
                <View style={styles.trackBar}>
                  <View
                    style={[
                      styles.fillBar,
                      { width: `${percent}%`, backgroundColor: c.accentColor },
                    ]}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 20,
  },
  contentPadding: {
    gap: 14,
  },
  cardWrapper: {
    width: 220,
    height: 120,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: 20,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 15, 20, 0.75)',
    padding: 14,
    justifyContent: 'space-between',
  },
  macroLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
  },
  valRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  consumedVal: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  targetVal: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  percentBadge: {
    fontSize: 14,
    fontWeight: '900',
  },
  trackBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fillBar: {
    height: '100%',
    borderRadius: 3,
  },
});
