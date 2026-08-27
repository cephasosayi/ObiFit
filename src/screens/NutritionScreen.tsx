import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { MealItemCard } from '../components/ui/molecules/MealItemCard';
import { Button } from '../components/ui/atoms/Button';
import { AIMealLoggerModal } from '../components/ui/organisms/AIMealLoggerModal';
import { useOfflineSync } from '../hooks/useOfflineSync';

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
    <ScrollView className="flex-1 bg-surface p-6">
      <View className="mb-6">
        <Text className="text-heading-xl font-bold text-text-primary">Nutrition</Text>
        <Text className="text-caption-sm text-text-secondary">AI-Powered Regional Meal Logging</Text>
      </View>

      <Button label="Log Meal with AI" onPress={() => setIsModalOpen(true)} />

      <View className="mt-6">
        <Text className="text-heading-md font-bold text-text-primary mb-3">Today&apos;s Logs</Text>
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
