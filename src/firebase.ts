// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <--- 1. Import this

const firebaseConfig = {
    // ... keep your existing config keys exactly as they are ...
    apiKey: "AIzaSyAb0pCQqv3oO3J04N3sK_UPwDuDOTcQTXE",
    authDomain: "mock-forge.firebaseapp.com",
    projectId: "mock-forge",
    storageBucket: "mock-forge.firebasestorage.app",
    messagingSenderId: "291195347812",
    appId: "1:291195347812:web:84b9bdca43469765fc1071",
    measurementId: "G-6EQBNRWSMT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // <--- 2. Export the database connection