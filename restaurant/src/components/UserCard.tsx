"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const UserCard = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/me");
        console.log(response.data);
        const userData = response.data;
        setUser({
          name: userData.user.name || "No Name",
          email: userData.user.email || "No Email",
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col items-center p-8 border rounded-lg shadow-lg bg-white w-96 space-y-6">

  <img
    src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
    alt="User Avatar"
    className="w-32 h-32 rounded-full object-cover"
  />

  
  <div className="w-full">
    <label className="block text-gray-700 font-medium mb-2">Name:</label>
    <input
      type="text"
      value={user.name}
      readOnly
      className="w-full p-2 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-0 border-none"
    />
  </div>


  <div className="w-full">
    <label className="block text-gray-700 font-medium mb-2">Email:</label>
    <input
      type="email"
      value={user.email}
      readOnly
      className="w-full p-2 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-0 border-none"
    />
  </div>
</div>

  
  );
};

export default UserCard;
