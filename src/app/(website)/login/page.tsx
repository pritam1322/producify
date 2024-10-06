
import LoginButton from "@/app/components/LoginButton";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage(){
    const session = await getServerSession(authOptions);
    if(session){
        redirect('/');
    }
    return (
        <section className="max-w-[300px] mx-auto border border-gray-300 shadow-md shadow-black/50 rounded-lg my-16 bg-gray-100">
            
        <section className="px-4">
            <h1 className="font-semibold text-2xl p-4">Sign in</h1>
            <LoginButton />
            <div className="flex items-center justify-center mx-3 my-2">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="mx-2 text-gray-500">or</span>
                <div className="border-t border-gray-300 flex-grow"></div>
            </div>
        </section>
        <form className="px-4">
            <div className="p-2">
                <input type="email" placeholder="Email or Phone"
                       className="w-full p-2 border border-black "
                />
            </div>

            <div className="relative flex items-center border border-black m-2 focus-within:outline-blue-500">
                <input type="password" placeholder="Password"
                       className="w-full p-2 border-none pr-20"
                />
                <span className="absolute right-2 text-blue-700 font-semibold text-sm hover:rounded-full hover:bg-blue-200 p-1">show</span>
            </div>
            <button className="px-2">
                <span className="text-blue-700 font-semibold text-sm hover:rounded-lg p-1 hover:underline hover:bg-blue-200">Forgot password?</span>
            </button>
            <button className="block w-full bg-blue-500 text-white text-sm p-3 mt-4 mb-6 rounded-full hover:bg-blue-700">
                Sign in
            </button>
        </form>
    </section>
    )
}