"use client";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";

export default function CheckoutPage() {
    const { cart, clearCart } = useCart(); // Using the useCart hook
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    // Calculate total amount from cart items
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Handle checkout form submission
    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate checkout process (e.g., payment API call)
        setTimeout(() => {
            clearCart(); // Clear the cart after a successful checkout
            router.push("/success"); // Redirect to a success page after order placement
        }, 2000);
    };

    // Show empty cart message if no items in the cart
    if (cart.length === 0) {
        return (
            <div className="text-center mt-12">
                <h2 className="text-2xl font-semibold">Your cart is empty.</h2>
                <button
                    onClick={() => router.push("/allproducts")}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <section className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-md rounded-lg">
            <BackButton />
            <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
                Checkout
            </h1>

            <form onSubmit={handleCheckout} className="space-y-6">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Order Summary
                    </h2>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} className="flex justify-between">
                                <span>{item.name}</span>
                                <span>
                                    {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between font-bold text-lg mt-4">
                        <span>Total</span>
                        <span>${totalAmount}</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 bg-green-600 text-white rounded-lg ${
                        isProcessing ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isProcessing}
                >
                    {isProcessing ? "Processing..." : "Place Order"}
                </button>
            </form>
        </section>
    );
}
