import Link from "next/link";
export default function BackButton(){
    return (
        <div className="mb-8">
            <Link href="/" className="px-4 py-2 bg-white text-gray-700 rounded-lg shadow-md hover:text-gray-300 transition duration-200">
                    ← Back to Home
            </Link>
        </div>
    )
}