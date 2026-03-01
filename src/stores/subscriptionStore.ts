import { create } from 'zustand';
import { SubscriptionState } from '../types';
import { checkSubscriptionStatus } from '../services/subscriptionService';

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  isActive: false,
  type: 'free',
  expiryDate: null,

  checkSubscription: async (userId: string): Promise<boolean> => {
    try {
      const status = await checkSubscriptionStatus(userId);
      set({
        isActive: status.isActive,
        type: status.type,
        expiryDate: status.expiryDate,
      });
      return status.isActive;
    } catch {
      set({ isActive: false, type: 'free', expiryDate: null });
      return false;
    }
  },
}));
