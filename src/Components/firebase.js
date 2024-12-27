import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiwn4IaPeqnMA7RbsrVeAcG2XgkRisBYU",
  authDomain: "campuscraves-43579.firebaseapp.com",
  projectId: "campuscraves-43579",
  storageBucket: "campuscraves-43579.firebasestorage.app",
  messagingSenderId: "299158557182",
  appId: "1:299158557182:web:9ebddcc2357dea19dfb0af",
  measurementId: "G-968JV8BZ3F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Export modules
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db }; // Export `db` here
