const BASE_URL = "https://fakestoreapi.com";

export const apiService = {
  
  getProducts: async () => {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error("Gagal mengambil produk");
    return res.json();
  },

  
  getProductById: async (id: string | number) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Produk tidak ditemukan");
    return res.json();
  },

  
  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/products/categories`);
    return res.json();
  },

  
  login: async (credentials: any) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error("Username atau Password salah");
    return res.json();
  }
};
