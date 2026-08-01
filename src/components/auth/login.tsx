'use client'
import { authClient } from "@/lib/auth-client"

export const Login = () => {
    const handleLogin = async () => {
        try {
            const { data, error } = await authClient.signIn.oauth2({
                providerId: "dauth",
            })
        } catch (error) {
            console.error("Error occurred while logging in:", error)
        }
    }

    return (
        <button type="button" onClick={handleLogin} className="bg-white text-2xl text-black px-6 py-3 rounded-md hover:bg-white/90 transition-colors duration-150">
            Sign In
        </button>
    )
}