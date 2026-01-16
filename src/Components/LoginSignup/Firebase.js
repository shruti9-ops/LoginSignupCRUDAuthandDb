// Firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey:"AIzaSyAZ6kbJ-7tQ4kpDYSQf5KGUnDZoXnkw1Tw",
//   authDomain: "loginsignup-5d954.firebaseapp.com",
//   projectId: "loginsignup-5d954",
//   storageBucket: "loginsignup-5d954.appspot.com",
//   messagingSenderId: "282334287222",
//   appId: "1:282334287222:web:7fdf8013c45d1745895657",
//   databaseURL: "https://loginsignup-5d954-default-rtdb.firebaseio.com"
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};


const app = initializeApp(firebaseConfig);

// 🔥 THESE TWO LINES ARE THE WHOLE POINT
export const auth = getAuth(app);
export const db = getDatabase(app);
