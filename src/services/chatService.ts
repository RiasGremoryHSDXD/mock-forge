import {
    collection,
    addDoc,
    updateDoc,
    doc,
    getDocs,
    query,
    orderBy,
    where,
    serverTimestamp,
    Timestamp,
    getDoc
} from "firebase/firestore";
import { db } from "../firebase";

export interface Message {
    role: 'user' | 'model';
    text: string;
}

export interface Conversation {
    id: string;
    userId: string;
    title: string;
    messages: Message[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

const COLLECTION_NAME = "conversations";

export const chatService = {
    /**
     * Creates a new conversation or updates an existing one
     */
    saveConversation: async (userId: string, conversationId: string | null, messages: Message[]) => {
        try {
            if (!userId) throw new Error("User ID is required");

            const collectionRef = collection(db, `users/${userId}/${COLLECTION_NAME}`);

            // Generate a title from the first user message if it's new
            const title = messages.find(m => m.role === 'user')?.text.slice(0, 50) || "New Conversation";

            if (conversationId) {
                // Update existing conversation
                const docRef = doc(db, `users/${userId}/${COLLECTION_NAME}`, conversationId);
                await updateDoc(docRef, {
                    messages,
                    updatedAt: serverTimestamp()
                });
                return conversationId;
            } else {
                // Create new conversation
                const docRef = await addDoc(collectionRef, {
                    userId,
                    title,
                    messages,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                return docRef.id;
            }
        } catch (error) {
            console.error("Error saving conversation:", error);
            throw error;
        }
    },

    /**
     * Retrieves all conversations for a specific user
     */
    getUserConversations: async (userId: string): Promise<Conversation[]> => {
        try {
            if (!userId) return [];

            const collectionRef = collection(db, `users/${userId}/${COLLECTION_NAME}`);
            const q = query(collectionRef, orderBy("updatedAt", "desc"));

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Conversation));
        } catch (error) {
            console.error("Error fetching conversations:", error);
            return [];
        }
    },

    /**
     * Retrieves a single conversation by ID
     */
    getConversation: async (userId: string, conversationId: string): Promise<Conversation | null> => {
        try {
            if (!userId || !conversationId) return null;

            const docRef = doc(db, `users/${userId}/${COLLECTION_NAME}`, conversationId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as Conversation;
            }
            return null;
        } catch (error) {
            console.error("Error fetching conversation:", error);
            return null;
        }
    }
};
