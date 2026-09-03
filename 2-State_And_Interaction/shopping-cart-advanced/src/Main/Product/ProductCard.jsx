function ProductCard({productId, name, price, setCartItems}) {
  const firstItem = {
    productCartId: `product-${productId}_${+new Date()}`,
    productId,
    name,
    price,
    quantity: 1
  }

  const handleAddItemToCart = () => {
    setCartItems(cartItems => ([...cartItems, firstItem]))
    const addToCartButton = document.getElementById(`add-to-cart-btn__product-${productId}`)
    addToCartButton.setAttribute('disabled', true)
    addToCartButton.innerText = 'In Cart'
  }

  return (
    <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
      <p>{name}</p>
      <p>{new Intl.NumberFormat('en-US', { currency: 'IDR', style: 'currency' }).format(price)}</p>
      <button id={`add-to-cart-btn__product-${productId}`} onClick={handleAddItemToCart}>Add</button>
    </div>
  )
}

export default ProductCard