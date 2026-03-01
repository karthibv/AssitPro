// ==========================================
// Firebase / Firestore Data Models
// ==========================================

export interface User {
  id: string;
  name: string;
  email: string;
  subscriptionActive: boolean;
  subscriptionType: 'free' | 'monthly' | 'yearly' | 'lifetime';
  expiryDate: Date | null;
  createdAt: Date;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Model {
  id: string;
  name: string;
  brandId: string;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  errorCode: string;
  steps: string[];
  tools: string[];
  imageUrls: string[];
  videoUrls: string[];
  brandId: string;
  modelId: string;
  keywords: string[];
}

// ==========================================
// Navigation Types
// ==========================================

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  ContentDetail: { contentId: string };
  ImageViewer: { imageUrls: string[]; initialIndex: number };
  VideoPlayer: { videoUrl: string; title: string };
};

export type ContentStackParamList = {
  BrandList: undefined;
  ModelList: { brandId: string; brandName: string };
  ContentList: { modelId: string; modelName: string; brandId: string };
  ContentDetail: { contentId: string };
  ImageViewer: { imageUrls: string[]; initialIndex: number };
  VideoPlayer: { videoUrl: string; title: string };
};

export type SearchStackParamList = {
  SearchScreen: undefined;
  ContentDetail: { contentId: string };
  ImageViewer: { imageUrls: string[]; initialIndex: number };
  VideoPlayer: { videoUrl: string; title: string };
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Library: undefined;
  Search: undefined;
  Profile: undefined;
};

// ==========================================
// Store Types
// ==========================================

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  initialize: () => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

export interface ContentState {
  brands: Brand[];
  models: Model[];
  contents: ContentItem[];
  currentContent: ContentItem | null;
  recentlyViewed: ContentItem[];
  featuredContents: ContentItem[];
  isLoading: boolean;
  error: string | null;
  fetchBrands: () => Promise<void>;
  fetchModels: (brandId: string) => Promise<void>;
  fetchContents: (modelId: string) => Promise<void>;
  fetchContentById: (contentId: string) => Promise<void>;
  fetchFeaturedContents: () => Promise<void>;
  addToRecentlyViewed: (content: ContentItem) => void;
  clearError: () => void;
}

export interface SearchState {
  query: string;
  results: ContentItem[];
  isSearching: boolean;
  searchHistory: string[];
  setQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
  clearResults: () => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
}

export interface SubscriptionState {
  isActive: boolean;
  type: string;
  expiryDate: Date | null;
  checkSubscription: (userId: string) => Promise<boolean>;
}
