// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0e0WpiKkctWFdrg7M0XGEs1Vj0wi371o",
  authDomain: "farmnova-83ab8.firebaseapp.com",
  projectId: "farmnova-83ab8",
  storageBucket: "farmnova-83ab8.appspot.com",
  messagingSenderId: "315476771640",
  appId: "1:315476771640:web:72504e43c301a1aba5b7cd",
  measurementId: "G-NYPZ6CJF7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };