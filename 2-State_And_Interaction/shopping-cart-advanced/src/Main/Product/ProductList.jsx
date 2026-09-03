import ProductCard from './ProductCard'

function ProductList({setCartItems}) {
  const products = [
    {
      id: 1,
      name: 'Keyboard',
      price: 500000,
    },
    {
      id: 2,
      name: 'Mouse',
      price: 250000,
    },
    {
      id: 3,
      name: 'Monitor',
      price: 2000000,
    },
  ]

  return (
    <div style={{ marginTop: 8 }}>
      <h2>Products</h2>
      {
        products.map((product) => <ProductCard key={product.id} productId={product.id} name={product.name} price={product.price} setCartItems={setCartItems}/>)
      }
    </div>
  )
}

export default ProductList