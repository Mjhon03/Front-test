import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrLMWcrEuxJt3bEX4tUOWZMWgeJEYyRuI",
  authDomain: "prueba-front-e537a.firebaseapp.com",
  projectId: "prueba-front-e537a",
  storageBucket: "prueba-front-e537a.firebasestorage.app",
  messagingSenderId: "905668870728",
  appId: "1:905668870728:web:910ad56fefc43f79ad4e7d",
  measurementId: "G-M26YH2435F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)