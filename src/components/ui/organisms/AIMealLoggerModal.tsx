import React, { useState } from 'react';
import { View, Text, Modal } from 'react-native';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Chip } from '../atoms/Chip';

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
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-surface-container rounded-t-card p-6 border-t border-outline-variant">
          <Text className="text-heading-md font-bold text-text-primary mb-2">AI Meal Parser</Text>
          <Text className="text-caption-sm text-text-secondary mb-4">
            Describe your meal (e.g., &quot;Plate of Jollof rice with fried plantain and grilled chicken&quot;)
          </Text>

          <View className="flex-row mb-4">
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

          <View className="flex-row justify-between gap-3 mt-2">
            <View className="flex-1">
              <Button label="Cancel" variant="secondary" onPress={onClose} />
            </View>
            <View className="flex-1">
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
