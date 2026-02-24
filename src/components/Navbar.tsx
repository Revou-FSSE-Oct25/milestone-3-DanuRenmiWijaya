import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"
import { Bell, Home, ShoppingCart } from "lucide-react"
import ShoppingCarticon from "./ShoppingCarticon"

const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
            <Link href="/" className="flex items-center">
            <img 
            src="/revou-logo.png" 
            alt="RevoShop" 
            width={36} 
            height={36} 
            className="w-6 h-6 md:w-9"
            />
            <p className="hidden md:block text-md font-medium">ReVoShop</p>
            </Link>
            <div className=" flex items-center gap-6">
                <SearchBar/>
                <Link href="/">
                <Home className="w-4 h-4 text-gray-600"/>
                </Link>
                <Bell className="w-4 h-4 text-gray-600"/>
                <ShoppingCarticon/>
                <Link href="/login">Sing in</Link>
            </div>
        </nav>
    )
}

export default Navbar