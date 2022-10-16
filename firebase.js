import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDgfuIF2UfugXc3znf64S0VJMcf9mbfLPc",
  authDomain: "signal-clone-yt-770bf.firebaseapp.com",
  projectId: "signal-clone-yt-770bf",
  storageBucket: "signal-clone-yt-770bf.appspot.com",
  messagingSenderId: "225432532969",
  appId: "1:225432532969:web:6ac9cfa34b52890765fd78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore()

export { auth, db }