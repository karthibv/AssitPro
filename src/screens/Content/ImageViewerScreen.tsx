import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { ContentStackParamList } from '../../types';
import { spacing, fontSize, fontWeight } from '../../theme/spacing';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type ImageViewerNavigationProp = NativeStackNavigationProp<
  ContentStackParamList,
  'ImageViewer'
>;
type ImageViewerRouteProp = RouteProp<ContentStackParamList, 'ImageViewer'>;

interface ImageViewerScreenProps {
  navigation: ImageViewerNavigationProp;
  route: ImageViewerRouteProp;
}

const ZoomableImage: React.FC<{ uri: string }> = ({ uri }) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withSpring(1);
        savedScale.value = 1;
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else if (scale.value > 5) {
        scale.value = withSpring(5);
        savedScale.value = 5;
      } else {
        savedScale.value = scale.value;
      }
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (scale.value > 1) {
        translateX.value = savedTranslateX.value + e.translationX;
        translateY.value = savedTranslateY.value + e.translationY;
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1) {
        scale.value = withSpring(1);
        savedScale.value = 1;
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        scale.value = withSpring(3);
        savedScale.value = 3;
      }
    });

  const composedGesture = Gesture.Simultaneous(
    pinchGesture,
    panGesture,
    doubleTapGesture,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image
          source={{ uri }}
          style={styles.fullImage}
          resizeMode="contain"
        />
      </Animated.View>
    </GestureDetector>
  );
};

const ImageViewerScreen: React.FC<ImageViewerScreenProps> = ({ navigation, route }) => {
  const { imageUrls, initialIndex } = route.params;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    [],
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Close image viewer"
        accessibilityHint="Double tap to go back to the previous screen">
        <Text style={styles.closeText} importantForAccessibility="no">✕</Text>
      </TouchableOpacity>

      {/* Image Counter */}
      <View style={styles.counter} accessible={true} accessibilityRole="text" accessibilityLabel={`Image ${currentIndex + 1} of ${imageUrls.length}`} accessibilityLiveRegion="polite">
        <Text style={styles.counterText}>
          {currentIndex + 1} / {imageUrls.length}
        </Text>
      </View>

      {/* Image Carousel */}
      <FlatList
        data={imageUrls}
        horizontal
        pagingEnabled
        initialScrollIndex={initialIndex}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        keyExtractor={(_, index) => `image-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.slide} accessible={true} accessibilityRole="image" accessibilityLabel={`Circuit image ${index + 1} of ${imageUrls.length}. Pinch to zoom, double tap to toggle zoom, swipe for next image`}>
            <ZoomableImage uri={item} />
          </View>
        )}
      />

      {/* Hint */}
      <View style={styles.hintContainer} importantForAccessibility="no">
        <Text style={styles.hintText}>Pinch to zoom • Double tap to toggle • Swipe for next</Text>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: fontWeight.bold,
  },
  counter: {
    position: 'absolute',
    top: 54,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
  },
  counterText: {
    color: '#fff',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    overflow: 'hidden',
  },
  slide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  hintContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  hintText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: fontSize.sm,
  },
});

export default ImageViewerScreen;
