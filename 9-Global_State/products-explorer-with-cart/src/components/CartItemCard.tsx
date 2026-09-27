// import { useCartStore } from '../stores/useCartStore';
import { useCartStore } from '../stores/useCartStore';
import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';

function CartItemCard({cartItem, product}: {cartItem: CartItem, product: Product}) {
  // const cartItems = useCartStore((state) => state.items);
  // const individualQuantity = cartItems.find((cartItem) => cartItem.productId)?.quantity;
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const deleteCartItem = useCartStore((state) => state.removeItem);
  return (
    // <>
    <div className="cart-item-card">
      <div className="cart-item-details-container">
        <div className="cart-item-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="card-item-info">
          <p>{product.title}</p>
          <p>${`${product.price} each`}</p>
          <div className="quantity-control">
            <button onClick={() => cartItem.quantity === 1 ? deleteCartItem(cartItem.productId) : updateQuantity(cartItem.productId, -1)}>-</button>
            <p>{cartItem.quantity}</p>
            <button onClick={() => updateQuantity(cartItem.productId, 1)}>+</button>
          </div>
          <button onClick={() => deleteCartItem(cartItem.productId)}>Delete</button>
        </div>
      </div>
      <p className="subtotal-price">Subtotal: ${(cartItem.quantity * product.price).toFixed(2)}</p>
    </div>
    // </>
  );
}

export default CartItemCard;
