"use client"

import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function Profile() {
  const router = useRouter()
  const [data, setData] = useState<any>(null)

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout successful")
      router.push("/login")
    } catch (error: any) {
      console.log(error.response?.data || error.message)
      toast.error(error.response?.data || "Logout failed")
    }
  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me")
      console.log(res.data.data)
      setData(res.data.user)
    } catch (error: any) {
      console.log(error.response?.data || error.message)
      toast.error(error.response?.data || "Failed to get user details")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">profile page</p>
      <hr />
      <h2>Username: {data?.username}</h2>
      {data && (
        <h3>
          <Link href={`/profile/${data.username}`} className="text-blue-600 underline">
            Your Profile
          </Link>
        </h3>
      )}
      <div className="flex gap-4 mt-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={logout}
        >
          Logout
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={getUserDetails}
        >
          Get User
        </button>
      </div>
    </div>
  )
}
