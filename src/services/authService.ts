import { firebaseAuth, usersCollection } from './firebase';
import { User } from '../types';

/**
 * Sign up a new user with email & password.
 * Creates a Firestore user document with default subscription fields.
 */
export const signUp = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  const credential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
  const uid = credential.user.uid;

  await credential.user.updateProfile({ displayName: name });

  const userData: Omit<User, 'id'> = {
    name,
    email,
    subscriptionActive: false,
    subscriptionType: 'free',
    expiryDate: null,
    createdAt: new Date(),
  };

  await usersCollection.doc(uid).set({
    ...userData,
    createdAt: new Date(),
  });

  return { id: uid, ...userData };
};

/**
 * Sign in an existing user with email & password.
 * Fetches the user document from Firestore.
 */
export const signIn = async (email: string, password: string): Promise<User> => {
  const credential = await firebaseAuth.signInWithEmailAndPassword(email, password);
  const uid = credential.user.uid;

  const userDoc = await usersCollection.doc(uid).get();
  if (!userDoc.exists) {
    throw new Error('User document not found');
  }

  const data = userDoc.data()!;
  return {
    id: uid,
    name: data.name ?? '',
    email: data.email ?? email,
    subscriptionActive: data.subscriptionActive ?? false,
    subscriptionType: data.subscriptionType ?? 'free',
    expiryDate: data.expiryDate ? data.expiryDate.toDate() : null,
    createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
  };
};

/**
 * Sign out the current user.
 */
export const signOut = async (): Promise<void> => {
  await firebaseAuth.signOut();
};

/**
 * Send a password reset email.
 */
export const resetPassword = async (email: string): Promise<void> => {
  await firebaseAuth.sendPasswordResetEmail(email);
};

/**
 * Fetch user data from Firestore by UID.
 */
export const getUserData = async (uid: string): Promise<User | null> => {
  const userDoc = await usersCollection.doc(uid).get();
  if (!userDoc.exists) {
    return null;
  }

  const data = userDoc.data()!;
  return {
    id: uid,
    name: data.name ?? '',
    email: data.email ?? '',
    subscriptionActive: data.subscriptionActive ?? false,
    subscriptionType: data.subscriptionType ?? 'free',
    expiryDate: data.expiryDate ? data.expiryDate.toDate() : null,
    createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
  };
};

/**
 * Listen to auth state changes.
 * Returns an unsubscribe function.
 */
export const onAuthStateChanged = (
  callback: (uid: string | null) => void,
): (() => void) => {
  return firebaseAuth.onAuthStateChanged(user => {
    callback(user?.uid ?? null);
  });
};
