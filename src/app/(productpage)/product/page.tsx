"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useState } from "react";
import { trpc } from "@/trpc-client/client";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import BackButton from "@/app/components/BackButton";
// import { useRouter } from "next/router"


type FormData = {
    name: string;
    category: string;
    price: number;
    warranty: string;
    description: string;
    freeDelivery: boolean;
    ownerEmail: string;
    instagram: string;
    url: string;
    images: string[]; // Store multiple images
};

export default function CreateProduct() {
    const createProduct = trpc.addProduct.useMutation();
    const router = useRouter();
    const [productImages, setProductImages] = useState<string[]>([]); // Store multiple images
    const [formData, setFormData] = useState<FormData>({
        name: '',
        category: '',
        price: 0,
        warranty: '',
        description: '',
        freeDelivery: false,
        ownerEmail: '',
        instagram: '',
        url: '',
        images: [],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setFormData((prevData) => ({
                ...prevData,
                [name]: target.checked,
            }));
        } else if (name === 'price') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: parseFloat(value),
            }));
        }else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const createQueryString = (name : string, value : string) => {
        const params = new URLSearchParams();
        params.set(name, value);
    
        return params.toString();
      };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedFormData = { ...formData, images: productImages };
        const urlPattern = /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/;
        if (!urlPattern.test(formData.instagram)) {
            alert("Please enter a valid Instagram URL.");
            return;
        }

        try {
            const createdProduct = await createProduct.mutateAsync(updatedFormData);
            console.log(createdProduct);
            toast.success('Product created successfully!');
            // Reset form data and images after successful submission
            setFormData({
                name: '',
                category: '',
                price: 0,
                warranty: '',
                description: '',
                freeDelivery: false,
                ownerEmail: '',
                instagram: '',
                url: '',
                images: [],
            });
            setProductImages([]);
            router.push('/viewproduct' + "?" + createQueryString('id', createdProduct.id.toString()));
        } catch (error) {
            console.error(error); 
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0 && productImages.length < 3) {
            const file = files[0];
            const uploadPromise = new Promise((resolve, reject) => {
                const data = new FormData();
                data.set('file', file);
                fetch('api/upload', {
                    method: 'POST',
                    body: data
                }).then(res => {
                    if (res.ok) {
                        res.json().then(link => {
                            setProductImages((prevImages) => [...prevImages, link]);
                            resolve(link);
                        });
                    } else {
                        reject();
                    }
                });
            });

            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Product image added successfully!',
                error: 'Failed to add product image.'
            });
        }
    };

    const removeImage = (index: number) => {
        setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <section className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-xl shadow-black/60 rounded-lg">
            <BackButton />
            <h1 className="text-xl font-semibold pb-4 border-b-2 border-gray-200 mb-6 text-center text-gray-600">Add Product Details</h1>
           
            <form onSubmit={handleFormSubmit} className="space-y-8">
                {/* Product Image Upload */}
                <label
                    htmlFor="productImage"
                    className={`border-2 border-dashed border-gray-300 rounded-lg max-w-lg min-h-[250px] mx-auto flex flex-col items-center justify-center text-center cursor-pointer hover:border-gray-400 transition duration-300 ${
                        productImages.length === 3 && "opacity-50 cursor-not-allowed"
                    }`}
                >
                    <FontAwesomeIcon icon={faUpload} className="h-12 text-gray-400 hover:text-gray-600 transition duration-300" />
                    <span className="text-sm mt-4 text-gray-500 font-semibold">
                        {productImages.length < 3
                            ? "Click to Upload Product Image"
                            : "Maximum of 3 images allowed"}
                    </span>
                    <input
                        type="file"
                        id="productImage"
                        name="productImage"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={productImages.length === 3}
                    />
                    <input type="hidden" name="url" value={productImages}/>
                    <input type="hidden" id="images" name="images" value={productImages}/>
                </label>

                {/* Display Uploaded Images */}
                {productImages.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {productImages.map((image, index) => (
                            <div key={index} className="relative group">
                                <Image
                                    src={image}
                                    alt={`Product image ${index + 1}`}
                                    width={128}
                                    height={128}
                                    className="object-cover rounded-lg"
                                />
                                {/* Remove Image Button */}
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-300"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Product Details */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-lg font-medium text-gray-700">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                        placeholder="Enter product name"
                    />
                </div>

                {/* Product Category */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="category" className="text-lg font-medium text-gray-700">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home</option>
                        <option value="beauty">Beauty</option>
                        <option value="sports">Sports</option>
                        <option value="food">Food</option>
                    </select>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="price" className="text-lg font-medium text-gray-700">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                        placeholder="Enter price"
                        required
                    />
                </div>

                {/* Warranty */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="warranty" className="text-lg font-medium text-gray-700">Warranty:</label>
                    <input
                        type="text"
                        id="warranty"
                        name="warranty"
                        value={formData.warranty}
                        onChange={handleInputChange}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                        placeholder="Enter warranty details"
                        required
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-lg font-medium text-gray-700">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                        placeholder="Enter product description"
                        rows={4}
                        required
                    />
                </div>

                {/* Free Delivery */}
                <div className="flex items-center gap-4">
                    <input
                        type="checkbox"
                        id="freeDelivery"
                        name="freeDelivery"
                        checked={formData.freeDelivery}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-blue-500 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                    <label htmlFor="freeDelivery" className="text-lg font-medium text-gray-700">Free Delivery</label>
                </div>

                {/* Owner's Contact Email */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="ownerEmail" className="text-lg font-medium text-gray-700">Owner's Contact Email:</label>
                    <input
                        type="email"
                        id="ownerEmail"
                        name="ownerEmail"
                        value={formData.ownerEmail}
                        onChange={handleInputChange}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                        placeholder="Enter owner's contact email"
                        required
                    />
                </div>

                {/* Owner's Instagram */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="instagram" className="text-lg font-medium text-gray-700">Owner's Instagram:</label>
                    <input
                        type="url"
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                        placeholder="Enter Instagram URL"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                    >
                        Submit Product
                    </button>
                </div>
            </form>
        </section>
    );
}
