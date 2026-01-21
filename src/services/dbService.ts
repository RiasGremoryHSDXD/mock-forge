import {
    collection,
    addDoc,
    serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";

export const createDatabase = async (userId: string, dbName: string) => {
    try {
        const dbCollection = collection(db, "databases")

        const newDocRef = await addDoc(dbCollection, {
            name: dbName,
            ownerId: userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        })

        return newDocRef.id
    }
    catch (error) {
        console.log("Error creating DB:", error)
        throw error
    }
}