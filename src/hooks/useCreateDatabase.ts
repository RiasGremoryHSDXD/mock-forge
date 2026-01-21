import { useState } from "react";
import { createDatabase } from "../services/dbService";
import { auth } from "../firebase";

export const useCreateDatabase = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const create = async (dbName: string) => {
        setLoading(true)
        setError(null)

        // Check User
        const user = auth.currentUser
        if (!user) {
            const errorMessage = "You must be logged in to create a database"
            setError(errorMessage)
            setLoading(false)
            throw new Error(errorMessage)
        }

        // Check Input
        if (!dbName.trim()) {
            const errorMessage = "Please enter a database name"
            setError(errorMessage)
            setLoading(false)
            throw new Error(errorMessage)
        }

        try {
            const dbId = await createDatabase(user.uid, dbName)
            setLoading(false)
            return dbId
        }
        catch (error: any) {
            console.log("Error creating DB:", error)
            setError(error.message || "Failed to create database")
            setLoading(false)
            throw error
        }
    }

    return {
        create,
        loading,
        error
    }
}