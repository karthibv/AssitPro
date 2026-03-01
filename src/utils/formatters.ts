/**
 * Format a date for display.
 */
export const formatDate = (date: Date | null): string => {
  if (!date) return 'N/A';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format subscription type for display.
 */
export const formatSubscriptionType = (type: string): string => {
  switch (type) {
    case 'monthly':
      return 'Monthly';
    case 'yearly':
      return 'Yearly';
    case 'lifetime':
      return 'Lifetime';
    case 'free':
    default:
      return 'Free';
  }
};

/**
 * Truncate text to a maximum length.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Get error message from Firebase error codes.
 */
export const getFirebaseErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};
