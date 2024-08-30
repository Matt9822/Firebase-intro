// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuV1taRbwmHdCJ3lKj9tomJGQ3n3XWYM4",
  authDomain: "fir-1st-project-11aa0.firebaseapp.com",
  projectId: "fir-1st-project-11aa0",
  storageBucket: "fir-1st-project-11aa0.appspot.com",
  messagingSenderId: "641651543554",
  appId: "1:641651543554:web:38a0b2d322dba29920a11b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();