"use client"

import Link from "next/link"
import { ProductType } from "./types"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import useCartStore from "@/stores/cartStore"
import { toast } from "react-toastify"


const ProductCard = ({ product, index }: { product: ProductType, index: number }) => {
    const [productsTypes, setProductTypes] = useState({
        size: product.sizes[0],
        color: product.colors[0]
    });

    const addToCart = useCartStore((state) => state.addToCart);

    const handleProductType = ({
        type,
        value
    }: {
        type: "size" | "color",
        value: string;
    }) => {
        setProductTypes(prev => ({
            ...prev,
            [type]: value,
        }));
    };

    const handdleAddToCart = () => {
        addToCart({
            ...product,
            quantity: 1,
            selectedSize: productsTypes.size,
            selectedColor: productsTypes.color,
        });
        toast.success("Product added to cart")
    };

    return (
       
        <div className='shadow-lg rounded-lg overflow-hidden'>
            <Link href={`/products/${product.id}`}>
                <div className='relative aspect-[2/3]'>
                    <Image
    src={product.images[productsTypes.color as keyof typeof product.images]}
    alt={product.name}
    fill
    
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    
   
    loading={index < 2 ? "eager" : "lazy"}
    
    
    {...(index < 2 ? { fetchPriority: "high" } : {})}

    className="object-cover hover:scale-105 transition-all duration-300"
/>
                </div>
            </Link>
            <div className='flex flex-col gap-4 p-4'>
                <h1 className="font-medium">{product.name}</h1>
                <p className="text-sm text-gray-500">{product.shortDescription}</p>

                <div className='flex items-center gap-4 text-xs'>
                    <div className='flex flex-col gap-1'>
                        <span className="text-gray-500">Size</span>
                        <select
                            name="size"
                            id="size"
                            className="ring ring-gray-300 rounded-md px-2 py-1 outline-none"
                            value={productsTypes.size}
                            onChange={e =>
                                handleProductType({ type: "size", value: e.target.value })}
                        >
                            {product.sizes.map(size => (
                                <option key={size} value={size}>{size.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <span className="text-gray-500">Color</span>
                        <div className='flex items-center gap-2'>
                            {product.colors.map(color => (
                                <div
                                    className={`cursor-pointer border ${productsTypes.color === color ? "border-black scale-110" : "border-gray-200"} rounded-full p-[1.2px] transition-all`}
                                    key={color}
                                    onClick={() =>
                                        handleProductType({ type: "color", value: color })}>
                                    <div
                                        className='w-[14px] h-[14px] rounded-full'
                                        style={{ backgroundColor: color }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between mt-auto'>
                    <p className="font-medium text-lg">${product.price.toFixed(2)}</p>
                    <button onClick={handdleAddToCart} className="ring-1 ring-gray-200 shadow-sm rounded-md px-3 py-1.5 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2 font-medium">
                        <ShoppingCart className="w-4 h-4" />
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
