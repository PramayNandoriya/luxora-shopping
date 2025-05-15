// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYbmr1NHfDvrxUL0oG9w-No4MpvWjaPDc",
  authDomain: "luxora-2822.firebaseapp.com",
  projectId: "luxora-2822",
  storageBucket: "luxora-2822.firebasestorage.app",
  messagingSenderId: "71828458874",
  appId: "1:71828458874:web:86c5cac6f2d5d0a6631ac3",
  measurementId: "G-7H2H1Z77HJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };