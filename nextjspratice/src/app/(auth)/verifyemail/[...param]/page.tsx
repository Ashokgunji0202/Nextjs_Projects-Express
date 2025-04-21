"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import React, { useState, useEffect } from "react"

export default function VerifyEmailPage() {
    const router = useRouter()
    const [token, setToken] = useState("")
    const [isVerified, setIsVerified] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setIsVerified(true)
        } catch (error: any) {
            console.log(error.response?.data || error.message)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 bg-gray-50">
            <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Verify Email</h1>
                {isVerified ? (
                    <div className="text-green-600 font-semibold">
                        Email verified!{" "}
                        <Link href="/login" className="text-blue-600 underline hover:text-blue-800">
                            Click here to login
                        </Link>
                    </div>
                ) : (
                    <p className="text-gray-600">Verifying your email, please wait...</p>
                )}
            </div>
        </div>
    )
}