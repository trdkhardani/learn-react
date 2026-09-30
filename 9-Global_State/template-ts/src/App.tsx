import { useState } from "react";
import { create } from "zustand";
import "./App.css";

type CartItem = {
  productId: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (productId) => {
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
      // const product = state.items.find((item) => item.productId === productId);

      return {
        items: state.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity }
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

function App() {
  // const [count, setCount] = useState(0)

  return <></>;
}

export default App;
