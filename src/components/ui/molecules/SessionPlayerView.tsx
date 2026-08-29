import React, { useState } from 'react';
import { View, Text, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface ISessionPlayerViewProps {
  title: string;
  coachName: string;
  imageUri: string;
  onClosePlayer?: () => void;
}

export const SessionPlayerView: React.FC<ISessionPlayerViewProps> = ({
  title = 'GENERAL WARM-UP',
  coachName = 'by Victoria Stiller',
  imageUri = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
  onClosePlayer,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressSec, setProgressSec] = useState(6);
  const totalSec = 361; // 6:01

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const formatRemaining = (sec: number) => {
    const rem = totalSec - sec;
    const m = Math.floor(rem / 60);
    const s = rem % 60;
    return `-${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: imageUri }} style={styles.heroViewport} imageStyle={styles.imageRadius}>
        <View style={styles.overlay}>
          {/* Top Close Bar */}
          {onClosePlayer ? (
            <Pressable style={styles.closeBtn} onPress={onClosePlayer}>
              <Text style={styles.closeText}>✕ Close Player</Text>
            </Pressable>
          ) : null}

          {/* Bottom Player Overlay Info & Controls */}
          <View style={styles.playerControlsContainer}>
            <Text style={styles.workoutTitle}>{title.toUpperCase()}</Text>
            <Text style={styles.coachSubtitle}>{coachName}</Text>

            {/* Scrubber Bar */}
            <View style={styles.scrubberRow}>
              <View style={styles.trackBar}>
                <View
                  style={[
                    styles.fillBar,
                    { width: `${(progressSec / totalSec) * 100}%` },
                  ]}
                />
              </View>
              <View style={styles.timeLabelsRow}>
                <Text style={styles.timeLabel}>{formatTime(progressSec)}</Text>
                <Text style={styles.timeLabel}>{formatRemaining(progressSec)}</Text>
              </View>
            </View>

            {/* Media Control Buttons (-10s, Play/Pause, +10s) */}
            <View style={styles.controlsRow}>
              <Pressable
                style={styles.skipBtn}
                onPress={() => setProgressSec((prev) => Math.max(0, prev - 10))}
                accessibilityRole="button"
                accessibilityLabel="Rewind 10 seconds"
              >
                <Text style={styles.skipText}>↺ 10</Text>
              </Pressable>

              <Pressable
                style={styles.playBtn}
                onPress={() => setIsPlaying(!isPlaying)}
                accessibilityRole="button"
                accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
              >
                <Text style={styles.playIcon}>{isPlaying ? '❚❚' : '▶'}</Text>
              </Pressable>

              <Pressable
                style={styles.skipBtn}
                onPress={() => setProgressSec((prev) => Math.min(totalSec, prev + 10))}
                accessibilityRole="button"
                accessibilityLabel="Forward 10 seconds"
              >
                <Text style={styles.skipText}>↻ 10</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 480,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 24,
  },
  heroViewport: {
    width: '100%',
    height: '100%',
  },
  imageRadius: {
    borderRadius: 28,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 11, 14, 0.45)',
    padding: 20,
    justifyContent: 'space-between',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  closeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  playerControlsContainer: {
    backgroundColor: 'rgba(22, 22, 28, 0.88)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 0.5,
    marginBottom: 2,
    textAlign: 'center',
  },
  coachSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginBottom: 16,
    textAlign: 'center',
  },
  scrubberRow: {
    width: '100%',
    marginBottom: 18,
  },
  trackBar: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  fillBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  timeLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    fontFamily: 'monospace',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  skipBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.onSurface,
  },
  playBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },
  playIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 2,
  },
});
