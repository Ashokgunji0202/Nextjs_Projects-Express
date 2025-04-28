"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import axios from 'axios';

const Navbar = () => {
  const router=useRouter();

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
  return (
    <div className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0" >
    
      <div className="text-2xl font-bold text-blue-600">
        <Link href="/">My Restaurant</Link>
      </div>

      
      <div className="flex space-x-8">
        <Link href="/" className="text-gray-600 hover:text-blue-500">
          Home
        </Link>
        <Link href="/restaurant" className="text-gray-600 hover:text-blue-500">
          restaurant
        </Link>
        <Link href="/cartsItems" className="text-gray-600 hover:text-blue-500">
          CartItems
        </Link>
        <Link href="/profile" className="text-gray-600 hover:text-blue-500">
          Profile
        </Link>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={logout}>Sign Out</button>
      </div>
    </div>
  );
}

export default Navbar;
