import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, StatusBar, StyleSheet } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { NutritionScreen } from './src/screens/NutritionScreen';
import { WorkoutsScreen } from './src/screens/WorkoutsScreen';
import { MetricsScreen } from './src/screens/MetricsScreen';
import { AIMealLoggerModal } from './src/components/ui/organisms/AIMealLoggerModal';
import { useOfflineSync } from './src/hooks/useOfflineSync';
import { colors } from './src/tokens/color-system';

type Tab = 'home' | 'nutrition' | 'workouts' | 'metrics';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);
  const { enqueueLog } = useOfflineSync();

  const handleQuickLog = async (description: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    const logId = Math.random().toString(36).substring(2);
    await enqueueLog({
      log_id: logId,
      type: 'meal',
      payload: { description, mealType },
      timestamp: new Date().toISOString(),
    });
  };

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
      
      {/* Screen View */}
      <View style={styles.body}>{renderScreen()}</View>

      {/* Modern Floating Bottom Navigation Bar */}
      <View style={styles.navbarWrapper}>
        <View style={styles.navbar}>
          <Pressable
            onPress={() => setActiveTab('home')}
            accessibilityRole="button"
            accessibilityLabel="Home Tab"
            style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
          >
            <Text style={[styles.navIcon, activeTab === 'home' && styles.navIconActive]}>🏠</Text>
            <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>Home</Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('nutrition')}
            accessibilityRole="button"
            accessibilityLabel="Meals Tab"
            style={[styles.navItem, activeTab === 'nutrition' && styles.navItemActive]}
          >
            <Text style={[styles.navIcon, activeTab === 'nutrition' && styles.navIconActive]}>🥗</Text>
            <Text style={[styles.navText, activeTab === 'nutrition' && styles.navTextActive]}>Meals</Text>
          </Pressable>

          {/* Central Floating Plus Action Button */}
          <Pressable
            onPress={() => setIsQuickLogOpen(true)}
            accessibilityRole="button"
            accessibilityLabel="Quick AI Meal Logger"
            style={styles.floatingActionBtn}
          >
            <Text style={styles.floatingActionIcon}>+</Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('workouts')}
            accessibilityRole="button"
            accessibilityLabel="Workouts Tab"
            style={[styles.navItem, activeTab === 'workouts' && styles.navItemActive]}
          >
            <Text style={[styles.navIcon, activeTab === 'workouts' && styles.navIconActive]}>🏋️</Text>
            <Text style={[styles.navText, activeTab === 'workouts' && styles.navTextActive]}>Workouts</Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('metrics')}
            accessibilityRole="button"
            accessibilityLabel="Metrics Tab"
            style={[styles.navItem, activeTab === 'metrics' && styles.navItemActive]}
          >
            <Text style={[styles.navIcon, activeTab === 'metrics' && styles.navIconActive]}>⌚</Text>
            <Text style={[styles.navText, activeTab === 'metrics' && styles.navTextActive]}>Metrics</Text>
          </Pressable>
        </View>
      </View>

      {/* Global AI Quick Meal Logger Modal */}
      <AIMealLoggerModal
        isVisible={isQuickLogOpen}
        onClose={() => setIsQuickLogOpen(false)}
        onConfirmLog={handleQuickLog}
      />
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
  navbarWrapper: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#18181D',
    borderRadius: 36,
    borderWidth: 1,
    borderColor: '#2A2A36',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justify: 'space-between',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 10,
  },
  navItem: {
    minHeight: 44,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navItemActive: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  navIcon: {
    fontSize: 18,
    opacity: 0.6,
  },
  navIconActive: {
    opacity: 1,
  },
  navText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  navTextActive: {
    color: colors.accentLime,
  },
  floatingActionBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    marginHorizontal: 4,
  },
  floatingActionIcon: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.onPrimary,
    marginTop: -2,
  },
});
