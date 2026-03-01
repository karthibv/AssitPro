import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { ContentStackParamList } from '../../types';
import { useContentStore } from '../../stores/contentStore';
import { useSubscriptionGate } from '../../hooks/useSubscriptionGate';
import { EmptyState } from '../../components/common';
import { colors } from '../../theme/colors';
import { spacing, borderRadius, fontSize, fontWeight } from '../../theme/spacing';

type ContentDetailNavigationProp = NativeStackNavigationProp<
  ContentStackParamList,
  'ContentDetail'
>;
type ContentDetailRouteProp = RouteProp<ContentStackParamList, 'ContentDetail'>;

interface ContentDetailScreenProps {
  navigation: ContentDetailNavigationProp;
  route: ContentDetailRouteProp;
}

const ContentDetailScreen: React.FC<ContentDetailScreenProps> = ({ navigation, route }) => {
  const { contentId } = route.params;
  const { currentContent, isLoading, fetchContentById } = useContentStore();
  const { requireSubscription } = useSubscriptionGate();

  useEffect(() => {
    fetchContentById(contentId);
  }, [contentId, fetchContentById]);

  const handleImagePress = (index: number) => {
    if (!currentContent) return;
    requireSubscription(() => {
      navigation.navigate('ImageViewer', {
        imageUrls: currentContent.imageUrls,
        initialIndex: index,
      });
    });
  };

  const handleVideoPress = (videoUrl: string) => {
    if (!currentContent) return;
    requireSubscription(() => {
      navigation.navigate('VideoPlayer', {
        videoUrl,
        title: currentContent.title,
      });
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!currentContent) {
    return (
      <EmptyState
        title="Content Not Found"
        message="The requested content could not be found."
        actionLabel="Go Back"
        onAction={() => navigation.goBack()}
      />
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{currentContent.title}</Text>
        {currentContent.errorCode ? (
          <View style={styles.errorCodeBadge}>
            <Text style={styles.errorCodeLabel}>Error Code</Text>
            <Text style={styles.errorCodeValue}>{currentContent.errorCode}</Text>
          </View>
        ) : null}
        <Text style={styles.description}>{currentContent.description}</Text>
      </View>

      {/* Circuit Images Section */}
      {currentContent.imageUrls.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📷 Circuit Images</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageList}>
            {currentContent.imageUrls.map((url, index) => (
              <TouchableOpacity
                key={`image-${index}`}
                style={styles.imageCard}
                onPress={() => handleImagePress(index)}
                activeOpacity={0.8}>
                <Image source={{ uri: url }} style={styles.thumbnail} resizeMode="cover" />
                <Text style={styles.imageTapHint}>Tap to view full screen</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Videos Section */}
      {currentContent.videoUrls.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎬 Training Videos</Text>
          {currentContent.videoUrls.map((url, index) => (
            <TouchableOpacity
              key={`video-${index}`}
              style={styles.videoCard}
              onPress={() => handleVideoPress(url)}
              activeOpacity={0.7}>
              <View style={styles.videoPlayIcon}>
                <Text style={styles.playIconText}>▶</Text>
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>
                  Video {index + 1}
                </Text>
                <Text style={styles.videoSubtitle}>Tap to play</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Repair Steps Section */}
      {currentContent.steps.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Repair Steps</Text>
          {currentContent.steps.map((step, index) => (
            <View key={`step-${index}`} style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Tools Required Section */}
      {currentContent.tools.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔧 Tools Required</Text>
          <View style={styles.toolsGrid}>
            {currentContent.tools.map((tool, index) => (
              <View key={`tool-${index}`} style={styles.toolChip}>
                <Text style={styles.toolText}>{tool}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  errorCodeBadge: {
    backgroundColor: colors.error + '10',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    alignSelf: 'flex-start',
  },
  errorCodeLabel: {
    fontSize: fontSize.xs,
    color: colors.error,
    fontWeight: fontWeight.medium,
  },
  errorCodeValue: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.error,
  },
  description: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  section: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  imageList: {
    paddingBottom: spacing.sm,
  },
  imageCard: {
    marginRight: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.divider,
  },
  thumbnail: {
    width: 200,
    height: 150,
    borderRadius: borderRadius.md,
  },
  imageTapHint: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    textAlign: 'center',
    paddingVertical: spacing.xs,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  videoPlayIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  playIconText: {
    color: colors.textOnPrimary,
    fontSize: 18,
    marginLeft: 2,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  videoSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },
  stepNumberText: {
    color: colors.textOnPrimary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  stepText: {
    flex: 1,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    lineHeight: 24,
    paddingTop: 4,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  toolChip: {
    backgroundColor: colors.primaryLight + '15',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  toolText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: fontWeight.medium,
  },
});

export default ContentDetailScreen;
