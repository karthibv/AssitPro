import { create } from 'zustand';
import { AuthState } from '../types';
import * as authService from '../services/authService';
import { checkSubscriptionStatus } from '../services/subscriptionService';

export const useAuthStore = create<AuthState>((set, _get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,

  initialize: () => {
    const unsubscribe = authService.onAuthStateChanged(async (uid) => {
      if (uid) {
        try {
          const userData = await authService.getUserData(uid);
          if (userData) {
            // Check subscription status
            const subStatus = await checkSubscriptionStatus(uid);
            userData.subscriptionActive = subStatus.isActive;
            userData.subscriptionType = subStatus.type as typeof userData.subscriptionType;
            userData.expiryDate = subStatus.expiryDate;
          }
          set({ user: userData, isAuthenticated: true, isLoading: false });
        } catch {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    });

    // Store unsubscribe for cleanup if needed
    return unsubscribe;
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authService.signIn(email, password);
      const subStatus = await checkSubscriptionStatus(user.id);
      user.subscriptionActive = subStatus.isActive;
      user.subscriptionType = subStatus.type as typeof user.subscriptionType;
      user.expiryDate = subStatus.expiryDate;
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Login failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authService.signUp(name, email, password);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await authService.signOut();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Logout failed';
      set({ error: message, isLoading: false });
    }
  },

  resetPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      await authService.resetPassword(email);
      set({ isLoading: false });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Password reset failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
