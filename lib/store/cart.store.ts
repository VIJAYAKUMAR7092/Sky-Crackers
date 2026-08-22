import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  mrp: number;
  imageUrl?: string;
  packInfo?: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  lastAddedItem: CartProduct | null;
  isPopupOpen: boolean;
  hidePopup: () => void;
  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastAddedItem: null,
      isPopupOpen: false,
      hidePopup: () => set({ isPopupOpen: false }),
      
      addItem: (product: CartProduct, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (existingItem) {
            return {
              items: state.items.map(item => 
                item.product.id === product.id 
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              lastAddedItem: product,
              isPopupOpen: true
            };
          }
          
          return {
            items: [...state.items, { product, quantity }],
            lastAddedItem: product,
            isPopupOpen: true
          };
        });
      },
      
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId)
        }));
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item => 
            item.product.id === productId 
              ? { ...item, quantity }
              : item
          )
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      }
    }),
    {
      name: 'sky-crackers-cart',
    }
  )
);
