import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, StatusBar } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { NutritionScreen } from './src/screens/NutritionScreen';
import { WorkoutsScreen } from './src/screens/WorkoutsScreen';
import { MetricsScreen } from './src/screens/MetricsScreen';

type Tab = 'home' | 'nutrition' | 'workouts' | 'metrics';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'nutrition':
        return <NutritionScreen />;
      case 'workouts':
        return <WorkoutsScreen />;
      case 'metrics':
        return <MetricsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Screen Body */}
      <View className="flex-1">{renderScreen()}</View>

      {/* Accessible Bottom Tab Navigation Bar */}
      <View className="flex-row bg-surface-container border-t border-outline-variant py-2 px-4 justify-around items-center">
        <Pressable
          onPress={() => setActiveTab('home')}
          accessibilityRole="button"
          accessibilityLabel="Home Dashboard Tab"
          accessibilityState={{ selected: activeTab === 'home' }}
          className={`min-h-[44px] min-w-[44px] items-center justify-center px-3 py-1 rounded-full ${
            activeTab === 'home' ? 'bg-primary-container' : 'transparent'
          }`}
        >
          <Text className={`text-caption-sm font-bold ${activeTab === 'home' ? 'text-on-primary' : 'text-text-secondary'}`}>
            🏠 Home
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('nutrition')}
          accessibilityRole="button"
          accessibilityLabel="Nutrition Tab"
          accessibilityState={{ selected: activeTab === 'nutrition' }}
          className={`min-h-[44px] min-w-[44px] items-center justify-center px-3 py-1 rounded-full ${
            activeTab === 'nutrition' ? 'bg-primary-container' : 'transparent'
          }`}
        >
          <Text className={`text-caption-sm font-bold ${activeTab === 'nutrition' ? 'text-on-primary' : 'text-text-secondary'}`}>
            🥗 Meals
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('workouts')}
          accessibilityRole="button"
          accessibilityLabel="Workouts Tab"
          accessibilityState={{ selected: activeTab === 'workouts' }}
          className={`min-h-[44px] min-w-[44px] items-center justify-center px-3 py-1 rounded-full ${
            activeTab === 'workouts' ? 'bg-primary-container' : 'transparent'
          }`}
        >
          <Text className={`text-caption-sm font-bold ${activeTab === 'workouts' ? 'text-on-primary' : 'text-text-secondary'}`}>
            🏋️ Workouts
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('metrics')}
          accessibilityRole="button"
          accessibilityLabel="Health Metrics Tab"
          accessibilityState={{ selected: activeTab === 'metrics' }}
          className={`min-h-[44px] min-w-[44px] items-center justify-center px-3 py-1 rounded-full ${
            activeTab === 'metrics' ? 'bg-primary-container' : 'transparent'
          }`}
        >
          <Text className={`text-caption-sm font-bold ${activeTab === 'metrics' ? 'text-on-primary' : 'text-text-secondary'}`}>
            ⌚ Metrics
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
