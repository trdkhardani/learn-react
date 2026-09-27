import { create } from 'zustand';
import type { CartStore } from '../types/cart';

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (productId) => {
    console.log('added to cart lhok ya')
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.productId === productId,
      );
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : { ...item },
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            productId,
            quantity: 1,
          },
        ],
      };
    });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    }));
  },
  updateQuantity: (productId, quantity) => {
    set((state) => {
      return {
        items: state.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      };
    });
  },
  clearCart: () => {
    set({
      items: [],
    });
  },
}));