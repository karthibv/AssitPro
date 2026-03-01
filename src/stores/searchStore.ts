import { create } from 'zustand';
import { SearchState } from '../types';
import { searchContents } from '../services/contentService';

const MAX_HISTORY = 20;

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  results: [],
  isSearching: false,
  searchHistory: [],

  setQuery: (query: string) => set({ query }),

  search: async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      set({ results: [], isSearching: false });
      return;
    }

    set({ isSearching: true, query: trimmed });
    try {
      const results = await searchContents(trimmed);
      set({ results, isSearching: false });
      get().addToHistory(trimmed);
    } catch {
      set({ results: [], isSearching: false });
    }
  },

  clearResults: () => set({ results: [], query: '' }),

  addToHistory: (query: string) => {
    const current = get().searchHistory;
    const filtered = current.filter(q => q !== query);
    const updated = [query, ...filtered].slice(0, MAX_HISTORY);
    set({ searchHistory: updated });
  },

  clearHistory: () => set({ searchHistory: [] }),
}));
