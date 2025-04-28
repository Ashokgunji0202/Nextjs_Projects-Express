"use client";

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
    
      <div className="text-2xl font-bold text-blue-600">
        <Link href="/">My Restaurant</Link>
      </div>

      
      <div className="flex space-x-6">
        <Link href="/" className="text-gray-600 hover:text-blue-500">
          Home
        </Link>
        <Link href="/products" className="text-gray-600 hover:text-blue-500">
          restaurant
        </Link>
        <Link href="/cart" className="text-gray-600 hover:text-blue-500">
          CartItems
        </Link>
        <Link href="/profile" className="text-gray-600 hover:text-blue-500">
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
