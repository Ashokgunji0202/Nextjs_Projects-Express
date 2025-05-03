"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router=useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { email, password, confirmPassword } = formData;
  
    // 1. Empty fields check
    if (!email || !password || !confirmPassword) {
      const msg = "All fields are required.";
      setError(msg);
      toast.error(msg);
      return;
    }
  
    // 2. Password mismatch check
    if (password !== confirmPassword) {
      const msg = "Passwords do not match.";
      setError(msg);
      toast.error(msg);
      return;
    }
  
    // 3. API request
    try {
      const response = await axios.post("/api/users/forgotpassword", {
        email,
        password,
        confirmPassword,
      });
  
      const successMsg = "Password reset successful!";
      setSuccess(successMsg);
      toast.success(successMsg);
      setFormData({ email: "", password: "", confirmPassword: "" });
      router.back();
    } catch (error: any) {
      const msg = error.response?.data?.error || "Something went wrong";
      setError(msg);
      toast.error(msg);
    }
  
    // No need for duplicate success setting/log after API call
    // console.log can stay if needed
    console.log("Sending reset request:", formData);
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-35 mb-8 border   ">
      <h2 className="text-2xl font-bold mb-10 text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-md hover:border-black transition duration-150 ease-in-out"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="New password"
          className="w-full px-4 py-2 border rounded-md hover:border-black transition duration-150 ease-in-out"
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm new password"
          className="w-full px-4 py-2 border rounded-md hover:border-black transition duration-150 ease-in-out"
          onChange={handleChange}
        />
      
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Reset Password
        </button>
      </form>
      
    </div>
  );
}
