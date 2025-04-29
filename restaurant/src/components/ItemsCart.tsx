"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


// Define Item Type for safity
interface Item {
  id: number;
  name: string;
  description: string;
  price: string; 
  tags: string;
  isAvailable: boolean;
  image?: string; 
}

interface Restaurant {
  name: string;
  description: string;
}
interface Props {
  resId: string;
}

const ItemsComponent: React.FC<Props> = ({resId}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  console.log(items);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/restaurants/${resId}`);	  
        //console.log(response.data.restaurant.items);
        setRestaurant(response.data.restaurant);
        setItems(response.data.restaurant.items); // Access the products array from the response
      } catch (error) {
        toast.error("Failed to fetch items");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const imageUrls=["https://bonmasala.com/wp-content/uploads/2022/10/mutton-biriyani-recipe.jpeg","https://cdn.uengage.io/uploads/7057/image-6414-1696047806.jpg","https://www.yummyoyummy.com/wp-content/uploads/2021/09/IMG_0446-scaled.jpg","https://farm9.staticflickr.com/8610/16277229378_c4927cb1ae_o.jpg","https://www.vidhyashomecooking.com/wp-content/uploads/2019/04/DelhiVegBiryaniRecipe.jpg"];
  const lengthImages=imageUrls.length;
  const randamImages=()=>{
    const image=Math.floor(Math.random()*lengthImages);
    return imageUrls[image];
  }

  return (

    <div className="flex flex-col items-side p-6">
      {restaurant && (
        <div className="text-left p-4 ml-5 mb-6">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-gray-600 mt-2">{restaurant.description}</p>
          <h2 className="text-xl font-semibold mt-6">Items in this restaurant:</h2>
        </div>
      )}
    <div className="flex flex-wrap justify-left gap-6 p-6 bg-slate-100 ">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-500"></div>
        </div>
        
      ) : (
        items.map((item) => (
            
          <div key={item.id} className="w-64 p-4 border rounded-lg shadow-lg bg-white">

            <img
              src={randamImages()}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4">{item.name}</h3>
            <p className="text-sm text-gray-500 mt-2">{item.description}</p>
            <p className="text-lg font-bold mt-2">${item.price}</p>

            {/* Display availability status */}
            <p className={`text-sm mt-2 ${item.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
              {item.isAvailable ? "Available" : "Out of Stock"}
            </p>

            {/* Add to Cart button (if available) */}
            {item.isAvailable && (
              <button
                onClick={() => router.push(`/cart?add=${item.id}`)} // Navigate to cart page
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            )}
          </div>
          
        ))
      )}
    </div>
    </div>
  );
};

export default ItemsComponent;
