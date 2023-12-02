// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCp_YcTZNb3A-3vTawinhNxYwV2-fQq0Dk",
  authDomain: "projtask-2cc62.firebaseapp.com",
  projectId: "projtask-2cc62",
  storageBucket: "projtask-2cc62.appspot.com",
  messagingSenderId: "750997754063",
  appId: "1:750997754063:web:67f43a9c2d1ead0102e7ba",
  measurementId: "G-HXQ45WNGEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);