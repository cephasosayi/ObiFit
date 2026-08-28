import React, { useState } from 'react';
import { ScrollView, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors } from '../tokens/color-system';
import { Button } from '../components/ui/atoms/Button';
import { useAudioDucking } from '../hooks/useAudioDucking';

export interface IWorkoutDetailScreenProps {
  routineTitle: string;
  category: string;
  durationMinutes: number;
  calories: number;
  level: string;
  mannequinImage: any;
  targetMuscles: { name: string; percentage: number }[];
  onBack: () => void;
}

export const WorkoutDetailScreen: React.FC<IWorkoutDetailScreenProps> = ({
  routineTitle,
  category,
  durationMinutes,
  calories,
  level,
  mannequinImage,
  targetMuscles,
  onBack,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [restSeconds, setRestSeconds] = useState(55);
  const [completedSets, setCompletedSets] = useState<boolean[]>([true, true, false, false]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { isDucked, triggerVoiceCue } = useAudioDucking();

  const exercises = [
    { name: 'Abdominal Stretch & Warmup', reps: '12 reps', sets: '3 sets' },
    { name: 'Ab Roller Crunch', reps: '15 reps', sets: '4 sets' },
    { name: 'Lower Back Alignment Hold', reps: '30 sec', sets: '3 sets' },
    { name: 'Pelvic Floor Lift', reps: '10 reps', sets: '3 sets' },
  ];

  const handleStartWorkout = () => {
    setIsPlaying(true);
    triggerVoiceCue(3000);
  };

  const toggleSet = (index: number) => {
    const updated = [...completedSets];
    updated[index] = !updated[index];
    setCompletedSets(updated);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Top Header Navigation */}
      <View style={styles.navHeader}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹ Back</Text>
        </Pressable>
        <Text style={styles.navHeaderTitle}>{category}</Text>
        <View style={styles.placeholderBtn} />
      </View>

      {/* 3D Mannequin Visual Display */}
      <View style={styles.mannequinCard}>
        <Image source={mannequinImage} style={styles.mannequinImg} resizeMode="contain" />
        <View style={styles.mannequinBadge}>
          <Text style={styles.mannequinBadgeText}>3D ANATOMICAL MANNEQUIN</Text>
        </View>

        {isDucked ? (
          <View style={styles.voiceCoachOverlay}>
            <Text style={styles.voiceCoachText}>🎙️ Voice Coach Cues Active (Music Ducked 70%)</Text>
          </View>
        ) : null}
      </View>

      {/* Routine Title & Meta Stats */}
      <Text style={styles.title}>{routineTitle}</Text>
      <View style={styles.statsRow}>
        <View style={styles.statPill}>
          <Text style={styles.statPillText}>⏱️ {durationMinutes} Mins</Text>
        </View>
        <View style={styles.statPill}>
          <Text style={styles.statPillText}>🔥 {calories} Cal</Text>
        </View>
        <View style={[styles.statPill, styles.statPillLime]}>
          <Text style={styles.statPillLimeText}>⚡ {level}</Text>
        </View>
      </View>

      {/* Target Muscle Breakdown Widget */}
      <View style={styles.cardContainer}>
        <Text style={styles.sectionHeader}>Target Muscles</Text>
        <View style={styles.muscleRow}>
          {targetMuscles.map((m, idx) => (
            <View key={idx} style={styles.muscleChip}>
              <View style={styles.muscleDot} />
              <Text style={styles.muscleText}>
                {m.name} <Text style={styles.musclePercent}>{m.percentage}%</Text>
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Interactive Workout Rest Timer (When Active) */}
      {isPlaying ? (
        <View style={styles.timerCard}>
          <Text style={styles.timerHeader}>REST TIME</Text>
          <Text style={styles.timerDigits}>
            00:{restSeconds < 10 ? `0${restSeconds}` : restSeconds}
          </Text>
          <View style={styles.timerRow}>
            <Pressable style={styles.timerBtn} onPress={() => setRestSeconds(Math.max(0, restSeconds - 10))}>
              <Text style={styles.timerBtnText}>- 10s</Text>
            </Pressable>
            <Pressable style={[styles.timerBtn, styles.skipBtn]} onPress={() => setRestSeconds(0)}>
              <Text style={styles.skipBtnText}>SKIP</Text>
            </Pressable>
            <Pressable style={styles.timerBtn} onPress={() => setRestSeconds(restSeconds + 10)}>
              <Text style={styles.timerBtnText}>+ 10s</Text>
            </Pressable>
          </View>
        </View>
      ) : null}

      {/* Exercise Steps Carousel */}
      <View style={styles.cardContainer}>
        <Text style={styles.sectionHeader}>Exercise Sequence</Text>
        {exercises.map((ex, idx) => (
          <Pressable
            key={idx}
            onPress={() => setCurrentStepIndex(idx)}
            style={[
              styles.exerciseItem,
              currentStepIndex === idx && styles.exerciseItemActive,
            ]}
          >
            <View style={styles.exerciseNum}>
              <Text style={[styles.exerciseNumText, currentStepIndex === idx && styles.exerciseNumTextActive]}>
                {idx + 1}
              </Text>
            </View>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{ex.name}</Text>
              <Text style={styles.exerciseSub}>{ex.reps} • {ex.sets}</Text>
            </View>
            {currentStepIndex === idx ? (
              <View style={styles.playingDot} />
            ) : null}
          </Pressable>
        ))}
      </View>

      {/* Interactive Set Tracker */}
      {isPlaying ? (
        <View style={styles.cardContainer}>
          <View style={styles.setRow}>
            <Text style={styles.sectionHeader}>Log Sets</Text>
            <View style={styles.setGrid}>
              {completedSets.map((done, idx) => (
                <Pressable
                  key={idx}
                  style={[styles.setCircle, done && styles.setCircleDone]}
                  onPress={() => toggleSet(idx)}
                >
                  <Text style={[styles.setText, done && styles.setTextDone]}>{done ? '✓' : idx + 1}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      ) : null}

      {/* Action Footer */}
      <View style={styles.actionFooter}>
        <Button
          label={isPlaying ? 'Pause Workout' : 'Swipe to Start Session'}
          onPress={isPlaying ? () => setIsPlaying(false) : handleStartWorkout}
        />
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
    paddingBottom: 60,
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  navHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.onSurfaceVariant,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  placeholderBtn: {
    width: 44,
  },
  mannequinCard: {
    height: 240,
    backgroundColor: '#16080A',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  mannequinImg: {
    width: '100%',
    height: '100%',
  },
  mannequinBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  mannequinBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 1,
  },
  voiceCoachOverlay: {
    position: 'absolute',
    bottom: 12,
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  voiceCoachText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onPrimaryContainer,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.onSurface,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statPill: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  statPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.onSurface,
  },
  statPillLime: {
    backgroundColor: colors.accentLime,
    borderColor: colors.accentLime,
  },
  statPillLimeText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.onAccentLime,
  },
  cardContainer: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 12,
  },
  muscleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  muscleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  muscleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neonOrange,
    marginRight: 6,
  },
  muscleText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurface,
  },
  musclePercent: {
    color: colors.neonOrange,
    fontWeight: '800',
  },
  timerCard: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.neonOrange,
  },
  timerHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.onSurfaceVariant,
    letterSpacing: 1.5,
  },
  timerDigits: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.neonOrange,
    marginVertical: 4,
    fontFamily: 'monospace',
  },
  timerRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  timerBtn: {
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  timerBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.onSurface,
  },
  skipBtn: {
    backgroundColor: colors.primaryContainer,
  },
  skipBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.primary,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerLow,
    marginBottom: 8,
  },
  exerciseItemActive: {
    backgroundColor: colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  exerciseNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseNumText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.onSurfaceVariant,
  },
  exerciseNumTextActive: {
    color: colors.primary,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  exerciseSub: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  playingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  setGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  setCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setCircleDone: {
    backgroundColor: colors.accentLime,
  },
  setText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.onSurfaceVariant,
  },
  setTextDone: {
    color: colors.onAccentLime,
  },
  actionFooter: {
    marginTop: 8,
  },
});
