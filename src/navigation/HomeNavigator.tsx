import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types';
import HomeScreen from '../screens/Home/HomeScreen';
import ContentDetailScreen from '../screens/Content/ContentDetailScreen';
import ImageViewerScreen from '../screens/Content/ImageViewerScreen';
import VideoPlayerScreen from '../screens/Content/VideoPlayerScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.textOnPrimary,
        headerTitleStyle: { fontWeight: '600' },
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContentDetail"
        component={ContentDetailScreen}
        options={{ title: 'Repair Guide' }}
      />
      <Stack.Screen
        name="ImageViewer"
        component={ImageViewerScreen}
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayerScreen}
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
