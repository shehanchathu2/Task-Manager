"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

export default function LoginPage() {

    const { login, role } = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async () => {

    try {

        await login(email, password)

        const userRole = localStorage.getItem("role")

        if (userRole === "ADMIN") {
            router.push("/admin")
        } else {
            router.push("/dashboard")
        }

    } catch (err) {
        setError("Invalid email or password")
    }

}
    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-[380px]">

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login to your account
                </h2>

                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">
                        {error}
                    </p>
                )}

                <div className="flex flex-col gap-4">

                    <input
                        type="email"
                        placeholder="Email"
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        onClick={handleLogin}
                        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                </div>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>

            </div>

        </div>

    )
}