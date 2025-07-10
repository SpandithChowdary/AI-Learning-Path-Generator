import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  confirmPasswordReset,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,  
  getRedirectResult, 
  fetchSignInMethodsForEmail,
  verifyPasswordResetCode
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7A6GTYm32fwfdVRLPg2-3Q8Aphngb6pM",
  authDomain: "ai-path-d1553.firebaseapp.com",
  projectId: "ai-path-d1553",
  storageBucket: "ai-path-d1553.firebasestorage.app",
  databaseURL: "https://ai-path-d1553-default-rtdb.asia-southeast1.firebasedatabase.app/",
  messagingSenderId: "900369822193",
  appId: "1:900369822193:web:ad4e59ee6dfe22b1dbd450",
  measurementId: "G-ET5PLME5MS"
};

const app = initializeApp(firebaseConfig);
export const realtimeDB = getDatabase(app);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
// Export auth methods
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult, 
  onAuthStateChanged,
  googleProvider,
  signOut,  
  verifyPasswordResetCode,
  fetchSignInMethodsForEmail
};