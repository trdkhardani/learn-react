import { useEffect, useState } from 'react';
import CartItemCard from '../components/CartItemCard';
import { useCartStore } from '../stores/useCartStore';
import type { Product } from '../types/product';
import { fetchProductById } from '../api/products';

type State = {
  status: "loading";
} | {
  status: "success";
  products: Product[];
} | {
  status: "error";
  message: string;
}

function Cart() {
  const cartItems = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const [state, setState] = useState<State>()

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setState({status: "loading"})

        const products = await Promise.all(
          cartItems.map((item) => fetchProductById(String(item.productId), controller.signal))
        )

        setState({
          status: "success",
          products,
        })
      } catch(err) {
        if (controller.signal.aborted) return;

        if (err instanceof Error) {
          setState({
            status: "error",
            message: err.message,
          });
        }
      }
    })()

    return () => {
      controller.abort();
    }
  }, [])

  let totalItems  = 0;
  let totalPrice  = 0;
  for (const cartItem of cartItems) {
    totalItems += cartItem.quantity;
  }

  if (state?.status === "success") {
    for (const cartItem of cartItems) {
      const subtotal = cartItem.quantity * state.products.find((product) => product.id === cartItem.productId)!.price;
      totalPrice += subtotal;
    }
  }
  return (
    <>
      <h1>Cart</h1>
      <div id="cart-items-box">
        <div id="cart-items-container">
          {state?.status === "loading" && <p>Loading Cart...</p>}
          {state?.status === "success" && cartItems.map((item) => <CartItemCard key={item.productId} cartItem={item} product={state.products.find((product) => product.id === item.productId)!} />)}
        </div>
        <div id="cart-items-totals">
          <p>{`Total (${totalItems} items)`}</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <button onClick={() => clearCart()}>Clear Cart</button>
      </div>
    </>
  );
}

export default Cart;
