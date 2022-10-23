import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCI8k1ICunvKNvXBrDB7sLerel8ptn6pfU",
  authDomain: "signal-clone-yt-4cabb.firebaseapp.com",
  projectId: "signal-clone-yt-4cabb",
  storageBucket: "signal-clone-yt-4cabb.appspot.com",
  messagingSenderId: "374313734777",
  appId: "1:374313734777:web:08809e60b41b594506faa8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore()

export { auth, db }