import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface IDayItem {
  dayName: string;
  dayNumber: number;
  isToday?: boolean;
}

export const WeeklyCalendarStrip: React.FC = () => {
  const days: IDayItem[] = [
    { dayName: 'Mon', dayNumber: 8 },
    { dayName: 'Tue', dayNumber: 9 },
    { dayName: 'Wed', dayNumber: 10 },
    { dayName: 'Thr', dayNumber: 11 },
    { dayName: 'Fri', dayNumber: 12, isToday: true },
    { dayName: 'Sat', dayNumber: 13 },
    { dayName: 'Sun', dayNumber: 14 },
  ];

  const [selectedDay, setSelectedDay] = useState<number>(12);

  return (
    <View style={styles.container}>
      {days.map((item) => {
        const isSelected = selectedDay === item.dayNumber;
        return (
          <Pressable
            key={item.dayNumber}
            style={[styles.dayCard, isSelected && styles.dayCardActive]}
            onPress={() => setSelectedDay(item.dayNumber)}
            accessibilityRole="button"
            accessibilityLabel={`Select ${item.dayName} ${item.dayNumber}`}
          >
            <Text style={[styles.dayName, isSelected && styles.dayNameActive]}>
              {item.dayName}
            </Text>
            <Text style={[styles.dayNum, isSelected && styles.dayNumActive]}>
              {item.dayNumber}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  dayCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    minWidth: 44,
  },
  dayCardActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  dayNameActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  dayNum: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.onSurface,
  },
  dayNumActive: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
});
