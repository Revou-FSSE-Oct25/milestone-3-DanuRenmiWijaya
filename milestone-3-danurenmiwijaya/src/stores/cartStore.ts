import { CartStoreActionsType, cartStoreStateType } from '@/components/types'
import { create } from 'zustand'

const useCartStore = create<cartStoreStateType & CartStoreActionsType>()((set) => ({
  cart: [],
  addToCart: (product) => set((state) => ({ cart: [...state.cart,product] })),
  removeFormCart: (product) => set((state) => ({ cart:  state.cart.filter(p=>p.id !== product.id) })),
  clearCart: ()=> set({cart: []}),
}));

export default useCartStore;
