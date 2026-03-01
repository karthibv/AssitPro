import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContentStackParamList } from '../types';
import BrandListScreen from '../screens/Content/BrandListScreen';
import ModelListScreen from '../screens/Content/ModelListScreen';
import ContentListScreen from '../screens/Content/ContentListScreen';
import ContentDetailScreen from '../screens/Content/ContentDetailScreen';
import ImageViewerScreen from '../screens/Content/ImageViewerScreen';
import VideoPlayerScreen from '../screens/Content/VideoPlayerScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<ContentStackParamList>();

const ContentNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.textOnPrimary,
        headerTitleStyle: { fontWeight: '600' },
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="BrandList"
        component={BrandListScreen}
        options={{ title: 'AC Brands' }}
      />
      <Stack.Screen
        name="ModelList"
        component={ModelListScreen}
        options={{ title: 'Models' }}
      />
      <Stack.Screen
        name="ContentList"
        component={ContentListScreen}
        options={{ title: 'Repair Guides' }}
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

export default ContentNavigator;
