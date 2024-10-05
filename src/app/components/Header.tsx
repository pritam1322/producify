'use client'; // Enables client-side rendering

import { useEffect, useState } from "react";
import { faBolt, faCartShopping, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Header() {
    const { data: session } = useSession(); // Client-side session fetching
    
    return (
        <header className="flex justify-between sm:px-16 md:px-64 bg-gray-200 p-2 items-center">
            <div className="flex gap-16">
                <nav className="flex gap-2 text-lg font-semibold items-center">
                    <FontAwesomeIcon icon={faBolt} className="h-5" />
                    <Link href="/">Producify</Link>
                </nav>
                <nav className="flex gap-4 text-lg font-semibold items-center">
                    <Link href="/allproducts">Items</Link>
                </nav>
                <nav className="flex gap-2 text-lg font-semibold items-center">
                    <FontAwesomeIcon icon={faCartShopping} className="h-4" />
                    <Link href="/cart">Cart</Link>
                </nav>
            </div>
            <div>
                {!session && (
                    <nav className="flex gap-10 items-center">
                        <Link href="/" className="hover:underline">About</Link>
                        <div className="flex gap-2 items-center hover:underline">
                            <FontAwesomeIcon icon={faRightToBracket} className="h-4" />
                            <Link href="/login">Login</Link>
                        </div>
                    </nav>
                )}
                {!!session && (
                    <div className="flex gap-8 items-center">
                        Hello, {session?.user?.name}
                        <LogoutButton />
                    </div>
                )}
            </div>
        </header>
    );
}
