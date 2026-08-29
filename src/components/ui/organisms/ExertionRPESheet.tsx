import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, TextInput } from 'react-native';
import { Button } from '../atoms/Button';
import { colors } from '../../../tokens/color-system';

export interface IExertionRPESheetProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmitRPE: (rpe: 'easy' | 'just_right' | 'hard', notes: string) => void;
}

export const ExertionRPESheet: React.FC<IExertionRPESheetProps> = ({
  isVisible,
  onClose,
  onSubmitRPE,
}) => {
  const [selectedRPE, setSelectedRPE] = useState<'easy' | 'just_right' | 'hard'>('just_right');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onSubmitRPE(selectedRPE, notes);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheetContent}>
          <View style={styles.handle} />
          <Text style={styles.title}>Session Completed! 🎉</Text>
          <Text style={styles.subtitle}>Rate your effort level (RPE) for optimal recovery calculations:</Text>

          <View style={styles.rpeRow}>
            {(
              [
                { key: 'easy', label: 'Easy', emoji: '😌', desc: 'Could do more' },
                { key: 'just_right', label: 'Just Right', emoji: '🔥', desc: 'Challenging & clean' },
                { key: 'hard', label: 'Hard', emoji: '🥵', desc: 'Near failure' },
              ] as const
            ).map((item) => {
              const isSelected = selectedRPE === item.key;
              return (
                <Pressable
                  key={item.key}
                  style={[styles.rpeCard, isSelected && styles.rpeCardSelected]}
                  onPress={() => setSelectedRPE(item.key)}
                  accessibilityRole="button"
                  accessibilityLabel={`Rating ${item.label}`}
                >
                  <Text style={styles.emoji}>{item.emoji}</Text>
                  <Text style={[styles.rpeLabel, isSelected && styles.rpeLabelSelected]}>
                    {item.label}
                  </Text>
                  <Text style={styles.rpeDesc}>{item.desc}</Text>
                </Pressable>
              );
            })}
          </View>

          <TextInput
            style={styles.notesInput}
            placeholder="Add optional notes (e.g., felt great, slight soreness in shoulders)..."
            placeholderTextColor={colors.onSurfaceVariant}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />

          <Button label="Save Workout & View Recap" onPress={handleSubmit} />
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
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: colors.outlineVariant,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.onSurface,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginBottom: 20,
    textAlign: 'center',
  },
  rpeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  rpeCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerHigh,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
  },
  rpeCardSelected: {
    borderColor: colors.neonOrange,
    backgroundColor: colors.surfaceContainerHighest,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  rpeLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 2,
  },
  rpeLabelSelected: {
    color: colors.neonOrange,
  },
  rpeDesc: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  notesInput: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 14,
    padding: 12,
    color: colors.onSurface,
    fontSize: 13,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: 20,
  },
});
