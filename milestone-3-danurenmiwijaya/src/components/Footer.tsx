import Link from "next/link"
import Image from "next/image"

const Footer = () => {
    return(
        <div className='mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg'>
            <div className="flex flex-col gap-4 items-center md:items-start">
                <Link href="/" className="flex items-center">
            <img 
            src="/revou-logo.png" 
            alt="RevoShop" 
            width={36} 
            height={36} 
            className="w-6 h-6 md:w-9"
            />
            <p className="hidden md:block text-md font-medium text-white">ReVoShop</p>
            </Link>
            <p className="text-sm text-gray-400">2026 ReVoShop.</p>
            <p className="text-sm text-gray-400">By:Danu Renmi Wijaya</p>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className="text-sm text-am-50">Links</p>
                <Link href="/">Homepage</Link>
                <Link href="/">Contact</Link>
                <Link href="/">Term of Service</Link>
                <Link href="/">Privacy Policy</Link>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className="text-sm text-am-50">Links</p>
                <Link href="/">All Product</Link>
                <Link href="/">New Arrivals</Link>
                <Link href="/">Best Sellers</Link>
                <Link href="/">Sale</Link>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
                <p className="text-sm text-am-50">Links</p>
                <Link href="/">About</Link>
                <Link href="/">Contact</Link>
                <Link href="/">Blog</Link>
                <Link href="/">Affiliate Program</Link>
            </div>
        </div>
    )
}

export default Footer