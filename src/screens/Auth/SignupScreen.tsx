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

type SignupScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Signup'>;

interface SignupScreenProps {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const { signup, isLoading, clearError } = useAuthStore();

  const validate = (): boolean => {
    let valid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!name.trim()) {
      setNameError('Name is required');
      valid = false;
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    return valid;
  };

  const handleSignup = async () => {
    clearError();
    if (!validate()) return;

    try {
      await signup(name.trim(), email.trim(), password);
    } catch (error: unknown) {
      const code = (error as { code?: string }).code ?? '';
      Alert.alert('Signup Failed', getFirebaseErrorMessage(code));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header} accessible={true} accessibilityRole="header">
          <Text style={styles.logo} accessibilityRole="header">⚡ AssistPro</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.title} accessibilityRole="header">Create Account</Text>
          <Text style={styles.description}>
            Join AssistPro to access AC repair guides and tutorials
          </Text>

          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            error={nameError}
            returnKeyType="next"
            accessibilityLabel="Full name"
            accessibilityHint="Enter your full name for your account"
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            returnKeyType="next"
            accessibilityLabel="Email address"
            accessibilityHint="Enter your email address for your account"
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={passwordError}
            returnKeyType="next"
            accessibilityLabel="Password"
            accessibilityHint="Create a password with at least 6 characters"
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={confirmPasswordError}
            returnKeyType="done"
            onSubmitEditing={handleSignup}
            accessibilityLabel="Confirm password"
            accessibilityHint="Re-enter your password to confirm"
          />

          <Button
            title="Create Account"
            onPress={handleSignup}
            isLoading={isLoading}
            style={styles.signupButton}
            accessibilityHint="Double tap to create your account"
          />

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Button
              title="Sign In"
              onPress={() => navigation.navigate('Login')}
              variant="text"
              textStyle={styles.loginLink}
              accessibilityHint="Double tap to go to sign in screen"
            />
          </View>
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
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: spacing.lg,
  },
  logo: {
    fontSize: 36,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  form: {
    flex: 1,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  signupButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
  },
  loginText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  loginLink: {
    fontWeight: fontWeight.bold,
  },
});

export default SignupScreen;
