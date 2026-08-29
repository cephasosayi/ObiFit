import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../tokens/color-system';

export interface IDayProgressItem {
  dayInitial: string;
  dayNumber: number;
  dateString: string;
  progressPercent: number; // 0 to 100
  hasExercise?: boolean;
  isMissed?: boolean;
  isToday?: boolean;
  isFuture?: boolean;
  summaryTitle?: string;
  stepsCount?: number;
  caloriesBurned?: number;
}

export interface IDynamicCalendarEngineProps {
  onSelectDate?: (day: IDayProgressItem) => void;
  avatarUri?: string;
  userName?: string;
}

export const DynamicCalendarEngine: React.FC<IDynamicCalendarEngineProps> = ({
  onSelectDate,
  avatarUri = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  userName = 'Uche',
}) => {
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedDateNum, setSelectedDateNum] = useState<number>(28);

  // Dynamically generated 7-day week dataset based on weekOffset
  const getDynamicWeekDays = (): IDayProgressItem[] => {
    if (weekOffset === 0) {
      return [
        {
          dayInitial: 'M',
          dayNumber: 24,
          dateString: '2026-08-24',
          progressPercent: 100,
          hasExercise: true,
          summaryTitle: 'Day 24: Leg & Lower Body Power',
          stepsCount: 10420,
          caloriesBurned: 520,
        },
        {
          dayInitial: 'T',
          dayNumber: 25,
          dateString: '2026-08-25',
          progressPercent: 100,
          hasExercise: false,
          summaryTitle: 'Day 25: Active Recovery & Hydration',
          stepsCount: 6100,
          caloriesBurned: 310,
        },
        {
          dayInitial: 'W',
          dayNumber: 26,
          dateString: '2026-08-26',
          progressPercent: 0,
          hasExercise: false,
          isMissed: true,
          summaryTitle: 'Day 26: Rest & Mobility',
          stepsCount: 2100,
          caloriesBurned: 110,
        },
        {
          dayInitial: 'T',
          dayNumber: 27,
          dateString: '2026-08-27',
          progressPercent: 100,
          hasExercise: true,
          summaryTitle: 'Day 27: Core & Pelvic Alignment',
          stepsCount: 9800,
          caloriesBurned: 460,
        },
        {
          dayInitial: 'F',
          dayNumber: 28,
          dateString: '2026-08-28',
          progressPercent: 0, // Progress recorded after day finishes
          hasExercise: true,
          isToday: true,
          summaryTitle: 'Day 28: Upper Body & Core Stability',
          stepsCount: 7420,
          caloriesBurned: 480,
        },
        {
          dayInitial: 'S',
          dayNumber: 29,
          dateString: '2026-08-29',
          progressPercent: 0,
          hasExercise: true,
          isFuture: true,
          summaryTitle: 'Day 29: HIIT & Calisthenics Burn',
          stepsCount: 0,
          caloriesBurned: 0,
        },
        {
          dayInitial: 'S',
          dayNumber: 30,
          dateString: '2026-08-30',
          progressPercent: 0,
          hasExercise: false,
          isFuture: true,
          summaryTitle: 'Day 30: Rest & Sunday Feast',
          stepsCount: 0,
          caloriesBurned: 0,
        },
      ];
    }

    const startNum = 24 + weekOffset * 7;
    const initials = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return Array.from({ length: 7 }, (_, i) => {
      const num = startNum + i;
      const initial = initials[i];
      const isPast = weekOffset < 0;
      const isFut = weekOffset > 0;
      const isMissed = isPast && (num % 5 === 0);
      const hasEx = num % 2 === 0;
      const pct = isPast && !isMissed ? 100 : 0;

      return {
        dayInitial: initial,
        dayNumber: num,
        dateString: `2026-08-${num < 10 ? '0' : ''}${num}`,
        progressPercent: pct,
        hasExercise: hasEx,
        isMissed,
        isToday: false,
        isFuture: isFut,
        summaryTitle: `Day ${num}: ${isPast ? 'Completed Routine' : 'Scheduled Routine'}`,
        stepsCount: isPast ? 8000 + (num % 5) * 600 : 0,
        caloriesBurned: isPast ? 400 + (num % 5) * 40 : 0,
      };
    });
  };

  const currentWeekDays = getDynamicWeekDays();

  // 4 Rows × 7 Columns = 28 Days Month Grid (Preserving Current Week Data for Aug 24 - 30)
  const monthGridDays: IDayProgressItem[] = Array.from({ length: 28 }, (_, i) => {
    const num = i + 3; // Aug 3 - Aug 30
    const currentWeekMatch = currentWeekDays.find((item) => item.dayNumber === num);
    if (currentWeekMatch) {
      return currentWeekMatch;
    }

    const initials = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const dInitial = initials[num % 7];
    const isMissed = num === 5 || num === 14;
    const hasEx = num % 2 === 0;
    const isFut = num > 28;
    const isTod = num === 28;
    const pct = isFut || isTod || isMissed ? 0 : 100;

    return {
      dayInitial: dInitial,
      dayNumber: num,
      dateString: `2026-08-${num < 10 ? '0' : ''}${num}`,
      progressPercent: pct,
      hasExercise: hasEx,
      isMissed,
      isToday: isTod,
      isFuture: isFut,
      summaryTitle: `Day ${num}: Scheduled Routine`,
      stepsCount: isFut ? 0 : 4000 + num * 200,
      caloriesBurned: isFut ? 0 : 200 + num * 15,
    };
  });

  const activeDays = isExpanded ? monthGridDays : currentWeekDays;

  const getWeekTitle = () => {
    if (weekOffset === 0) return 'This Week';
    if (weekOffset === -1) return 'Last Week (Aug 17 – 23)';
    if (weekOffset === 1) return 'Next Week (Sep 31 – 06)';
    return `Week ${weekOffset > 0 ? `+${weekOffset}` : weekOffset}`;
  };

  const handleSelectDay = (item: IDayProgressItem) => {
    setSelectedDateNum(item.dayNumber);
    if (onSelectDate) {
      onSelectDate(item);
    }
  };

  return (
    <View style={styles.fullWidthContainer}>
      {/* 1. Integrated Profile Greeting + Notification Bell Header */}
      <View style={styles.headerProfileRow}>
        <View style={styles.userGroup}>
          <Image source={{ uri: avatarUri }} style={styles.avatarPhoto} />
          <View>
            <Text style={styles.greetingTitle}>Hi, {userName}</Text>
            <Text style={styles.greetingSub}>Welcome Back!</Text>
          </View>
        </View>

        <Pressable
          style={styles.bellBtn}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <MaterialCommunityIcons name="bell-outline" size={20} color={colors.onSurface} />
        </Pressable>
      </View>

      {/* 2. Week Navigation Header (< "This Week" >) */}
      <View style={styles.weekNavRow}>
        <Pressable
          style={styles.navArrowBtn}
          onPress={() => setWeekOffset((prev) => prev - 1)}
          accessibilityRole="button"
          accessibilityLabel="Previous Week"
        >
          <MaterialCommunityIcons name="chevron-left" size={20} color={colors.onSurface} />
        </Pressable>

        <Text style={styles.rangeTitle}>{getWeekTitle()}</Text>

        <Pressable
          style={styles.navArrowBtn}
          onPress={() => setWeekOffset((prev) => prev + 1)}
          accessibilityRole="button"
          accessibilityLabel="Next Week"
        >
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.onSurface} />
        </Pressable>
      </View>

      {/* 3. Days Matrix (Faded Muted Circle Track for Present & Future Dates) */}
      <View style={styles.daysMatrixGrid}>
        {activeDays.map((item) => {
          const isSelected = selectedDateNum === item.dayNumber;
          const isTodayUnselected = item.isToday && !isSelected;
          const isFutureUnselected = item.isFuture && !isSelected;
          const isPastCompleted = !item.isToday && !item.isFuture && item.progressPercent >= 90;
          const isIncomplete = !item.isToday && !item.isFuture && item.progressPercent < 90;

          // Text & Initial Color Logic:
          // Active Selected -> White (#FFFFFF) / Primary Crimson (#F72545)
          // Today Unselected -> Primary Crimson (#F72545)
          // Past Completed -> Success Green (#34C759)
          // Future / Incomplete -> Muted Grey (#A0A0B0)
          const stateColor = isSelected || isTodayUnselected
            ? colors.primary
            : isPastCompleted
            ? colors.success
            : colors.onSurfaceVariant;

          // Dumbbell Icon Color: Today -> Primary Crimson (#F72545)
          const dumbbellColor = isTodayUnselected
            ? colors.primary
            : isPastCompleted
            ? colors.success
            : colors.onSurfaceVariant;

          return (
            <Pressable
              key={item.dateString}
              style={styles.dayCol}
              onPress={() => handleSelectDay(item)}
              accessibilityRole="button"
              accessibilityLabel={`Select Date ${item.dayNumber}`}
            >
              {/* Single Letter Initial */}
              <Text style={[styles.initialText, { color: stateColor }]}>
                {item.dayInitial}
              </Text>

              {/* 44px Thick Circle Container */}
              <View
                style={[
                  styles.ringBaseTrack,
                  (isTodayUnselected || isFutureUnselected) && styles.ringTodayMutedGreyCircle,
                  isPastCompleted && styles.ringCompletedSuccess,
                  isIncomplete && styles.ringIncompleteGrey,
                  isSelected && styles.ringActiveFilledPrimary,
                ]}
              >
                <Text
                  style={[
                    styles.dateNumberText,
                    { color: isSelected ? '#FFFFFF' : stateColor },
                  ]}
                >
                  {item.dayNumber}
                </Text>

                {/* 20px Absolute Position Dumbbell Icon (Hidden on Active Selected Day) */}
                {item.hasExercise && !isSelected ? (
                  <View style={styles.absoluteDumbbellBadge}>
                    <MaterialCommunityIcons
                      name="dumbbell"
                      size={11}
                      color={dumbbellColor}
                    />
                  </View>
                ) : item.isMissed && !isSelected ? (
                  <View style={styles.absoluteMissedDot} />
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* 4. Sleek Drag Handle Indicator Pill */}
      <Pressable
        style={styles.handleContainer}
        onPress={() => setIsExpanded(!isExpanded)}
        accessibilityRole="button"
        accessibilityLabel={isExpanded ? 'Collapse Calendar' : 'Expand Calendar'}
      >
        <View style={styles.handlePill} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  fullWidthContainer: {
    width: '100%',
    backgroundColor: colors.surfaceContainer,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: colors.outlineVariant,
  },
  headerProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  userGroup: {
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
  weekNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  navArrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rangeTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.onSurface,
    letterSpacing: 0.3,
  },
  daysMatrixGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 14,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayCol: {
    width: '13.5%', // 7 per row
    alignItems: 'center',
  },
  initialText: {
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 4,
  },

  /* 44px Date Pill Base Track */
  ringBaseTrack: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3.5,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainer,
    position: 'relative',
  },

  /* Active Selected Day: Solid Filled with Primary Color (#F72545) */
  ringActiveFilledPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 3.5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },

  /* Today Unselected: Ultra-Muted Faint Grey Circle Border */
  ringTodayMutedGreyCircle: {
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderWidth: 2.5,
  },

  /* Future Dates Unselected: Filled Faded Muted Track */
  ringFadedMutedTrack: {
    backgroundColor: colors.surfaceContainerHighest,
    borderColor: colors.outlineVariant,
    borderWidth: 2.5,
  },

  /* Completed Goal Days: 3.5px Closed Ring in Success Color (#34C759) */
  ringCompletedSuccess: {
    borderColor: colors.success,
    borderWidth: 3.5,
  },

  /* Incomplete Days: 3.5px Incomplete Arc Ring in Muted Grey (#3E3E4C) */
  ringIncompleteGrey: {
    borderColor: colors.outline,
    borderTopColor: 'transparent', // Incomplete arc
    borderWidth: 3.5,
  },

  dateNumberText: {
    fontSize: 13,
    fontWeight: '900',
  },
  dateNumberSelected: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  absoluteDumbbellBadge: {
    position: 'absolute',
    bottom: -4,
    left: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  absoluteMissedDot: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.error,
  },
  badgeSlot: {
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  missedDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.error,
  },
  handleContainer: {
    width: '100%',
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handlePill: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.outlineVariant,
  },
});
