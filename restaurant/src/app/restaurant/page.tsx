"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  createdAt: string;
  image?: string;
}


const RestaurantComponent: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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

  useEffect(() => {

    fetchRestaurants();

  }, []);


  // randomly generate an array of image URLs
  const imageUrls = [
    "https://www.treebo.com/blog/wp-content/uploads/2022/11/3.-Ironhill-Brewery.jpg",
    "https://b.zmtcdn.com/data/pictures/6/21223486/705fe8ad6be93edc0ea6cd95e66fab48_featured_v2.jpg",
    "https://lh5.googleusercontent.com/p/AF1QipOIFh--O2nEaPSwz1Y2J6DFJ1JW3ZjL8m9DCUVr=w408-h611-k-no  ",
    "https://content.jdmagicbox.com/comp/vijayawada/w8/0866px866.x866.230902110900.x6w8/catalogue/dawat-family-restaurant-moghalraja-puram-vijayawada-restaurants-l4y039nfb0.jpg",
    "https://b.zmtcdn.com/data/pictures/1/18698941/872be4f6830220538347f026404af2c3.jpg",
    "https://images.jdmagicbox.com/v2/comp/undefined/i2/0866px866.x866.180630230649.i6i2/catalogue/heera-fusion-restaurant-bharathi-nagar-vijayawada-restaurants-tvgfr26cml.jpg"
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
              <article
                key={restaurant.id}
                className="w-68 p-4 border rounded-lg shadow-lg bg-white"
              >
                <img
                  src={randamImages()}
                  alt={restaurant.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-4">{restaurant.name}</h3>
                <p className="text-sm text-gray-500 mt-2">{restaurant.description}</p>
                <p className="text-sm text-gray-500 mt-2">{restaurant.address}</p>

                <button
                  onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                  className="mt-4 w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  aria-label={`View details of ${restaurant.name}`}
                >
                  View Details
                </button>
              </article>
            );
          })}


        </>
      )}
    </div>
  );
};

export default RestaurantComponent;
