import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import "./App.css";

function Main() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Keyboard',
      price: 500000,
      quantity: 0,
    },
    {
      id: 2,
      name: 'Mouse',
      price: 250000,
      quantity: 0
    },
  ])

  const handleQuantity = (operation, itemId) => {
    const itemsCopy = [...items]
    const item = itemsCopy.find((item) => item.id === itemId);

    if (operation === 'increase')
      item.quantity += 1
    else if (operation === 'decrease')
      item.quantity === 0 ? item.quantity : item.quantity -= 1
    else
      return alert('Invalid Operation')

    console.log(itemsCopy);
    setItems(itemsCopy);
  }

  const calculateItems = () => {
    let subtotal = 0
    let totalItems = 0
    for (const item of items) {
      subtotal += item.quantity * item.price
      totalItems += item.quantity
    }
    return {
      subtotal,
      totalItems
    }
  }

  return (
  <main>
    {
      items.map((item) => (
        <div style={{ display: 'flex', gap: 16 }} key={item.id}>
          <p>{item.name}</p>
          <p>{item.price}</p>
          <button onClick={() => handleQuantity('decrease', item.id)}>-</button>
          <p>{item.quantity}</p>
          <button onClick={() => handleQuantity('increase', item.id)}>+</button>
        </div>
      ))
    }
    <div>
      <p>Subtotal: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(calculateItems().subtotal)}</p>
      <p>Items: {calculateItems().totalItems}</p>
    </div>
  </main>
  );
}

function App() {
  return (
    <>
      <h1>Shopping Cart</h1>
      <Main />
    </>
  );
}

export default App;
