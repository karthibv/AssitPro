/**
 * Firebase Configuration & Initialization
 *
 * Firebase is initialized automatically by @react-native-firebase/app
 * using the native configuration files:
 * - Android: android/app/google-services.json
 * - iOS: ios/GoogleService-Info.plist
 *
 * This module re-exports Firebase services for convenient access.
 */

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';

// Firebase Auth instance
export const firebaseAuth: FirebaseAuthTypes.Module = auth();

// Firestore instance
export const db: FirebaseFirestoreTypes.Module = firestore();

// Storage instance
export const firebaseStorage: FirebaseStorageTypes.Module = storage();

// Collection references
export const usersCollection = db.collection('users');
export const brandsCollection = db.collection('brands');
export const modelsCollection = db.collection('models');
export const contentsCollection = db.collection('contents');

export { auth, firestore, storage };
