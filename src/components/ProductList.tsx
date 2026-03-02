"use client"

import Categories from "./Categories";
import ProductCard from "./ProductCard"
import Link from "next/link";
import Filter from "./Filter";
import { useEffect, useState } from "react";
import { apiService } from "@/lib/api";
import { ProductType } from "./types";

const ProductList = ({ category, params }: { category: string; params: "homepage" | "products" }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getProducts();

      const mappedData: ProductType[] = data.map((item: any) => ({
        id: item.id,
        name: item.title,
        shortDescription: item.description.substring(0, 80) + "...",
        description: item.description,
        price: item.price,
        category: item.category,
        
        sizes: ["S", "M", "L", "XL"], 
        colors: ["black", "gray", "white"], 
        
        images: {
          black: item.image,
          gray: item.image,
          white: item.image
        }
      }));

      const filtered = category 
        ? mappedData.filter((p) => p.category === category) 
        : mappedData;

      setProducts(filtered);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [category]);



  if (loading) return <p>Product List...</p>;

  return (
    <div className='w-full'>
      <Categories />
      {params === "products" && <Filter />}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12'>
        {products.map((item, index) => (
          <ProductCard key={item.id} product={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
