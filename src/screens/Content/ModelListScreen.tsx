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
import { RouteProp } from '@react-navigation/native';
import { ContentStackParamList, Model } from '../../types';
import { useContentStore } from '../../stores/contentStore';
import { EmptyState } from '../../components/common';
import { colors } from '../../theme/colors';
import { spacing, borderRadius, fontSize, fontWeight } from '../../theme/spacing';

type ModelListNavigationProp = NativeStackNavigationProp<ContentStackParamList, 'ModelList'>;
type ModelListRouteProp = RouteProp<ContentStackParamList, 'ModelList'>;

interface ModelListScreenProps {
  navigation: ModelListNavigationProp;
  route: ModelListRouteProp;
}

const ModelListScreen: React.FC<ModelListScreenProps> = ({ navigation, route }) => {
  const { brandId, brandName } = route.params;
  const { models, isLoading, fetchModels } = useContentStore();

  useEffect(() => {
    navigation.setOptions({ title: brandName });
    fetchModels(brandId);
  }, [brandId, brandName, navigation, fetchModels]);

  const renderModelItem = ({ item }: { item: Model }) => (
    <TouchableOpacity
      style={styles.modelItem}
      onPress={() =>
        navigation.navigate('ContentList', {
          modelId: item.id,
          modelName: item.name,
          brandId,
        })
      }
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${item.name} model`}
      accessibilityHint={`Double tap to view repair guides for ${item.name}`}>
      <View style={styles.modelIconContainer} importantForAccessibility="no">
        <Text style={styles.modelIcon}>🔧</Text>
      </View>
      <View style={styles.modelInfo}>
        <Text style={styles.modelName}>{item.name}</Text>
        <Text style={styles.modelSubtitle}>View repair guides →</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading && models.length === 0) {
    return (
      <View style={styles.loadingContainer} accessible={true} accessibilityLabel="Loading models" accessibilityRole="progressbar">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isLoading && models.length === 0) {
    return (
      <EmptyState
        title="No Models Found"
        message={`No models have been added for ${brandName} yet.`}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={models}
        renderItem={renderModelItem}
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
  modelItem: {
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
  modelIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  modelIcon: {
    fontSize: 20,
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  modelSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  separator: {
    height: spacing.sm,
  },
});

export default ModelListScreen;
