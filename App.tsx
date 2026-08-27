import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, StatusBar, StyleSheet } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { NutritionScreen } from './src/screens/NutritionScreen';
import { WorkoutsScreen } from './src/screens/WorkoutsScreen';
import { MetricsScreen } from './src/screens/MetricsScreen';
import { colors } from './src/tokens/color-system';

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Screen Body */}
      <View style={styles.body}>{renderScreen()}</View>

      {/* Accessible Bottom Navigation Bar */}
      <View style={styles.navbar}>
        <Pressable
          onPress={() => setActiveTab('home')}
          accessibilityRole="button"
          accessibilityLabel="Home Dashboard Tab"
          accessibilityState={{ selected: activeTab === 'home' }}
          style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
        >
          <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>
            🏠 Home
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('nutrition')}
          accessibilityRole="button"
          accessibilityLabel="Nutrition Tab"
          accessibilityState={{ selected: activeTab === 'nutrition' }}
          style={[styles.navItem, activeTab === 'nutrition' && styles.navItemActive]}
        >
          <Text style={[styles.navText, activeTab === 'nutrition' && styles.navTextActive]}>
            🥗 Meals
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('workouts')}
          accessibilityRole="button"
          accessibilityLabel="Workouts Tab"
          accessibilityState={{ selected: activeTab === 'workouts' }}
          style={[styles.navItem, activeTab === 'workouts' && styles.navItemActive]}
        >
          <Text style={[styles.navText, activeTab === 'workouts' && styles.navTextActive]}>
            🏋️ Workouts
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('metrics')}
          accessibilityRole="button"
          accessibilityLabel="Health Metrics Tab"
          accessibilityState={{ selected: activeTab === 'metrics' }}
          style={[styles.navItem, activeTab === 'metrics' && styles.navItemActive]}
        >
          <Text style={[styles.navText, activeTab === 'metrics' && styles.navTextActive]}>
            ⌚ Metrics
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 22,
    alignItems: 'center',
    justify: 'center',
  },
  navItemActive: {
    backgroundColor: colors.primaryContainer,
  },
  navText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  navTextActive: {
    color: colors.onPrimaryContainer,
    fontWeight: '700',
  },
});
