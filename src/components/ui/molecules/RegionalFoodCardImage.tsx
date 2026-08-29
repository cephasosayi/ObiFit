import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface IRegionalFoodCardImageProps {
  id: string;
  title: string;
  baseCalories: number;
  baseProtein: number;
  baseCarbs: number;
  baseFats: number;
  imageUri: string;
  mealType: string;
}

export const RegionalFoodCardImage: React.FC<IRegionalFoodCardImageProps> = ({
  title,
  baseCalories,
  baseProtein,
  baseCarbs,
  baseFats,
  imageUri,
  mealType,
}) => {
  const [scale, setScale] = useState<1 | 1.5 | 2>(1);

  const calories = Math.round(baseCalories * scale);
  const protein = Math.round(baseProtein * scale);
  const carbs = Math.round(baseCarbs * scale);
  const fats = Math.round(baseFats * scale);

  return (
    <View style={styles.card}>
      {/* 40/60 Layout */}
      <View style={styles.splitRow}>
        {/* Left 40% Photo */}
        <View style={styles.imageCol}>
          <Image source={{ uri: imageUri }} style={styles.foodPhoto} resizeMode="cover" />
          <View style={styles.mealBadge}>
            <Text style={styles.mealBadgeText}>{mealType.toUpperCase()}</Text>
          </View>
        </View>

        {/* Right 60% Details */}
        <View style={styles.infoCol}>
          <Text numberOfLines={1} style={styles.foodTitle}>{title}</Text>
          <Text style={styles.calorieTag}>🔥 {calories} kcal</Text>

          {/* Macro Badge Pills */}
          <View style={styles.macroPillRow}>
            <View style={styles.macroPill}>
              <Text style={styles.macroPillText}>{protein}g P</Text>
            </View>
            <View style={styles.macroPill}>
              <Text style={styles.macroPillText}>{carbs}g C</Text>
            </View>
            <View style={styles.macroPill}>
              <Text style={styles.macroPillText}>{fats}g F</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Inline Portion Scale Controls */}
      <View style={styles.portionRow}>
        <Text style={styles.portionLabel}>Portion Scale:</Text>
        <View style={styles.scaleBtnGroup}>
          {([1, 1.5, 2] as const).map((s) => (
            <Pressable
              key={s}
              style={[styles.scaleBtn, scale === s && styles.scaleBtnActive]}
              onPress={() => setScale(s)}
              accessibilityRole="button"
              accessibilityLabel={`Scale portion to ${s}x`}
            >
              <Text style={[styles.scaleText, scale === s && styles.scaleTextActive]}>
                {s}x
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCol: {
    width: '38%',
    height: 90,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  foodPhoto: {
    width: '100%',
    height: '100%',
  },
  mealBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  mealBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
  },
  infoCol: {
    width: '62%',
    paddingLeft: 14,
  },
  foodTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 2,
  },
  calorieTag: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.neonOrange,
    marginBottom: 8,
  },
  macroPillRow: {
    flexDirection: 'row',
    gap: 6,
  },
  macroPill: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  macroPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
  portionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    marginTop: 12,
    paddingTop: 10,
  },
  portionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
  scaleBtnGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  scaleBtn: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  scaleBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  scaleText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
  scaleTextActive: {
    color: colors.onPrimary,
    fontWeight: '900',
  },
});
