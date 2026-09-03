import ProductList from './Product/ProductList'
import Cart from './Cart/Cart'
import { useState } from 'react'

function Main() {
  // object: productId, productCartId, name, price, quantity
  const [cartItems, setCartItems] = useState([]);

  return (
    <main>
      <ProductList setCartItems={setCartItems}/>
      <Cart cartItems={cartItems} setCartItems={setCartItems}/>
    </main>
  )
}

export default Main