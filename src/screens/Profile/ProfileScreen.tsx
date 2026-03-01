import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuthStore } from '../../stores/authStore';
import { Button, Card, SubscriptionBadge } from '../../components/common';
import { colors } from '../../theme/colors';
import { spacing, borderRadius, fontSize, fontWeight } from '../../theme/spacing';
import { formatDate, formatSubscriptionType } from '../../utils/formatters';

const ProfileScreen: React.FC = () => {
  const { user, logout, isLoading } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout(),
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0)?.toUpperCase() ?? '?'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name ?? 'User'}</Text>
        <Text style={styles.email}>{user?.email ?? ''}</Text>
        <SubscriptionBadge
          isActive={user?.subscriptionActive ?? false}
          type={user?.subscriptionType ?? 'free'}
        />
      </View>

      {/* Subscription Info */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Subscription</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Plan</Text>
          <Text style={styles.infoValue}>
            {formatSubscriptionType(user?.subscriptionType ?? 'free')}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status</Text>
          <Text
            style={[
              styles.infoValue,
              {
                color: user?.subscriptionActive ? colors.success : colors.warning,
              },
            ]}>
            {user?.subscriptionActive ? 'Active' : 'Inactive'}
          </Text>
        </View>

        {user?.expiryDate && (
          <>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Expires</Text>
              <Text style={styles.infoValue}>{formatDate(user.expiryDate)}</Text>
            </View>
          </>
        )}

        {!user?.subscriptionActive && (
          <Button
            title="Upgrade Plan"
            onPress={() => {
              Alert.alert(
                'Coming Soon',
                'Subscription upgrade will be available in a future update. Stay tuned!',
              );
            }}
            variant="secondary"
            style={styles.upgradeButton}
          />
        )}
      </Card>

      {/* Account Info */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{user?.name ?? 'N/A'}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user?.email ?? 'N/A'}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Member Since</Text>
          <Text style={styles.infoValue}>{formatDate(user?.createdAt ?? null)}</Text>
        </View>
      </Card>

      {/* App Info */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>App Info</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Build</Text>
          <Text style={styles.infoValue}>Production</Text>
        </View>
      </Card>

      {/* Logout Button */}
      <Button
        title="Logout"
        onPress={handleLogout}
        variant="outline"
        isLoading={isLoading}
        style={styles.logoutButton}
        textStyle={styles.logoutText}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  header: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: fontWeight.bold,
    color: colors.textOnPrimary,
  },
  name: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textOnPrimary,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: fontSize.md,
    color: colors.textOnPrimary,
    opacity: 0.8,
    marginBottom: spacing.md,
  },
  sectionCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
  upgradeButton: {
    marginTop: spacing.md,
  },
  logoutButton: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xl,
    borderColor: colors.error,
  },
  logoutText: {
    color: colors.error,
  },
});

export default ProfileScreen;
