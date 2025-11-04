 
import { initializeApp } from "firebase/app";
 
 
const firebaseConfig = {
  apiKey: "AIzaSyDY7hwGKvvnuSZMStKpnHs4C_V7pwGrWk4",
  authDomain: "artist-2bba0.firebaseapp.com",
  projectId: "artist-2bba0",
  storageBucket: "artist-2bba0.firebasestorage.app",
  messagingSenderId: "844577400041",
  appId: "1:844577400041:web:ce48cb6e386f86f391fc78",
  measurementId: "G-Z7HYQ6DZNL"
};

// Initialize Firebase
const firebaseartist = initializeApp(firebaseConfig);
export  default firebaseartist