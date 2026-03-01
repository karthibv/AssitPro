import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { ContentStackParamList, ContentItem } from '../../types';
import { useContentStore } from '../../stores/contentStore';
import { useSubscriptionGate } from '../../hooks/useSubscriptionGate';
import { EmptyState, Card } from '../../components/common';
import { colors } from '../../theme/colors';
import { spacing, borderRadius, fontSize, fontWeight } from '../../theme/spacing';

type ContentListNavigationProp = NativeStackNavigationProp<ContentStackParamList, 'ContentList'>;
type ContentListRouteProp = RouteProp<ContentStackParamList, 'ContentList'>;

interface ContentListScreenProps {
  navigation: ContentListNavigationProp;
  route: ContentListRouteProp;
}

const ContentListScreen: React.FC<ContentListScreenProps> = ({ navigation, route }) => {
  const { modelId, modelName } = route.params;
  const { contents, isLoading, fetchContents } = useContentStore();
  const { requireSubscription } = useSubscriptionGate();

  useEffect(() => {
    navigation.setOptions({ title: modelName });
    fetchContents(modelId);
  }, [modelId, modelName, navigation, fetchContents]);

  const handleContentPress = (contentId: string) => {
    requireSubscription(() => {
      navigation.navigate('ContentDetail', { contentId });
    });
  };

  const renderContentItem = ({ item }: { item: ContentItem }) => (
    <Card style={styles.contentCard} onPress={() => handleContentPress(item.id)}>
      <View style={styles.cardHeader}>
        <Text style={styles.contentTitle} numberOfLines={2}>
          {item.title}
        </Text>
        {item.errorCode ? (
          <View style={styles.errorCodeBadge}>
            <Text style={styles.errorCodeText}>{item.errorCode}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.contentDescription} numberOfLines={3}>
        {item.description}
      </Text>

      <View style={styles.metaRow}>
        {item.steps.length > 0 && (
          <View style={styles.metaItem}>
            <Text style={styles.metaText}>📋 {item.steps.length} steps</Text>
          </View>
        )}
        {item.tools.length > 0 && (
          <View style={styles.metaItem}>
            <Text style={styles.metaText}>🔧 {item.tools.length} tools</Text>
          </View>
        )}
        {item.imageUrls.length > 0 && (
          <View style={styles.metaItem}>
            <Text style={styles.metaText}>📷 {item.imageUrls.length}</Text>
          </View>
        )}
        {item.videoUrls.length > 0 && (
          <View style={styles.metaItem}>
            <Text style={styles.metaText}>🎬 {item.videoUrls.length}</Text>
          </View>
        )}
      </View>
    </Card>
  );

  if (isLoading && contents.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isLoading && contents.length === 0) {
    return (
      <EmptyState
        title="No Content Found"
        message={`No repair guides have been added for ${modelName} yet.`}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contents}
        renderItem={renderContentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.md,
  },
  contentCard: {
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  contentTitle: {
    flex: 1,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  errorCodeBadge: {
    backgroundColor: colors.error + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  errorCodeText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.error,
  },
  contentDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaItem: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  metaText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  separator: {
    height: spacing.sm,
  },
});

export default ContentListScreen;
