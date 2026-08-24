import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartProduct } from './cart.store'; // reuse type

interface WishlistStore {
  items: CartProduct[];
  isOpen: boolean;
  toggleWishlist: (product: CartProduct) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setIsOpen: (isOpen: boolean) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toggleWishlist: (product) => {
        const { items } = get();
        const exists = items.find((item) => item.id === product.id);
        if (exists) {
          set({ items: items.filter((item) => item.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },
      removeFromWishlist: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
      setIsOpen: (isOpen) => set({ isOpen }),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
