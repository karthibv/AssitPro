import { create } from 'zustand';
import { ContentState, ContentItem } from '../types';
import * as contentService from '../services/contentService';

const MAX_RECENTLY_VIEWED = 20;

export const useContentStore = create<ContentState>((set, get) => ({
  brands: [],
  models: [],
  contents: [],
  currentContent: null,
  recentlyViewed: [],
  featuredContents: [],
  isLoading: false,
  error: null,

  fetchBrands: async () => {
    set({ isLoading: true, error: null });
    try {
      const brands = await contentService.fetchBrands();
      set({ brands, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch brands';
      set({ error: message, isLoading: false });
    }
  },

  fetchModels: async (brandId: string) => {
    set({ isLoading: true, error: null });
    try {
      const models = await contentService.fetchModelsByBrand(brandId);
      set({ models, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch models';
      set({ error: message, isLoading: false });
    }
  },

  fetchContents: async (modelId: string) => {
    set({ isLoading: true, error: null });
    try {
      const contents = await contentService.fetchContentsByModel(modelId);
      set({ contents, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch contents';
      set({ error: message, isLoading: false });
    }
  },

  fetchContentById: async (contentId: string) => {
    set({ isLoading: true, error: null });
    try {
      const content = await contentService.fetchContentById(contentId);
      if (content) {
        set({ currentContent: content, isLoading: false });
        // Also add to recently viewed
        get().addToRecentlyViewed(content);
      } else {
        set({ error: 'Content not found', isLoading: false });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch content';
      set({ error: message, isLoading: false });
    }
  },

  fetchFeaturedContents: async () => {
    set({ isLoading: true, error: null });
    try {
      const featuredContents = await contentService.fetchFeaturedContents();
      set({ featuredContents, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to fetch featured contents';
      set({ error: message, isLoading: false });
    }
  },

  addToRecentlyViewed: (content: ContentItem) => {
    const current = get().recentlyViewed;
    const filtered = current.filter(item => item.id !== content.id);
    const updated = [content, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
    set({ recentlyViewed: updated });
  },

  clearError: () => set({ error: null }),
}));
