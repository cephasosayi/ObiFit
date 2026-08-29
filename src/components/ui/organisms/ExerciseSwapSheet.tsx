import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../../tokens/color-system';

export interface IExerciseOption {
  id: string;
  title: string;
  targetMuscle: string;
  equipment: string;
}

export interface IExerciseSwapSheetProps {
  isVisible: boolean;
  currentExerciseTitle: string;
  alternatives: IExerciseOption[];
  onClose: () => void;
  onSelectAlternative: (exercise: IExerciseOption) => void;
}

export const ExerciseSwapSheet: React.FC<IExerciseSwapSheetProps> = ({
  isVisible,
  currentExerciseTitle,
  alternatives,
  onClose,
  onSelectAlternative,
}) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheetContent}>
          <View style={styles.handle} />
          <Text style={styles.title}>Swap Exercise</Text>
          <Text style={styles.subtitle}>
            Replacing: <Text style={styles.highlight}>{currentExerciseTitle}</Text>
          </Text>

          <FlatList
            data={alternatives}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <Pressable
                style={styles.itemCard}
                onPress={() => {
                  onSelectAlternative(item);
                  onClose();
                }}
                accessibilityRole="button"
                accessibilityLabel={`Swap to ${item.title}`}
              >
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemMeta}>
                    {item.targetMuscle} • {item.equipment}
                  </Text>
                </View>
                <Text style={styles.selectText}>Select</Text>
              </Pressable>
            )}
          />

          <Pressable style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
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
    maxHeight: '80%',
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
    fontSize: 20,
    fontWeight: '900',
    color: colors.onSurface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginBottom: 16,
  },
  highlight: {
    color: colors.neonOrange,
    fontWeight: '700',
  },
  listContainer: {
    gap: 10,
    paddingBottom: 16,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerHigh,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 2,
  },
  itemMeta: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  selectText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 8,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
});
