import { usersCollection } from './firebase';

/**
 * Check if a user's subscription is active.
 * Validates both the boolean flag and the expiry date.
 */
export const checkSubscriptionStatus = async (
  userId: string,
): Promise<{
  isActive: boolean;
  type: string;
  expiryDate: Date | null;
}> => {
  const doc = await usersCollection.doc(userId).get();

  if (!doc.exists) {
    return { isActive: false, type: 'free', expiryDate: null };
  }

  const data = doc.data()!;
  const subscriptionActive = data.subscriptionActive ?? false;
  const subscriptionType = data.subscriptionType ?? 'free';
  const expiryDate = data.expiryDate ? data.expiryDate.toDate() : null;

  // For lifetime subscriptions, always active if flag is set
  if (subscriptionType === 'lifetime' && subscriptionActive) {
    return { isActive: true, type: subscriptionType, expiryDate: null };
  }

  // For time-based subscriptions, check expiry
  if (subscriptionActive && expiryDate) {
    const now = new Date();
    if (expiryDate > now) {
      return { isActive: true, type: subscriptionType, expiryDate };
    }
    // Subscription expired — update Firestore
    await usersCollection.doc(userId).update({
      subscriptionActive: false,
    });
    return { isActive: false, type: subscriptionType, expiryDate };
  }

  return { isActive: subscriptionActive, type: subscriptionType, expiryDate };
};

/**
 * Placeholder for future Stripe/App Store integration.
 * This function would be called after a successful purchase.
 */
export const activateSubscription = async (
  userId: string,
  type: 'monthly' | 'yearly' | 'lifetime',
): Promise<void> => {
  const now = new Date();
  let expiryDate: Date | null = null;

  if (type === 'monthly') {
    expiryDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  } else if (type === 'yearly') {
    expiryDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
  }

  await usersCollection.doc(userId).update({
    subscriptionActive: true,
    subscriptionType: type,
    expiryDate,
  });
};
