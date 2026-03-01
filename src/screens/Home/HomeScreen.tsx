import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList, ContentItem, Brand } from '../../types';
import { useContentStore } from '../../stores/contentStore';
import { useAuthStore } from '../../stores/authStore';
import { SearchBar, Card, SectionHeader, SubscriptionBadge } from '../../components/common';
import { colors } from '../../theme/colors';
import { spacing, borderRadius, fontSize, fontWeight } from '../../theme/spacing';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const user = useAuthStore(state => state.user);
  const {
    brands,
    recentlyViewed,
    featuredContents,
    fetchBrands,
    fetchFeaturedContents,
  } = useContentStore();

  const [refreshing, setRefreshing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    fetchBrands();
    fetchFeaturedContents();
  }, [fetchBrands, fetchFeaturedContents]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchBrands(), fetchFeaturedContents()]);
    setRefreshing(false);
  }, [fetchBrands, fetchFeaturedContents]);

  const handleSearchFocus = () => {
    // Navigate to Search tab - this is handled by parent tab navigator
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate('Search');
    }
  };

  const handleContentPress = (contentId: string) => {
    navigation.navigate('ContentDetail', { contentId });
  };

  const renderBrandItem = ({ item }: { item: Brand }) => (
    <TouchableOpacity
      style={styles.brandCard}
      onPress={() => {
        const parentNav = navigation.getParent();
        if (parentNav) {
          parentNav.navigate('Library', {
            screen: 'ModelList',
            params: { brandId: item.id, brandName: item.name },
          });
        }
      }}
      activeOpacity={0.7}>
      <View style={styles.brandIconContainer}>
        <Text style={styles.brandIcon}>{item.name.charAt(0).toUpperCase()}</Text>
      </View>
      <Text style={styles.brandName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderContentCard = ({ item }: { item: ContentItem }) => (
    <Card style={styles.contentCard} onPress={() => handleContentPress(item.id)}>
      <View style={styles.contentCardHeader}>
        {item.errorCode ? (
          <View style={styles.errorCodeBadge}>
            <Text style={styles.errorCodeText}>{item.errorCode}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.contentTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.contentDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.contentMeta}>
        {item.imageUrls.length > 0 && (
          <Text style={styles.metaItem}>📷 {item.imageUrls.length}</Text>
        )}
        {item.videoUrls.length > 0 && (
          <Text style={styles.metaItem}>🎬 {item.videoUrls.length}</Text>
        )}
        {item.steps.length > 0 && (
          <Text style={styles.metaItem}>📋 {item.steps.length} steps</Text>
        )}
      </View>
    </Card>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
      }>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>
              Hello, {user?.name?.split(' ')[0] ?? 'Technician'} 👋
            </Text>
            <Text style={styles.headerSubtitle}>Find AC repair guides & tutorials</Text>
          </View>
          <SubscriptionBadge
            isActive={user?.subscriptionActive ?? false}
            type={user?.subscriptionType ?? 'free'}
          />
        </View>

        {/* Search Bar */}
        <TouchableOpacity onPress={handleSearchFocus} activeOpacity={1}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search error codes, symptoms..."
          />
        </TouchableOpacity>
      </View>

      {/* Categories / Brands */}
      {brands.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Brands" />
          <FlatList
            horizontal
            data={brands}
            renderItem={renderBrandItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandList}
          />
        </View>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Recently Viewed" />
          <FlatList
            horizontal
            data={recentlyViewed.slice(0, 5)}
            renderItem={renderContentCard}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
        </View>
      )}

      {/* Featured Tutorials */}
      {featuredContents.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Featured Tutorials" />
          <FlatList
            horizontal
            data={featuredContents}
            renderItem={renderContentCard}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
        </View>
      )}

      {/* Quick Access */}
      <View style={styles.section}>
        <SectionHeader title="Quick Access" />
        <View style={styles.quickAccessGrid}>
          <TouchableOpacity
            style={styles.quickAccessItem}
            onPress={() => {
              const parentNav = navigation.getParent();
              if (parentNav) {
                parentNav.navigate('Library');
              }
            }}>
            <Text style={styles.quickAccessIcon}>📚</Text>
            <Text style={styles.quickAccessLabel}>All Brands</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAccessItem}
            onPress={() => {
              const parentNav = navigation.getParent();
              if (parentNav) {
                parentNav.navigate('Search');
              }
            }}>
            <Text style={styles.quickAccessIcon}>🔍</Text>
            <Text style={styles.quickAccessLabel}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAccessItem}
            onPress={() => {
              const parentNav = navigation.getParent();
              if (parentNav) {
                parentNav.navigate('Profile');
              }
            }}>
            <Text style={styles.quickAccessIcon}>👤</Text>
            <Text style={styles.quickAccessLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  greeting: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textOnPrimary,
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    color: colors.textOnPrimary,
    opacity: 0.8,
    marginTop: spacing.xs,
  },
  section: {
    marginTop: spacing.lg,
  },
  brandList: {
    paddingHorizontal: spacing.md,
  },
  brandCard: {
    alignItems: 'center',
    marginRight: spacing.md,
    width: 80,
  },
  brandIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  brandIcon: {
    fontSize: 28,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  brandName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  contentList: {
    paddingHorizontal: spacing.md,
  },
  contentCard: {
    width: 260,
    marginRight: spacing.md,
  },
  contentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
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
  contentTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  contentDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  contentMeta: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metaItem: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  quickAccessItem: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAccessIcon: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  quickAccessLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
});

export default HomeScreen;
