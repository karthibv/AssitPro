import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types';
import { useAuthStore } from '../../stores/authStore';
import { Button, Input } from '../../components/common';
import { colors } from '../../theme/colors';
import { spacing, fontSize, fontWeight } from '../../theme/spacing';
import { getFirebaseErrorMessage } from '../../utils/formatters';

type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;

interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordNavigationProp;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const { resetPassword, isLoading, clearError } = useAuthStore();

  const validate = (): boolean => {
    setEmailError('');
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleResetPassword = async () => {
    clearError();
    if (!validate()) return;

    try {
      await resetPassword(email.trim());
      setEmailSent(true);
    } catch (error: unknown) {
      const code = (error as { code?: string }).code ?? '';
      Alert.alert('Error', getFirebaseErrorMessage(code));
    }
  };

  if (emailSent) {
    return (
      <View style={styles.container}>
          <View style={styles.successContainer} accessibilityLiveRegion="polite">
            <Text style={styles.successIcon} importantForAccessibility="no">📧</Text>
            <Text style={styles.successTitle} accessibilityRole="header">Check Your Email</Text>
            <Text style={styles.successDescription}>
              We&apos;ve sent a password reset link to{'\n'}
              <Text style={styles.emailHighlight}>{email}</Text>
            </Text>
            <Button
              title="Back to Login"
              onPress={() => navigation.navigate('Login')}
              style={styles.backButton}
              accessibilityHint="Double tap to return to the login screen"
            />
          </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <Text style={styles.title} accessibilityRole="header">Reset Password</Text>
          <Text style={styles.description}>
            Enter your email address and we&apos;ll send you a link to reset your password.
          </Text>

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            returnKeyType="done"
            onSubmitEditing={handleResetPassword}
            accessibilityLabel="Email address"
            accessibilityHint="Enter the email address associated with your account"
          />

          <Button
            title="Send Reset Link"
            onPress={handleResetPassword}
            isLoading={isLoading}
            style={styles.resetButton}
            accessibilityHint="Double tap to send a password reset email"
          />

          <Button
            title="Back to Login"
            onPress={() => navigation.navigate('Login')}
            variant="text"
            accessibilityHint="Double tap to return to the login screen"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  form: {
    flex: 1,
    paddingTop: 80,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  resetButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  successTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  successDescription: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: spacing.xl,
  },
  emailHighlight: {
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  backButton: {
    minWidth: 200,
  },
});

export default ForgotPasswordScreen;
