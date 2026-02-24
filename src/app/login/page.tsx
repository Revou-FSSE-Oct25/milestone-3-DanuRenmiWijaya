"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z.string().min(1, "Email harus diisi").email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const login = useAuthStore((state: any) => state.login);
  const router = useRouter();

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log("Data login:", data);
      
      await new Promise((res) => setTimeout(res, 1000)); 

      login({ 
        email: data.email, 
        name: "User RevoU" 
      });

      toast.success("Login Berhasil!");
      router.push("/");
    } catch (error) {
      toast.error("Login Gagal, periksa email/password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full max-w-sm space-y-4 bg-white p-8 rounded-lg shadow-sm"
      >
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input 
            {...register("email")} 
            placeholder="contoh@mail.com" 
            className={`w-full p-2 border rounded outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <input 
            {...register("password")} 
            type="password" 
            placeholder="••••••" 
            className={`w-full p-2 border rounded outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {isSubmitting ? "Memproses..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
