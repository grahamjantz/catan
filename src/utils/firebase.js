// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEJ_Ej9F3nwgqew0LJGa3ey1OgXZjqlpQ",
  authDomain: "catan-874d7.firebaseapp.com",
  projectId: "catan-874d7",
  storageBucket: "catan-874d7.appspot.com",
  messagingSenderId: "20867087473",
  appId: "1:20867087473:web:d3642a7458df6f77dc2fd0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
