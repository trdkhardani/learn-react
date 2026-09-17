type Product = {
id: number;
title: string;
price: number;
};

type ProductListProps = {
products: Product[];
onSelect: (product: Product) => void;
emptyMessage?: string;
};

function FinalExercise({products, onSelect, emptyMessage}: ProductListProps) {
  if (products.length === 0) {
    if (!emptyMessage)
      return <p>No products found.</p>

    return <p>{emptyMessage}</p>
  }

  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <button onClick={() => onSelect(product)}>
              {product.title} - ${product.price}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default FinalExercise