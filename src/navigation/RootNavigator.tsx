import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { LoadingScreen } from '../components/common';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen message="Loading AssistPro..." />;
  }

  return isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
