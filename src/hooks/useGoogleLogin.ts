import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase";


export function useGoogleLogin() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        setError("");

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check Database

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            // If user does NOT exist, create them
            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    createdAt: new Date().toISOString(),
                    credits: 500,
                    plan: "free"
                });
                console.log("New User Created in Database");
            }
            else {
                console.log("User already exists. Logging in...");
            }

            return user;
        }
        catch (error) {
            console.error("Login Error:", error);
            setError("Login failed. Check console for details.");
        }
    }

    return { login, error, loading };
}
