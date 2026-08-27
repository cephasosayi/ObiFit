import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { MacroTile } from '../components/ui/molecules/MacroTile';
import { Button } from '../components/ui/atoms/Button';
import { useWearableSync } from '../hooks/useWearableSync';

export const HomeScreen: React.FC = () => {
  const { metrics, syncMetrics } = useWearableSync();

  return (
    <ScrollView className="flex-1 bg-surface p-6">
      <View className="mb-6">
        <Text className="text-heading-xl font-bold text-text-primary">ObiFit</Text>
        <Text className="text-caption-sm text-text-secondary">West Africa Health & Momentum Tracker</Text>
      </View>

      <View className="p-6 bg-primary-container rounded-card mb-6 shadow-md">
        <Text className="text-caption-sm text-on-primary uppercase font-bold tracking-wider">
          Momentum Score
        </Text>
        <Text className="text-heading-xl font-bold text-on-primary my-1">88 / 100</Text>
        <Text className="text-caption-sm text-on-primary opacity-90">
          Consistent progress across Nutrition, Hydration & Steps!
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-heading-md font-bold text-text-primary mb-3">Daily Macros</Text>
        <MacroTile label="Protein" currentGrams={65} targetGrams={120} variant="protein" />
        <MacroTile label="Carbohydrates" currentGrams={180} targetGrams={220} variant="carbs" />
        <MacroTile label="Healthy Fats" currentGrams={45} targetGrams={65} variant="fats" />
      </View>

      <View className="p-4 bg-surface-container rounded-card mb-6 border border-outline-variant">
        <Text className="text-body-md font-bold text-text-primary">Wearable Sync</Text>
        <Text className="text-caption-sm text-text-secondary mt-1 mb-3">
          Steps: {metrics?.steps ? metrics.steps.toLocaleString() : '7,420'} ({metrics?.source || 'Oraimo'})
        </Text>
        <Button label="Sync Smartwatch" variant="secondary" onPress={() => syncMetrics(true)} />
      </View>
    </ScrollView>
  );
};
