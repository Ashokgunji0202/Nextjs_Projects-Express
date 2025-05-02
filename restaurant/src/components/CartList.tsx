"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";


type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
};

type CartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: Product;
};

export const CartList: React.FC = () => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
  
   
  
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = items.reduce(
      (acc, item) => acc + Number(item.product.price) * item.quantity,
      0
    );
    const shipping = totalPrice > 500 ? 0 : 10;
    const tax = totalPrice * 0.18;
    const grandTotal = totalPrice + shipping + tax;
  
    const imageUrls = [
      "https://bonmasala.com/wp-content/uploads/2022/10/mutton-biriyani-recipe.jpeg",
      "https://cdn.uengage.io/uploads/7057/image-6414-1696047806.jpg",
      "https://www.yummyoyummy.com/wp-content/uploads/2021/09/IMG_0446-scaled.jpg",
      "https://farm9.staticflickr.com/8610/16277229378_c4927cb1ae_o.jpg",
      "https://www.vidhyashomecooking.com/wp-content/uploads/2019/04/DelhiVegBiryaniRecipe.jpg"
    ];
    const randamImages = () =>
      imageUrls[Math.floor(Math.random() * imageUrls.length)];
  
    if (loading) return <p className="p-6 text-center">Loading...</p>;
  
    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <svg className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => router.push("/restaurant")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add cart items
          </button>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
          </h1>
          
        </div>
  
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 border rounded shadow-sm bg-white"
              >
                <img
                  src={randamImages()}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-lg">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.product.description}
                  </p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                  <p className="font-medium">
                    Price: ₹{item.product.price} x {item.quantity} = ₹
                    {(Number(item.product.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 font-bold border border-red-500 hover:border-red-700 px-4 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
  
          <div className="md:col-span-1 sticky top-4">
            <div className="border rounded shadow-sm p-6 bg-white">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b">
                Order Summary
              </h2>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t pt-4 font-bold text-lg flex justify-between">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };