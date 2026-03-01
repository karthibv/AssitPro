import {
  brandsCollection,
  modelsCollection,
  contentsCollection,
} from './firebase';
import { Brand, Model, ContentItem } from '../types';

/**
 * Fetch all AC brands.
 */
export const fetchBrands = async (): Promise<Brand[]> => {
  const snapshot = await brandsCollection.orderBy('name').get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name ?? '',
    logoUrl: doc.data().logoUrl ?? '',
  }));
};

/**
 * Fetch models for a specific brand.
 */
export const fetchModelsByBrand = async (brandId: string): Promise<Model[]> => {
  const snapshot = await modelsCollection
    .where('brandId', '==', brandId)
    .orderBy('name')
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name ?? '',
    brandId: doc.data().brandId ?? '',
  }));
};

/**
 * Fetch content items for a specific model.
 */
export const fetchContentsByModel = async (modelId: string): Promise<ContentItem[]> => {
  const snapshot = await contentsCollection
    .where('modelId', '==', modelId)
    .get();

  return snapshot.docs.map(doc => mapContentDoc(doc));
};

/**
 * Fetch a single content item by ID.
 */
export const fetchContentById = async (contentId: string): Promise<ContentItem | null> => {
  const doc = await contentsCollection.doc(contentId).get();
  if (!doc.exists) {
    return null;
  }
  return mapContentDoc(doc);
};

/**
 * Fetch featured / recent contents (limited set for home screen).
 */
export const fetchFeaturedContents = async (limit: number = 10): Promise<ContentItem[]> => {
  const snapshot = await contentsCollection.limit(limit).get();
  return snapshot.docs.map(doc => mapContentDoc(doc));
};

/**
 * Search contents by keywords.
 * Uses Firestore array-contains-any for keyword matching.
 */
export const searchContents = async (query: string): Promise<ContentItem[]> => {
  const normalizedQuery = query.toLowerCase().trim();
  const queryTokens = normalizedQuery.split(/\s+/).slice(0, 10); // Firestore limit: 10

  if (queryTokens.length === 0) {
    return [];
  }

  // Search by keywords array
  const keywordSnapshot = await contentsCollection
    .where('keywords', 'array-contains-any', queryTokens)
    .limit(20)
    .get();

  const results = new Map<string, ContentItem>();

  keywordSnapshot.docs.forEach(doc => {
    results.set(doc.id, mapContentDoc(doc));
  });

  // Also search by errorCode exact match
  if (queryTokens.length === 1) {
    const errorCodeSnapshot = await contentsCollection
      .where('errorCode', '==', normalizedQuery.toUpperCase())
      .limit(10)
      .get();

    errorCodeSnapshot.docs.forEach(doc => {
      if (!results.has(doc.id)) {
        results.set(doc.id, mapContentDoc(doc));
      }
    });
  }

  return Array.from(results.values());
};

// Helper to map Firestore doc to ContentItem
function mapContentDoc(doc: FirebaseFirestoreTypes.DocumentSnapshot): ContentItem {
  const data = doc.data()!;
  return {
    id: doc.id,
    title: data.title ?? '',
    description: data.description ?? '',
    errorCode: data.errorCode ?? '',
    steps: data.steps ?? [],
    tools: data.tools ?? [],
    imageUrls: data.imageUrls ?? [],
    videoUrls: data.videoUrls ?? [],
    brandId: data.brandId ?? '',
    modelId: data.modelId ?? '',
    keywords: data.keywords ?? [],
  };
}

// Import the type for use in mapContentDoc
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
