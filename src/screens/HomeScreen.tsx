import React from 'react';
import { ScrollView, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { WeeklyCalendarStrip } from '../components/ui/molecules/WeeklyCalendarStrip';
import { ActivityBarChartCard } from '../components/ui/molecules/ActivityBarChartCard';
import { MetricGaugeCard } from '../components/ui/molecules/MetricGaugeCard';
import { TrendingPlanCard } from '../components/ui/molecules/TrendingPlanCard';
import { DailyWorkoutPlanCard } from '../components/ui/molecules/DailyWorkoutPlanCard';
import { DailyFoodPlanCard } from '../components/ui/molecules/DailyFoodPlanCard';
import { useWearableSync } from '../hooks/useWearableSync';
import { useWorkoutPersistence } from '../hooks/useWorkoutPersistence';
import { colors } from '../tokens/color-system';

export const HomeScreen: React.FC = () => {
  const { metrics, syncMetrics } = useWearableSync();
  const { unfinishedSession, clearActiveSession } = useWorkoutPersistence();

  const avatarUri =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  const trendingPlans = [
    {
      id: 'plan-1',
      title: 'Belly Fat Shredder',
      subtitle: 'Lose stubborn fat & reveal your hidden abs!',
      imageUri:
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'plan-2',
      title: 'Abs & Core Power',
      subtitle: 'Gain core strength & target midsection stability!',
      imageUri:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* 1. Header Bar (User Avatar + Greeting + Bell Icon) */}
      <View style={styles.headerRow}>
        <View style={styles.userProfileGroup}>
          <Image source={{ uri: avatarUri }} style={styles.avatarPhoto} />
          <View>
            <Text style={styles.greetingTitle}>Hi, Uche</Text>
            <Text style={styles.greetingSub}>Welcome Back!</Text>
          </View>
        </View>

        <Pressable
          style={styles.bellBtn}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <Text style={styles.bellIcon}>🔔</Text>
        </Pressable>
      </View>

      {/* Unfinished Workout Banner (Crash Recovery) */}
      {unfinishedSession ? (
        <View style={styles.recoveryBanner}>
          <View style={styles.recoveryTextCol}>
            <Text style={styles.recoveryTitle}>⚠️ Unfinished Workout Detected</Text>
            <Text style={styles.recoverySub}>{unfinishedSession.routineTitle}</Text>
          </View>
          <View style={styles.recoveryActions}>
            <Pressable style={styles.discardBtn} onPress={clearActiveSession}>
              <Text style={styles.discardText}>Discard</Text>
            </Pressable>
            <Pressable style={styles.resumeBtn} onPress={() => {}}>
              <Text style={styles.resumeText}>Resume</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      {/* 2. Interactive Weekly Calendar Strip */}
      <WeeklyCalendarStrip />

      {/* 3. Recent Activity Section */}
      <Text style={styles.sectionHeader}>Recent Activity</Text>

      {/* Steps Bar Chart Card */}
      <ActivityBarChartCard
        stepCount={metrics?.steps || 3246}
        distanceKm={2.51}
        caloriesBurned={123.45}
      />

      {/* Dual Metric Split Cards (Calories & Durations) */}
      <View style={styles.dualMetricRow}>
        <MetricGaugeCard type="calories" valueText="123.45 Kcal" />
        <MetricGaugeCard type="durations" valueText="120 Mins" />
      </View>

      {/* 4. Trending Plans Section */}
      <Text style={styles.sectionHeader}>Trending Plans</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carouselScroll}
      >
        {trendingPlans.map((plan) => (
          <TrendingPlanCard
            key={plan.id}
            id={plan.id}
            title={plan.title}
            subtitle={plan.subtitle}
            imageUri={plan.imageUri}
            onJoinPress={() => {}}
          />
        ))}
      </ScrollView>

      {/* 5. Daily Structured Goal Plans */}
      <Text style={styles.sectionHeader}>Today&apos;s Structured Plan</Text>
      <DailyWorkoutPlanCard
        dayTitle="Day 5: Upper Body & Core Stability"
        goalName="Calisthenics & Posture"
        durationMinutes={45}
        onStartSession={() => {}}
      />

      <DailyFoodPlanCard
        dailyTargetKcal={2200}
        dailyTargetProtein={130}
        onOpenMealLogger={() => {}}
      />

      {/* 6. Hardware Sync Status Tile */}
      <View style={styles.syncCard}>
        <Text style={styles.syncTitle}>Wearable Hardware Sync</Text>
        <Text style={styles.syncSubtitle}>
          Connected: {metrics?.source || 'Oraimo Watch'} • Auto-synced 14:00
        </Text>
        <Pressable style={styles.syncBtn} onPress={() => syncMetrics(true)}>
          <Text style={styles.syncBtnText}>Sync Smartwatch Now</Text>
        </Pressable>
      </View>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  userProfileGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarPhoto: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
  },
  greetingTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.onSurface,
  },
  greetingSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  bellIcon: {
    fontSize: 16,
  },
  recoveryBanner: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: colors.neonOrange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recoveryTextCol: {
    flex: 1,
    marginRight: 10,
  },
  recoveryTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.neonOrange,
  },
  recoverySub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  recoveryActions: {
    flexDirection: 'row',
    gap: 8,
  },
  discardBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: colors.surfaceContainerHighest,
  },
  discardText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
  resumeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  resumeText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.onPrimary,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.onSurface,
    marginBottom: 14,
    marginTop: 8,
  },
  dualMetricRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  carouselScroll: {
    marginBottom: 24,
  },
  syncCard: {
    padding: 20,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginTop: 8,
  },
  syncTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.onSurface,
  },
  syncSubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    marginBottom: 14,
  },
  syncBtn: {
    backgroundColor: colors.surfaceContainerHighest,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  syncBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
});
