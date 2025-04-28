"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define Restaurant Type
interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  createdAt: string;
  image?: string; // Optional image property
}


const RestaurantComponent: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/restaurants");
        setRestaurants(response.data.restaurants); 
      } catch (error) {
        toast.error("Failed to fetch restaurants");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const imageUrls = [
    "https://bonmasala.com/wp-content/uploads/2022/10/mutton-biriyani-recipe.jpeg",
    "https://cdn.uengage.io/uploads/7057/image-6414-1696047806.jpg",
    "https://www.yummyoyummy.com/wp-content/uploads/2021/09/IMG_0446-scaled.jpg",
    "https://farm9.staticflickr.com/8610/16277229378_c4927cb1ae_o.jpg",
    "https://www.vidhyashomecooking.com/wp-content/uploads/2019/04/DelhiVegBiryaniRecipe.jpg"
  ];

  const lengthImages = imageUrls.length;
  const randamImages = () => {
    const image = Math.floor(Math.random() * lengthImages);
    return imageUrls[image];
  };

  return (

    <div className="flex flex-wrap justify-center gap-6 p-6">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <>
        
          {restaurants.map((restaurant) => {
            
            return (
              <div key={restaurant.id} className={`w-64 p-4 border rounded-lg shadow-lg bg-white`}
              onClick={() => router.push(`/restaurant/${restaurant.id}`)}>
            
                <img
                  src={randamImages()}
                  alt={restaurant.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-4">{restaurant.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{restaurant.description}</p>
                <p className="text-sm text-gray-500 mt-2">{restaurant.address}</p>

                {/* View Details Button */}
                <button
                  onClick={() => router.push(`/restaurant/${restaurant.id}`)} // Navigate to restaurant details page
                  className="mt-4 w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  View Details
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default RestaurantComponent;
