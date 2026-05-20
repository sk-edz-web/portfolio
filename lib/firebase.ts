// ============================================
// FIREBASE CONFIGURATION
// ============================================
// Replace the values below with your Firebase config
// You can find these in your Firebase Console:
// Project Settings > General > Your Apps > Firebase SDK snippet
// ============================================

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // ⚠️ REPLACE THESE VALUES WITH YOUR FIREBASE CONFIG ⚠️
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (prevent multiple initializations)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
