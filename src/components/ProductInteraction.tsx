"use client"

import { Minus, Plus, PlusIcon, ShoppingCart } from "lucide-react";
import { ProductType } from "./types"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";

const ProductInteraction = ({
    product,
    selectedSize,
    selectedColor
}:{
    product:ProductType;
    selectedSize:string;
    selectedColor:string;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [quantity,setQuantity] = useState(1)

    const {addToCart} = useCartStore()

    const handleTypeChange = (type: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(type, value);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleQuantityChange =(type:"increment" | "decrement")=>{
        if(type==="increment"){
            setQuantity(prev=>prev+1)
        }else{
            if(quantity>1){
             setQuantity(prev=>prev-1)   
            }
        }
    }

    const handleAddToCart = ()=>{
        addToCart({
            ...product,
            quantity,
            selectedColor,
            selectedSize,
        });
        toast.success("Product added to cart")
    }
    const isMissingSelection = !selectedSize || !selectedColor;

    return (
        <div className="flex flex-col gap-4 mt-4">
            {/* SIZE SELECTION */}
            <div className="flex flex-col gap-2 text-xs">
                <span className="text-gray-500 font-semibold uppercase">Size</span>
                <div className="flex items-center gap-2">
                    {product.sizes.map(size => (
                        <button // Gunakan button untuk aksesibilitas
                            key={size}
                            onClick={() => handleTypeChange("size", size)}    
                            className={`cursor-pointer border p-[2px] transition-all ${
                                selectedSize === size ? "border-black" : "border-gray-300"
                            }`} 
                        >
                            <div className={`w-8 h-8 text-[10px] font-bold flex items-center justify-center ${
                                selectedSize === size 
                                ? "bg-black text-white" 
                                : "bg-white text-black hover:bg-gray-100"
                            }`}>
                                {size.toUpperCase()}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* COLOR SELECTION */}
            <div className="flex flex-col gap-2 text-xs">
                <span className="text-gray-500 font-semibold uppercase">Color</span>
                <div className="flex items-center gap-2">
                    {product.colors.map(color => (
                        <button
                            key={color}
                            onClick={() => handleTypeChange("color", color)}
                            className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${
                                selectedColor === color ? "border-black" : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                            title={color}
                        />
                    ))}
                </div>
            </div>

            {/* QUANTITY - Dipindah keluar dari div Color */}
            <div className="flex flex-col gap-2 text-xs">
                <span className="text-gray-500 font-semibold uppercase">Quantity</span>
                <div className="flex items-center gap-2">
                    <button 
                        className="cursor-pointer border border-gray-300 p-1 hover:bg-gray-100 disabled:opacity-50" 
                        onClick={() => handleQuantityChange("decrement")}
                        disabled={quantity <= 1}
                    >
                        <Minus className="w-4 h-4"/>
                    </button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <button 
                        className="cursor-pointer border border-gray-300 p-1 hover:bg-gray-100" 
                        onClick={() => handleQuantityChange("increment")}
                    >
                        <Plus className="w-4 h-4"/>
                    </button>
                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-3 mt-6">
                <button 
                    onClick={handleAddToCart} 
                    disabled={isMissingSelection}
                    className="w-full bg-white text-black border border-black py-3 rounded-md hover:bg-gray-50 transition-all flex items-center justify-center gap-2 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <PlusIcon className="w-5 h-5"/>
                    Add to Cart
                </button>
                <button 
                    disabled={isMissingSelection}
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-all flex items-center justify-center gap-2 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ShoppingCart className="w-5 h-5"/>
                    Buy this Item
                </button>
                {isMissingSelection && (
                    <p className="text-[10px] text-red-500 italic">* Please select size and color</p>
                )}
            </div>
        </div>
    )
}

export default ProductInteraction
