import { Navigate } from "react-router-dom"
import type { ReactElement } from "react"

/**
 * PublicRoute Component
 * 
 * This component acts as a guard for public routes (like Login or Register).
 * It ensures that logged-in users are automatically redirected to the dashboard/home
 * if they try to access these pages, improving the user experience.
 * 
 * @param {object} props - The input properties passed to this component.
 * @param {ReactElement} props.children - The child component (e.g. <Login />)
 * 
 * @returns {ReactElement} - 
 * If logged in → redirects to /home.
 * If not logged in → shows the public page (e.g., Login).
 */
export function PublicRoute({ children }: { children: ReactElement }): ReactElement {
    // Step 1: Check if user is logged in by looking in localStorage
    const isLoggedIn = localStorage.getItem("user_uid")

    // Step 2: If user IS logged in, redirect them to the home page
    if (isLoggedIn) {
        return <Navigate to="/home" replace />
    }

    // Step 3: If user is NOT logged in, allow them to view the public page
    return children
}
