import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAojwLTAikomMAbM7HcPXblj7-yDBS8l7A",
  authDomain: "signal-clone-yt-ec82f.firebaseapp.com",
  projectId: "signal-clone-yt-ec82f",
  storageBucket: "signal-clone-yt-ec82f.appspot.com",
  messagingSenderId: "390931949225",
  appId: "1:390931949225:web:b323247565139e974fabb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore()

export { auth, db }