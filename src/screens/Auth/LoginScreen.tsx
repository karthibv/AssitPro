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

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { login, isLoading, clearError } = useAuthStore();

  const validate = (): boolean => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

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

    return valid;
  };

  const handleLogin = async () => {
    clearError();
    if (!validate()) return;

    try {
      await login(email.trim(), password);
    } catch (error: unknown) {
      const code = (error as { code?: string }).code ?? '';
      Alert.alert('Login Failed', getFirebaseErrorMessage(code));
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
          <Text style={styles.subtitle}>AC Technician Learning & Service Assistant</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.title} accessibilityRole="header">Welcome Back</Text>
          <Text style={styles.description}>Sign in to continue</Text>

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
            accessibilityHint="Enter your email address to sign in"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={passwordError}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
            accessibilityLabel="Password"
            accessibilityHint="Enter your password to sign in"
          />

          <Button
            title="Sign In"
            onPress={handleLogin}
            isLoading={isLoading}
            style={styles.loginButton}
            accessibilityHint="Double tap to sign in to your account"
          />

          <Button
            title="Forgot Password?"
            onPress={() => navigation.navigate('ForgotPassword')}
            variant="text"
            accessibilityHint="Double tap to reset your password"
          />

          <View style={styles.signupRow} accessible={true} accessibilityRole="text">
            <Text style={styles.signupText}>Don&apos;t have an account? </Text>
            <Button
              title="Sign Up"
              onPress={() => navigation.navigate('Signup')}
              variant="text"
              textStyle={styles.signupLink}
              accessibilityHint="Double tap to create a new account"
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
    paddingTop: 60,
    paddingBottom: spacing.xl,
  },
  logo: {
    fontSize: 36,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  form: {
    flex: 1,
    paddingTop: spacing.lg,
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
  },
  loginButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  signupText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  signupLink: {
    fontWeight: fontWeight.bold,
  },
});

export default LoginScreen;
