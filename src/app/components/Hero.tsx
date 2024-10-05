import Link from "next/link";

export default function Hero(){
    return (
        <section>
            <div className="flex flex-col items-center justify-center mt-28">
                <h1 className="text-5xl font-bold text-center my-1">Producify</h1>
                <p className="text-xl text-center">Create your Product Details & Reviews...</p>
                <div className="bg-blue-600 p-2 rounded-lg my-8 text-white font-semibold hover:scale-105">
                    <Link href={"/product"}>Create your product</Link>
                </div>
            </div>
            {/* below add the product created previously to display */}
        </section>
    )
}