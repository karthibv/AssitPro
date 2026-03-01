import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius, fontSize, fontWeight } from '../../theme/spacing';

interface SubscriptionBadgeProps {
  isActive: boolean;
  type: string;
}

const SubscriptionBadge: React.FC<SubscriptionBadgeProps> = ({ isActive, type }) => {
  return (
    <View style={[styles.badge, isActive ? styles.activeBadge : styles.inactiveBadge]}>
      <Text style={[styles.text, isActive ? styles.activeText : styles.inactiveText]}>
        {isActive ? `${type.charAt(0).toUpperCase() + type.slice(1)} Plan` : 'Free Plan'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  activeBadge: {
    backgroundColor: colors.success + '20',
  },
  inactiveBadge: {
    backgroundColor: colors.warning + '20',
  },
  text: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  activeText: {
    color: colors.success,
  },
  inactiveText: {
    color: colors.warning,
  },
});

export default SubscriptionBadge;
