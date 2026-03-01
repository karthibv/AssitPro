import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../stores/authStore';

/**
 * Hook that provides a subscription gating function.
 * Wrap content access calls with `requireSubscription` to enforce paywall.
 */
export const useSubscriptionGate = () => {
  const user = useAuthStore(state => state.user);

  const isSubscribed = user?.subscriptionActive ?? false;

  const requireSubscription = useCallback(
    (onAllowed: () => void) => {
      if (isSubscribed) {
        onAllowed();
      } else {
        Alert.alert(
          'Subscription Required',
          'You need an active subscription to access this content. Please upgrade your plan.',
          [{ text: 'OK', style: 'default' }],
        );
      }
    },
    [isSubscribed],
  );

  return { isSubscribed, requireSubscription };
};
