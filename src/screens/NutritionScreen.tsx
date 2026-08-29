import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { HeroCalorieCard } from '../components/ui/molecules/HeroCalorieCard';
import { MacroSplitCarousel } from '../components/ui/molecules/MacroSplitCarousel';
import { RegionalFoodCardImage } from '../components/ui/molecules/RegionalFoodCardImage';
import { HydrationLiquidCard } from '../components/ui/molecules/HydrationLiquidCard';
import { AIMealLoggerModal } from '../components/ui/organisms/AIMealLoggerModal';
import { useOfflineSync } from '../hooks/useOfflineSync';
import { colors } from '../tokens/color-system';

export const NutritionScreen: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { enqueueLog } = useOfflineSync();

  const handleParseMeal = async (description: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    const logId = Math.random().toString(36).substring(2);
    await enqueueLog({
      log_id: logId,
      type: 'meal',
      payload: { description, mealType },
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrition Engine</Text>
        <Text style={styles.subtitle}>Image-First Regional Meal & Macro Analytics</Text>
      </View>

      {/* Hero Calorie Budget Card with Full-Bleed Imagery */}
      <HeroCalorieCard
        remainingKcal={1420}
        consumedKcal={780}
        targetKcal={2200}
        burnRateKcal={480}
        onQuickLogPress={() => setIsModalOpen(true)}
      />

      {/* Textured Macro Split Carousel */}
      <Text style={styles.sectionTitle}>Macro Distribution</Text>
      <MacroSplitCarousel />

      {/* Dynamic Hydration Liquid Card */}
      <HydrationLiquidCard initialMl={2250} targetMl={3000} />

      {/* Image-Driven Regional Food Cards with Inline Portion Slider */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Regional Meal Logs</Text>

        <RegionalFoodCardImage
          id="meal-1"
          title="Jollof Rice & Grilled Chicken"
          baseCalories={650}
          baseProtein={42}
          baseCarbs={78}
          baseFats={18}
          mealType="lunch"
          imageUri="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80"
        />

        <RegionalFoodCardImage
          id="meal-2"
          title="Amala & Egusi Soup"
          baseCalories={720}
          baseProtein={35}
          baseCarbs={85}
          baseFats={26}
          mealType="dinner"
          imageUri="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&auto=format&fit=crop&q=80"
        />

        <RegionalFoodCardImage
          id="meal-3"
          title="Suya Beef & Plantain Chips"
          baseCalories={480}
          baseProtein={38}
          baseCarbs={30}
          baseFats={22}
          mealType="snack"
          imageUri="https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80"
        />
      </View>

      <AIMealLoggerModal
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirmLog={handleParseMeal}
      />
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
    paddingBottom: 110,
  },
  header: {
    marginBottom: 16,
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
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 12,
  },
});
