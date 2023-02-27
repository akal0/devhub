// Imports

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase Config

const firebaseConfig = {
    apiKey: "AIzaSyDamEcLYeTCyKLbL3V0vmbKQ6UUbMlM2EE",
    authDomain: "devhub-e1cb9.firebaseapp.com",
    projectId: "devhub-e1cb9",
    storageBucket: "devhub-e1cb9.appspot.com",
    messagingSenderId: "988898652964",
    appId: "1:988898652964:web:7e4b515e7d6332126a79b1"
  };

  
// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export default app;
export { db, storage, auth };