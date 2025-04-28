"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define Item Type
interface Item {
  id: number;
  name: string;
  description: string;
  price: string; 
  tags: string;
  isAvailable: boolean;
  image?: string; 
}

const ItemsComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/products");
        setItems(response.data.products); // Access the products array from the response
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
    <div className="flex flex-wrap justify-center gap-6 p-6">
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
  );
};

export default ItemsComponent;
