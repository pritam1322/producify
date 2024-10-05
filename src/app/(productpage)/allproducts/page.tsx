"use client";
import { trpc } from "@/trpc-client/client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import BackButton from "@/app/components/BackButton";
// Import the useCart hook

export default function AllProductsPage() {
    const { data: products, isLoading, error } = trpc.getAllProducts.useQuery();
    const { addToCart } = useCart(); // Access the cart context

    const handleAddToCart = (product: any) => {
        addToCart(product);
        toast.success(`${product.name} has been added to your cart!`);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products</div>;

    return (
        <section className="max-w-7xl mx-auto my-12 p-6">
            <div className="flex justify-between mb-8">
                <BackButton />
                <nav className="flex gap-4  text-lg font-semibold  bg-white text-gray-900  rounded-lg px-4 py-2 items-center">
                    <FontAwesomeIcon icon={faCartShopping} className="h-4" />
                    <Link href="/cart">Cart</Link>
                </nav>
            </div>
            <h1 className="text-3xl font-semibold text-center font-serif uppercase text-gray-900 mb-8">
                Products
            </h1>
            <div className="grid grid-cols-1 max-w-5xl mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {products?.map((product) => (
                    <div key={product.id} className="bg-white  shadow-lg rounded-lg p-4">
                        <div className="relative w-full h-[300px]">
                            <Image
                                src={product.images[0] || "/placeholder.jpg"}
                                alt={product.name}
                                fill
                                className="object-cover object-center rounded-lg"
                            />
                        </div>
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                            <p className="text-gray-600">Price: ${product.price}</p>
                            <Link href={`/viewproduct?id=${product.id}`} className="text-blue-600 hover:text-blue-800 mt-2 block">
                                    View Details
                            </Link>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 w-full"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
