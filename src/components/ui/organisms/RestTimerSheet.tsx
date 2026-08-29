import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { Button } from '../atoms/Button';
import { colors } from '../../../tokens/color-system';

export interface IRestTimerSheetProps {
  isVisible: boolean;
  initialSeconds?: number;
  nextExerciseName?: string;
  onClose: () => void;
  onTimerComplete: () => void;
}

export const RestTimerSheet: React.FC<IRestTimerSheetProps> = ({
  isVisible,
  initialSeconds = 60,
  nextExerciseName = 'Push-Ups (Set 2 of 4)',
  onClose,
  onTimerComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (!isVisible) {
      setTimeLeft(initialSeconds);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isVisible, initialSeconds, onTimerComplete]);

  const adjustTime = (seconds: number) => {
    setTimeLeft((prev) => Math.max(0, prev + seconds));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheetContent}>
          <View style={styles.handle} />
          <Text style={styles.headerTitle}>REST & RECOVER</Text>
          <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>

          <View style={styles.adjustRow}>
            <Pressable
              style={styles.adjustBtn}
              onPress={() => adjustTime(-10)}
              accessibilityRole="button"
              accessibilityLabel="Decrease rest by 10 seconds"
            >
              <Text style={styles.adjustBtnText}>- 10s</Text>
            </Pressable>
            <Pressable
              style={[styles.adjustBtn, styles.skipBtn]}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Skip rest timer"
            >
              <Text style={styles.skipText}>SKIP REST</Text>
            </Pressable>
            <Pressable
              style={styles.adjustBtn}
              onPress={() => adjustTime(10)}
              accessibilityRole="button"
              accessibilityLabel="Increase rest by 10 seconds"
            >
              <Text style={styles.adjustBtnText}>+ 10s</Text>
            </Pressable>
          </View>

          <View style={styles.nextPreviewCard}>
            <Text style={styles.nextLabel}>UP NEXT</Text>
            <Text style={styles.nextExercise}>{nextExerciseName}</Text>
          </View>

          <Button label="Done Resting" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  sheetContent: {
    backgroundColor: colors.surfaceContainer,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: colors.outlineVariant,
    borderRadius: 3,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.onSurfaceVariant,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.neonOrange,
    fontFamily: 'monospace',
    marginBottom: 16,
  },
  adjustRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
    width: '100%',
  },
  adjustBtn: {
    flex: 1,
    backgroundColor: colors.surfaceContainerHighest,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
  },
  adjustBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  skipBtn: {
    backgroundColor: colors.primaryContainer,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  nextPreviewCard: {
    width: '100%',
    backgroundColor: colors.surfaceContainerHigh,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  nextLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.neonOrange,
    letterSpacing: 1,
    marginBottom: 4,
  },
  nextExercise: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
  },
});
