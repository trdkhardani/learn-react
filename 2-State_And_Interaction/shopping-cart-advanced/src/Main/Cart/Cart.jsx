import ItemList from "./ItemList";

function Cart({ cartItems, setCartItems }) {
  const aggregateCartItems = (action) => {
    if (action === 'calculateItems') {
      let totalItems = 0;
      for (const cartItem of cartItems) {
        totalItems += cartItem.quantity
      }
      return totalItems
    } else if (action === 'calculateSubtotal') {
      let subtotal = 0;
      for (const cartItem of cartItems) {
        subtotal += cartItem.quantity * cartItem.price
      }
      return subtotal;
    } else {
      throw console.error('Invalid Action')
    }
  }

  return (
    <>
      <div style={{ marginTop: 16 }}>
        <h2>Cart</h2>
        { cartItems.length < 1 ? <p>No products in Cart</p> : '' }
        {cartItems.map((cartItem) => (
          <ItemList key={cartItem.productCartId} productId={cartItem.productId} name={cartItem.name} price={cartItem.price} quantity={cartItem.quantity} setCartItems={setCartItems}/>
        ))}
      </div>

      <div hidden={cartItems.length < 1 ? true : false}>
        <p>Items: {aggregateCartItems('calculateItems')}</p>
        <p>Subtotal: {new Intl.NumberFormat('en-US', { currency: 'IDR', style: 'currency' }).format(aggregateCartItems('calculateSubtotal'))}</p>
      </div>
    </>
  );
}

export default Cart;
