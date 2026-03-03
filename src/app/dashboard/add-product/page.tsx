"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ProductForm {
  name: string;
  price: number;
  stock: number;
  description: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ProductForm>();

  const onSubmit = async (data: ProductForm) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Gagal menambah produk");

      toast.success("Produk berhasil ditambahkan!");
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-black">Add Product</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input 
            {...register("name", { required: true })}
            type="text" 
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" 
            placeholder="Contoh: Kaos Polos" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input 
              {...register("price", { required: true, valueAsNumber: true })}
              type="number" 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" 
              placeholder="0" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input 
              {...register("stock", { required: true, valueAsNumber: true })}
              type="number" 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" 
              placeholder="0" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            {...register("description")}
            className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none text-black" 
            placeholder="Deskripsi produk..."
          ></textarea>
        </div>

        <div className="flex gap-3 pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold transition disabled:bg-blue-300"
          >
            {isSubmitting ? "Saving..." : "Add Product"}
          </button>
          <button 
            type="button" 
            onClick={() => router.back()}
            className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition text-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
