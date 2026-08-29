import React, { useState } from 'react';
import { ScrollView, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { ScheduledTrainingCard } from '../components/ui/molecules/ScheduledTrainingCard';
import { SessionPlayerView } from '../components/ui/molecules/SessionPlayerView';
import { colors } from '../tokens/color-system';

export const WorkoutsScreen: React.FC = () => {
  const [activeSession, setActiveSession] = useState<{
    title: string;
    coachName: string;
    imageUri: string;
  } | null>(null);

  const scheduledSessions = [
    {
      id: 'session-1',
      type: 'CALISTHENICS & WARM-UP',
      durationMinutes: 40,
      trainerName: 'Sophia Linkerton',
      timeString: '9:00',
      imageUri: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'session-2',
      type: 'HOME BODYWEIGHT & BOXING',
      durationMinutes: 60,
      trainerName: 'Emily Harper',
      timeString: '13:00',
      imageUri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'session-3',
      type: 'POSTURE & KEGEL STRENGTH',
      durationMinutes: 60,
      trainerName: 'Emily Harper',
      timeString: '18:00',
      imageUri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const trainerAvatarUri =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Top Trainer Header Bar */}
      <View style={styles.headerBar}>
        <Image source={{ uri: trainerAvatarUri }} style={styles.trainerAvatar} />
      </View>

      {/* Screen Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>DAILY</Text>
        <Text style={styles.mainTitle}>TRAINING</Text>
        <Text style={styles.mainTitle}>PLAN</Text>
      </View>

      {/* Active Session Media Player View */}
      {activeSession ? (
        <SessionPlayerView
          title={activeSession.title}
          coachName={activeSession.coachName}
          imageUri={activeSession.imageUri}
          onClosePlayer={() => setActiveSession(null)}
        />
      ) : null}

      {/* Scheduled Time Cards Feed */}
      <View style={styles.scheduleFeed}>
        {scheduledSessions.map((item) => (
          <ScheduledTrainingCard
            key={item.id}
            id={item.id}
            type={item.type}
            durationMinutes={item.durationMinutes}
            trainerName={item.trainerName}
            timeString={item.timeString}
            onPressStart={() =>
              setActiveSession({
                title: item.type,
                coachName: `by ${item.trainerName}`,
                imageUri: item.imageUri,
              })
            }
          />
        ))}
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
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  trainerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
  },
  titleContainer: {
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    lineHeight: 38,
  },
  scheduleFeed: {
    gap: 4,
  },
});
