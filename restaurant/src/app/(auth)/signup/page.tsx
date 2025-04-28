"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    
  });
  console.log("User =",user)

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.name.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.log( error.response);

      const res = error.response?.data;
      const errorMessage = res?.message || "Signup failed";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-6">{loading ? "Processing..." : "Signup"}</h1>

      <form onSubmit={onSignup} className="w-full max-w-md">
        <label htmlFor="username">Username</label>
        <input
          className="w-full p-2 mt-1 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="username"
          value={user.name}
          placeholder="Enter your username"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <label htmlFor="email">Email</label>
        <input
          className="w-full p-2 mt-1 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
          type="email"
          id="email"
          value={user.email}
          placeholder="Enter your email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="password">Password</label>
        <input
          className="w-full p-2 mt-1 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
          type="password"
          id="password"
          value={user.password}
          placeholder="Enter your password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          disabled={buttonDisabled || loading}
        >
          {buttonDisabled ? "Fill all fields" : loading ? "Signing up..." : "Signup"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
