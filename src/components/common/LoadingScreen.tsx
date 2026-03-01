import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fontSize } from '../../theme/spacing';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="progressbar"
      accessibilityLabel={message}
      accessibilityLiveRegion="polite">
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    marginTop: 16,
    fontSize: fontSize.lg,
    color: colors.textSecondary,
  },
});

export default LoadingScreen;
