"use client";

import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"
import { Bell, Home, User } from "lucide-react" 
import ShoppingCarticon from "./ShoppingCarticon"
import { useAuthStore } from "@/stores/useAuthStore";
 

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuthStore();

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
                            <span>{user?.name}</span>
                        </div>
                        <button 
                            onClick={() => logout()}
                            className="text-xs text-red-500 hover:underline"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link 
                        href="/login" 
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-all"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar
