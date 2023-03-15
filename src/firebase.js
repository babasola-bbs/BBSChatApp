// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcaHAfA9HmbyVW1uzT6p19RT2coET0caY",
  authDomain: "bbs-chat-a7077.firebaseapp.com",
  projectId: "bbs-chat-a7077",
  storageBucket: "bbs-chat-a7077.appspot.com",
  messagingSenderId: "334813908892",
  appId: "1:334813908892:web:0d1f54bd61f3bd85aa0259",
  measurementId: "G-3RKCCW0V4G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const myAuth = getAuth();
export const myStorage = getStorage();
export const db = getFirestore();
const analytics = getAnalytics(app);