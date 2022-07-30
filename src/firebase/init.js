// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHPI5leq49B72lbZ6Lw--wJ1rMMvIKizs",
  authDomain: "fire-base-practise-6ab01.firebaseapp.com",
  projectId: "fire-base-practise-6ab01",
  storageBucket: "fire-base-practise-6ab01.appspot.com",
  messagingSenderId: "185977742274",
  appId: "1:185977742274:web:1aed3ab76a55ae2a63ac5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()