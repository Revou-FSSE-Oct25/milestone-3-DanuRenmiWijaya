import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/components/types"
import Image from "next/image";


const product: ProductType = {
    id: 1,
    name: "Adidas CoreFit T-Shirt",
    shortDescription: "Lorem ipsum...",
    description: "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 39.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
}; 

export const generateMetadata = async () => {
    return {
      title: product.name,
      description: product.description, 
    }
}

const ProductPage = async ({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ color?: string; size?: string }>;
}) => {
    
    const { id } = await params;
    const { size, color } = await searchParams;

    const selectedSize = size || product.sizes[0];
    const selectedColor = (color || product.colors[0]) as keyof typeof product.images;

    return (
        <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
            {/* IMAGE SECTION */}
            <div className="w-full lg:w-5/12 relative aspect-[2/3]">
                <Image 
                    src={product.images[selectedColor]} 
                    alt={product.name} 
                    fill 
                    
                    priority 
                    
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain rounded-md"
                />
            </div>

            {/* CONTENT SECTION */}
            <div className="w-full lg:w-7/12 flex flex-col gap-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <h2 className="text-2xl font-semibold text-black">${product.price.toFixed(2)}</h2>
                
                <ProductInteraction 
                    product={product} 
                    selectedSize={selectedSize} 
                    selectedColor={selectedColor}
                />

                {/* PAYMENT LOGOS */}
                <div className="flex items-center gap-3 mt-6 p-4 bg-gray-50 rounded-lg">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Secure Payment:</span>
                    <Image src="/klarna.png" alt="klarna" width={40} height={20} className="grayscale hover:grayscale-0 transition-all"/>
                    <Image src="/cards.png" alt="cards" width={40} height={20} className="grayscale hover:grayscale-0 transition-all"/>
                    <Image src="/stripe.png" alt="stripe" width={40} height={20} className="grayscale hover:grayscale-0 transition-all"/>
                </div>

                <p className="text-gray-400 text-[10px] mt-2 leading-tight">
                    By clicking Pay Now, you agree to our{" "}
                    <span className="underline cursor-pointer hover:text-black">Terms & Conditions</span>{" "}
                    and <span className="underline cursor-pointer hover:text-black">Privacy Policy</span>.
                </p>
            </div>
        </div>
    )
}

export default ProductPage;
