"use client";
import React from "react";
import Image from "next/image";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";

export default function CartPage() {
    const { cart, removeFromCart } = useCart(); // Access cart and remove function
    const router = useRouter();
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <section className="max-w-7xl mx-auto my-12 p-6">
            <BackButton />

            <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">Your Cart</h1>

            {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cart.map(item => (
                            <div key={item.id} className="bg-white shadow-lg rounded-lg p-4">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={item.images[0] || "/placeholder.jpg"}
                                        alt={item.name}
                                        width={100}
                                        height={100}
                                        className="rounded-lg object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        <p className="text-gray-600">Price: ${item.price}</p>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="mt-4 text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-right">
                        <h3 className="text-xl font-bold">Total: ${totalPrice}</h3>
                        <button
                            onClick={() => router.push("/checkout")}
                            className="px-6 py-2 mt-4 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}
