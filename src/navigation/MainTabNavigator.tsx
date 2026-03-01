import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types';
import HomeNavigator from './HomeNavigator';
import ContentNavigator from './ContentNavigator';
import SearchNavigator from './SearchNavigator';
import ProfileNavigator from './ProfileNavigator';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/spacing';
import { Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabIcon: React.FC<{ label: string; focused: boolean }> = ({ label, focused }) => {
  const getIcon = () => {
    switch (label) {
      case 'Home':
        return '🏠';
      case 'Library':
        return '📚';
      case 'Search':
        return '🔍';
      case 'Profile':
        return '👤';
      default:
        return '•';
    }
  };

  return (
    <Text style={[styles.icon, focused && styles.iconFocused]}>
      {getIcon()}
    </Text>
  );
};

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: 4,
          paddingTop: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: fontWeight.medium,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Library"
        component={ContentNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Library" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Search" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 22,
    opacity: 0.5,
  },
  iconFocused: {
    opacity: 1,
  },
});

export default MainTabNavigator;
