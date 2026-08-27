import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { MealItemCard } from '../components/ui/molecules/MealItemCard';
import { Button } from '../components/ui/atoms/Button';
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
        <Text style={styles.title}>Nutrition</Text>
        <Text style={styles.subtitle}>AI-Powered Regional Meal Logging</Text>
      </View>

      <Button label="Log Meal with AI" onPress={() => setIsModalOpen(true)} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today&apos;s Logs</Text>
        <MealItemCard
          name="Jollof Rice & Grilled Chicken"
          calories={650}
          proteinGrams={42}
          carbsGrams={78}
          fatGrams={18}
          mealType="lunch"
        />
        <MealItemCard
          name="Amala & Egusi Soup"
          calories={720}
          proteinGrams={35}
          carbsGrams={85}
          fatGrams={26}
          mealType="dinner"
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
    paddingBottom: 40,
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
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 12,
  },
});
