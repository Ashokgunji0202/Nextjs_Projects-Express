"use client";

import Link from "next/link";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const[error,setError]=useState("");
  const[buttonDisabled,setButtonDisabled]=useState(false);
  const[loading,setLoading]=useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [error]);

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login error", error.response?.data || error.message);
      setError(error.response?.data?.error||"Login failed!");
      toast.error(error.response?.data?.error || "Login failed!");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-semibold mb-6">{loading ? "Processing" : "Login"}</h1>
      <form
        onSubmit={onLogin}
        className="flex flex-col items-center w-full max-w-sm"
      >
        <label htmlFor="email" className="self-start text-sm font-medium">
          Email
        </label>
        <input
          className="p-2 mb-4 mt-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
          type="email"
          id="email"
          name="email"
          value={user.email}
          placeholder="Enter your email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="password" className="self-start text-sm font-medium">
          Password
        </label>
        <input
          className="p-2 mb-4 mt-1 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
          type="password"
          id="password"
          name="password"
          value={user.password}
          placeholder="Enter your password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          className="p-2 w-full border border-gray-300 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          type="submit"
        >
          Login
        </button>
      </form>
      <div>{error && <p className="text-red-500">{error}</p>}</div>
      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
