"use client";
import { trpc } from "@/trpc-client/client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import React, { Suspense } from 'react';

const ProductPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { data: product, isLoading, error } = trpc.getProducts.useQuery(
        {
            where: {
                id: parseInt(id as string),
            },
        },
        {
            enabled: !!id, 
        }
    );

    const handleAddToCart = () => {
        if (product && !Array.isArray(product)) {
            toast.success(`${product.name} has been added to your cart!`);
        }
    };

    const handleBuyNow = () => {
        if (product && !Array.isArray(product)) {
            toast.success(`Proceeding to checkout for ${product.name}!`);
        }
    };

    if (isLoading) return <div>Loading...</div>; 
    if (error) return <div>Error fetching product details</div>; 
    if (!product || Array.isArray(product)) return <div>No product found.</div>;

    return (
        <section className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-xl rounded-lg">
            <h1 className="text-2xl font-semibold text-center text-gray-600 mb-6">
                {product.name}
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-8">
                <Image
                    src={product.images[0] || "/placeholder.jpg"}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="object-cover rounded-lg shadow-lg"
                />
                <div className="flex flex-col gap-4">
                    <p className="text-lg text-gray-700">{product.description}</p>
                    <p className="text-xl font-bold text-gray-800">Price: ${product.price}</p>
                    <p className="text-md text-gray-600">Category: {product.category}</p>
                    <p className="text-md text-gray-600">Warranty: {product.warranty}</p>
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={handleAddToCart}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                {product.images.length >= 2 && (
                    <Image
                        src={product.images[1] || "/placeholder.jpg"}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="object-cover rounded-lg shadow-lg my-4"
                    />
                )}
                {product.images.length >= 3 && (
                    <Image
                        src={product.images[2] || "/placeholder.jpg"}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="object-cover rounded-lg shadow-lg my-4"
                    />
                )}
            </div>
            <div className="text-center text-gray-500 mt-8">
                <Link href={'/'} className="pb-2 border-b border-gray-500">Back to Home Page</Link>
            </div>
        </section>
    );
};

export default function ViewProductPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductPage />
        </Suspense>
    );
}
