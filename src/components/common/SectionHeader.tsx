import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, fontSize, fontWeight } from '../../theme/spacing';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">{title}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          accessibilityHint={`Navigate to ${title} section`}>
          <Text style={styles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  action: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.primary,
  },
});

export default SectionHeader;
