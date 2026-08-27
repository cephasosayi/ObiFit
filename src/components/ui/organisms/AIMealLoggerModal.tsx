import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Chip } from '../atoms/Chip';
import { colors } from '../../../tokens/color-system';

export interface IAIMealLoggerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirmLog: (description: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => Promise<void>;
}

export const AIMealLoggerModal: React.FC<IAIMealLoggerModalProps> = ({
  isVisible,
  onClose,
  onConfirmLog,
}) => {
  const [description, setDescription] = useState('');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) return;
    setIsSubmitting(true);
    try {
      await onConfirmLog(description, mealType);
      setDescription('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>AI Meal Parser</Text>
          <Text style={styles.subtitle}>
            Describe your meal (e.g., &quot;Plate of Jollof rice with fried plantain and grilled chicken&quot;)
          </Text>

          <View style={styles.chipRow}>
            {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
              <Chip
                key={type}
                label={type}
                isSelected={mealType === type}
                onPress={() => setMealType(type)}
              />
            ))}
          </View>

          <Input
            placeholder="Type meal description..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />

          <View style={styles.buttonRow}>
            <View style={styles.buttonFlex}>
              <Button label="Cancel" variant="secondary" onPress={onClose} />
            </View>
            <View style={styles.buttonFlex}>
              <Button
                label="Parse Meal"
                onPress={handleSubmit}
                isLoading={isSubmitting}
                disabled={!description.trim()}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: colors.surfaceContainer,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.onSurface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginBottom: 16,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  buttonFlex: {
    flex: 1,
  },
});
