function ItemList({productId, name, price, quantity, setCartItems}) {
  const handleRemoveItem = () => {
    setCartItems(cartItems => cartItems.filter((cartItem) => cartItem.productId !== productId))

    const addToCartButton = document.getElementById(`add-to-cart-btn__product-${productId}`)
    addToCartButton.disabled = false
    addToCartButton.innerText = 'Add'
  }

  const handleIncreaseItemQuantity = () => {
    setCartItems(cartItems => cartItems.map((cartItem) => cartItem.productId === productId ? {...cartItem, quantity: quantity + 1} : cartItem))
  }

  const handleDecreaseItemQuantity = () => {
    setCartItems(cartItems => cartItems.map((cartItem) => cartItem.productId === productId ? {...cartItem, quantity: Math.max(0, quantity - 1)} : cartItem))
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
      <p>{name}</p>
      <p>{new Intl.NumberFormat('en-US', { currency: 'IDR', style: 'currency' }).format(price)}</p>
      <button onClick={handleDecreaseItemQuantity}>-</button>
      <p>{quantity}</p>
      <button onClick={handleIncreaseItemQuantity}>+</button>
      <button onClick={handleRemoveItem}>Remove</button>
    </div>
  )
}

export default ItemList