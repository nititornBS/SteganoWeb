// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJSlykZ_IBx9DHh4gmlIFhAeCRmHCDj4Q",
  authDomain: "stegano-web-24241.firebaseapp.com",
  projectId: "stegano-web-24241",
  storageBucket: "stegano-web-24241.appspot.com",
  messagingSenderId: "412908235294",
  appId: "1:412908235294:web:ec63d895f75c3e661bdc0f",
  measurementId: "G-64923QTYDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);