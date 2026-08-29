import React from 'react';
import { View, Text, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface ITrendingPlanCardProps {
  id: string;
  title: string;
  subtitle: string;
  imageUri: string;
  onJoinPress: () => void;
}

export const TrendingPlanCard: React.FC<ITrendingPlanCardProps> = ({
  title,
  subtitle,
  imageUri,
  onJoinPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground source={{ uri: imageUri }} style={styles.bgImage} imageStyle={styles.imageRadius}>
        <View style={styles.darkGradientOverlay}>
          <View style={styles.bottomContent}>
            <View style={styles.textCol}>
              <Text style={styles.planTitle}>{title}</Text>
              <Text numberOfLines={2} style={styles.planSub}>
                {subtitle}
              </Text>
            </View>

            <Pressable
              style={styles.joinBtn}
              onPress={onJoinPress}
              accessibilityRole="button"
              accessibilityLabel={`Join ${title} Plan`}
            >
              <Text style={styles.joinText}>Join</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 270,
    height: 175,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 14,
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: 24,
  },
  darkGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 11, 14, 0.45)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  textCol: {
    flex: 1,
    marginRight: 10,
  },
  planTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  planSub: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 15,
  },
  joinBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  joinText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});
