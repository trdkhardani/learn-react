// import { useState } from 'react';

function ProductCard({ product }) {
  const priceFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })

  return (
    <div id={`product-${product.id}`} style={{ margin: 16 }}>
      <h2>{product.name}</h2>
      <p>{product.category}</p>
      <p>{priceFormatter.format(product.price)}</p>
      <button disabled={ !product.inStock }>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</button>
    </div>
  );
}

export default ProductCard;
