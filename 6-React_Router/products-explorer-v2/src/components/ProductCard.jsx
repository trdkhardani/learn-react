function ProductCard({ product, onSelectedProductIdChange }) {
  return (
    <div className="product-card">
      <p>
        <img src={product.thumbnail} alt={product.title} />{" "}
      </p>
      <h2>{product.title}</h2>
      <p>{product.category}</p>
      <p>${product.price}</p>
      <p>&#11088; {product.rating}</p>
      <p>{product.availabilityStatus}</p>
      <button
        className="view-detail-btn"
        onClick={() => onSelectedProductIdChange(product.id)}
      >
        View Detail
      </button>
    </div>
  );
}

export default ProductCard