# AssistPro — AC Technician Learning & Service Assistant

A subscription-based mobile knowledge platform for AC technicians, built with React Native and Firebase.

## Tech Stack

- **Frontend**: React Native (TypeScript), React Navigation v6+, Zustand
- **Backend**: Firebase (Authentication, Cloud Firestore, Firebase Storage)
- **Image Viewer**: React Native Gesture Handler + Reanimated (pinch zoom, pan)
- **Video Player**: React Native Video (Firebase Storage streaming)

## Project Structure

```
src/
├── components/       # Reusable UI components
│   └── common/       # Button, Input, Card, SearchBar, etc.
├── hooks/            # Custom hooks (subscription gating)
├── navigation/       # React Navigation setup
│   ├── RootNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── MainTabNavigator.tsx
│   ├── HomeNavigator.tsx
│   ├── ContentNavigator.tsx
│   ├── SearchNavigator.tsx
│   └── ProfileNavigator.tsx
├── screens/          # App screens
│   ├── Auth/         # Login, Signup, ForgotPassword
│   ├── Home/         # Dashboard
│   ├── Content/      # Brands, Models, ContentList, ContentDetail, ImageViewer, VideoPlayer
│   ├── Search/       # Smart search
│   └── Profile/      # User profile & subscription info
├── services/         # Firebase service modules
│   ├── firebase.ts   # Firebase initialization
│   ├── authService.ts
│   ├── contentService.ts
│   └── subscriptionService.ts
├── stores/           # Zustand state management
│   ├── authStore.ts
│   ├── contentStore.ts
│   ├── searchStore.ts
│   └── subscriptionStore.ts
├── theme/            # Design system (colors, spacing)
├── types/            # TypeScript type definitions
└── utils/            # Utility functions

firestore/            # Firestore & Storage security rules
scripts/              # Seed data script
```

## Features

1. **Authentication** — Email/password login, signup, password reset, persistent sessions
2. **Subscription Model** — Firestore-based subscription gating (ready for Stripe/IAP integration)
3. **Home Dashboard** — Search bar, brand categories, recently viewed, featured tutorials
4. **Content Library** — Brand → Model → Content hierarchy with repair guides
5. **Circuit Image Viewer** — Full-screen pinch-to-zoom with smooth pan
6. **Video Player** — Firebase Storage streaming with progress tracking
7. **Smart Search** — Keyword-based search (error codes, symptoms, components, models)
8. **Profile** — User info, subscription status, logout

## Setup

### Prerequisites

- Node.js >= 18
- React Native development environment ([setup guide](https://reactnative.dev/docs/environment-setup))
- Firebase project

### Installation

```bash
npm install
```

### Firebase Configuration

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Enable Firebase Storage
5. Download config files:
   - Android: Place `google-services.json` in `android/app/`
   - iOS: Place `GoogleService-Info.plist` in `ios/`
6. Deploy Firestore rules: `firebase deploy --only firestore:rules`
7. Deploy Storage rules: `firebase deploy --only storage`

### Seed Data

```bash
npx ts-node scripts/seedFirestore.ts
```

### Run

```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

## Firestore Data Models

| Collection | Key Fields |
|-----------|-----------|
| `users/{userId}` | name, email, subscriptionActive, subscriptionType, expiryDate, createdAt |
| `brands/{brandId}` | name, logoUrl |
| `models/{modelId}` | name, brandId |
| `contents/{contentId}` | title, description, errorCode, steps[], tools[], imageUrls[], videoUrls[], brandId, modelId, keywords[] |

## License

Private — All rights reserved.
