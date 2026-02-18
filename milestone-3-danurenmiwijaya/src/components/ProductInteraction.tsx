"use client"

import { Minus, Plus, PlusIcon, ShoppingCart } from "lucide-react";
import { ProductType } from "./types"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
    return (
        <div className="flex flex-col gap-4 mt-4">
            {/* SIZE SELECTION */}
            <div className="flex flex-col gap-2 text-xs">
                <span className="text-gray-500 font-semibold uppercase">Size</span>
                <div className="flex items-center gap-2">
                    {product.sizes.map(size => (
                        <div 
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
                        </div>
                    ))}
                </div>
            </div>

            {/* COLOR SELECTION */}
            <div className="flex flex-col gap-2 text-xs">
                <span className="text-gray-500 font-semibold uppercase">Color</span>
                <div className="flex items-center gap-2">
                    {product.colors.map(color => (
                        <div 
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
                <div className="flex flex-col gap-2 text-xs">
                    <span className="text-gray-500 font-semibold uppercase">Quantity</span>
                    <div className="flex items-center gap-2">
                        <button className="cursor-pointer border-1 border-gray-300 p-1" onClick={()=>handleQuantityChange("decrement")}>
                            <Minus className="w-4 h-4"/>
                        </button>
                        <span>{quantity}</span>
                        <button className="cursor-pointer border-1 border-gray-300 p-1" onClick={()=>handleQuantityChange("increment")}>
                            <Plus className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
                <button className="w-full bg-white text-black border border-black py-3 rounded-md hover:bg-gray-50 transition-all flex items-center justify-center gap-2 font-medium cursor-pointer border">
                <PlusIcon className="w-5 h-5"/>
                Add to Cart
                </button>
                <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-all flex items-center justify-center gap-2 font-medium cursor-pointer border">
                <ShoppingCart className="w-5 h-5"/>
                Buy this Item
                </button>
            </div>

        </div>
    )
}

export default ProductInteraction
