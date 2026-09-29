export type CartItem = {
  productId: number;
  quantity: number;
};

export type CartStore = {
  items: CartItem[];
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};