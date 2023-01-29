// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAH8vDh7-Bz63Nybkm7nsmiD0OJwoZ8szg",
  authDomain: "house-market-9aa9c.firebaseapp.com",
  projectId: "house-market-9aa9c",
  storageBucket: "house-market-9aa9c.appspot.com",
  messagingSenderId: "303613186614",
  appId: "1:303613186614:web:98cb39d1c8d2d78156fe97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db= getFirestore();