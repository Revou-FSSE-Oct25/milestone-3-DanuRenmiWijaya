"use client";

import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"
import { Bell, Home, User, LogOut } from "lucide-react" 
import ShoppingCarticon from "./ShoppingCarticon"
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session, status } = useSession();
    const isAuthenticated = status === "authenticated";

    return (
        <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4 px-4 md:px-8">
            <Link href="/" className="flex items-center gap-2">
                <Image 
                    src="/revou-logo.png" 
                    alt="RevoShop" 
                    width={36} 
                    height={36} 
                    className="w-6 h-6 md:w-9 h-auto"
                />
                <p className="hidden md:block text-md font-bold">ReVoShop</p>
            </Link>

            <div className="flex items-center gap-6">
                <SearchBar/>
                
                <Link href="/">
                    <Home className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors"/>
                </Link>

                <button className="relative">
                    <Bell className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors"/>
                </button>

                <ShoppingCarticon/>

                {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                            <User className="w-4 h-4" />
                            <span>{session?.user?.name}</span>
                        </div>
                        <button 
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors font-medium"
                        >
                            <LogOut className="w-3 h-3" />
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link 
                        href="/login" 
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar
