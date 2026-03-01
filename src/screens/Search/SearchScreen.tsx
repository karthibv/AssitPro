import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SearchStackParamList, ContentItem } from '../../types';
import { useSearchStore } from '../../stores/searchStore';
import { useSubscriptionGate } from '../../hooks/useSubscriptionGate';
import { SearchBar, Card, EmptyState } from '../../components/common';
import { colors } from '../../theme/colors';
import { spacing, borderRadius, fontSize, fontWeight } from '../../theme/spacing';

type SearchScreenNavigationProp = NativeStackNavigationProp<
  SearchStackParamList,
  'SearchScreen'
>;

interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const {
    query,
    results,
    isSearching,
    searchHistory,
    setQuery,
    search,
    clearResults,
    clearHistory,
  } = useSearchStore();
  const { requireSubscription } = useSubscriptionGate();

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      search(query.trim());
    }
  }, [query, search]);

  const handleClear = useCallback(() => {
    setQuery('');
    clearResults();
  }, [setQuery, clearResults]);

  const handleHistoryItemPress = useCallback(
    (item: string) => {
      setQuery(item);
      search(item);
    },
    [setQuery, search],
  );

  const handleContentPress = (contentId: string) => {
    requireSubscription(() => {
      navigation.navigate('ContentDetail', { contentId });
    });
  };

  const renderResultItem = ({ item }: { item: ContentItem }) => (
    <Card style={styles.resultCard} onPress={() => handleContentPress(item.id)}>
      <View style={styles.resultHeader}>
        <Text style={styles.resultTitle} numberOfLines={2}>
          {item.title}
        </Text>
        {item.errorCode ? (
          <View style={styles.errorCodeBadge}>
            <Text style={styles.errorCodeText}>{item.errorCode}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.resultDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.resultMeta}>
        {item.steps.length > 0 && (
          <Text style={styles.metaText}>📋 {item.steps.length} steps</Text>
        )}
        {item.imageUrls.length > 0 && (
          <Text style={styles.metaText}>📷 {item.imageUrls.length} images</Text>
        )}
        {item.videoUrls.length > 0 && (
          <Text style={styles.metaText}>🎬 {item.videoUrls.length} videos</Text>
        )}
      </View>
    </Card>
  );

  const renderSearchContent = () => {
    // Show loading state
    if (isSearching) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.searchingText}>Searching...</Text>
        </View>
      );
    }

    // Show results
    if (results.length > 0) {
      return (
        <FlatList
          data={results}
          renderItem={renderResultItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.resultsList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={
            <Text style={styles.resultsCount}>
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </Text>
          }
        />
      );
    }

    // Show no results
    if (query.trim() && !isSearching) {
      return (
        <EmptyState
          title="No Results"
          message={`No content found for "${query}". Try different keywords.`}
          actionLabel="Clear Search"
          onAction={handleClear}
        />
      );
    }

    // Show search suggestions & history
    return (
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>Search Tips</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipItem}>• Search by error code (e.g., E1, F3)</Text>
          <Text style={styles.tipItem}>• Search by symptom (e.g., &quot;not cooling&quot;)</Text>
          <Text style={styles.tipItem}>• Search by component (e.g., &quot;compressor&quot;)</Text>
          <Text style={styles.tipItem}>• Search by model name</Text>
        </View>

        {searchHistory.length > 0 && (
          <View style={styles.historySection}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Recent Searches</Text>
              <TouchableOpacity onPress={clearHistory}>
                <Text style={styles.clearHistoryText}>Clear</Text>
              </TouchableOpacity>
            </View>
            {searchHistory.map((item, index) => (
              <TouchableOpacity
                key={`history-${index}`}
                style={styles.historyItem}
                onPress={() => handleHistoryItemPress(item)}>
                <Text style={styles.historyIcon}>🕐</Text>
                <Text style={styles.historyText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <Text style={styles.screenTitle}>Search</Text>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onSubmit={handleSearch}
          onClear={handleClear}
          autoFocus={false}
        />
      </View>
      {renderSearchContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchHeader: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  screenTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchingText: {
    marginTop: spacing.md,
    fontSize: fontSize.lg,
    color: colors.textSecondary,
  },
  resultsList: {
    padding: spacing.md,
  },
  resultsCount: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    fontWeight: fontWeight.medium,
  },
  resultCard: {
    padding: spacing.md,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  resultTitle: {
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
  resultDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  resultMeta: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metaText: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
  separator: {
    height: spacing.sm,
  },
  suggestionsContainer: {
    padding: spacing.md,
  },
  suggestionsTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  tipsList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  tipItem: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 28,
  },
  historySection: {
    marginTop: spacing.xl,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  historyTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  clearHistoryText: {
    fontSize: fontSize.md,
    color: colors.error,
    fontWeight: fontWeight.medium,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  historyIcon: {
    fontSize: 14,
    marginRight: spacing.sm,
  },
  historyText: {
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
});

export default SearchScreen;
