import { jest } from '@jest/globals';

export const apiService = {
  getProducts: jest.fn<() => Promise<any>>().mockResolvedValue([
    {
      id: 1,
      title: "Produk Mock 1",
      description: "Deskripsi mock yang sangat panjang sekali untuk mengetes fungsi substring 80 karakter...",
      price: 10000,
      category: "elektronik",
      image: "/mock-image.png"
    },
    {
      id: 2,
      title: "Produk Mock 2",
      description: "Deskripsi pendek",
      price: 20000,
      category: "pakaian",
      image: "/mock-image-2.png"
    }
  ]),
  login: jest.fn<() => Promise<any>>().mockResolvedValue({ token: "fake-token" }),
};
