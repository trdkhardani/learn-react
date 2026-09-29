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
    <div className="cart-item-card" data-testid={`cart-item-card-${product.id}`}>
      <div className="cart-item-details-container">
        <div className="cart-item-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="card-item-info">
          <p>{product.title}</p>
          <p data-testid={`cart-item-card-product-price-${product.id}`}>${`${product.price} each`}</p>
          <div className="quantity-control">
            <button data-testid={`cart-item-card-reduce-quantity-button-${product.id}`} aria-label={`Reduce quantity for ${product.title}`} onClick={() => cartItem.quantity === 1 ? deleteCartItem(cartItem.productId) : updateQuantity(cartItem.productId, cartItem.quantity - 1)}>-</button>
            <p data-testid={`cart-item-card-product-quantity-${product.id}`}>{cartItem.quantity}</p>
            <button data-testid={`cart-item-card-add-quantity-button-${product.id}`} aria-label={`Add quantity for ${product.title}`} onClick={() => updateQuantity(cartItem.productId, cartItem.quantity + 1)}>+</button>
          </div>
          <button data-testid={`cart-item-card-delete-product-button-${product.id}`} aria-label={`Delete ${product.title} from Cart`} onClick={() => deleteCartItem(cartItem.productId)}>Delete</button>
        </div>
      </div>
      <p data-testid={`cart-item-card-product-subtotal-${product.id}`} className="subtotal-price">Subtotal: ${(cartItem.quantity * product.price).toFixed(2)}</p>
    </div>
    // </>
  );
}

export default CartItemCard;
