import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ContentStackParamList, Brand } from '../../types';
import { useContentStore } from '../../stores/contentStore';
import { EmptyState } from '../../components/common';
import { colors } from '../../theme/colors';
import { spacing, borderRadius, fontSize, fontWeight } from '../../theme/spacing';

type BrandListNavigationProp = NativeStackNavigationProp<ContentStackParamList, 'BrandList'>;

interface BrandListScreenProps {
  navigation: BrandListNavigationProp;
}

const BrandListScreen: React.FC<BrandListScreenProps> = ({ navigation }) => {
  const { brands, isLoading, fetchBrands } = useContentStore();

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const renderBrandItem = ({ item }: { item: Brand }) => (
    <TouchableOpacity
      style={styles.brandItem}
      onPress={() =>
        navigation.navigate('ModelList', { brandId: item.id, brandName: item.name })
      }
      activeOpacity={0.7}>
      <View style={styles.brandIcon}>
        <Text style={styles.brandInitial}>{item.name.charAt(0).toUpperCase()}</Text>
      </View>
      <View style={styles.brandInfo}>
        <Text style={styles.brandName}>{item.name}</Text>
        <Text style={styles.brandSubtitle}>View models →</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading && brands.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isLoading && brands.length === 0) {
    return (
      <EmptyState
        title="No Brands Found"
        message="No AC brands have been added yet. Check back later."
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={brands}
        renderItem={renderBrandItem}
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
  brandItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  brandIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  brandInitial: {
    fontSize: 24,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  brandSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  separator: {
    height: spacing.sm,
  },
});

export default BrandListScreen;
