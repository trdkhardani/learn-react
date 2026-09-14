import useProduct from '../hooks/useProduct';

function ProductDetail({ productId, onSelectedProductIdChange }) {
  const { product, loading, error } = useProduct(productId);
  return (
    <>
      <h1>Product Details</h1>
      {loading && "Loading Product..."}
      {!loading && (
        <button onClick={() => onSelectedProductIdChange(null)}>Back</button>
      )}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div id="product-detail">
          <p>
            <img src={product.thumbnail} alt={product.title} />{" "}
          </p>
          <h2>{product.title}</h2>
          <p>{product.category}</p>
          <p>${product.price}</p>
          <p>&#11088; {product.rating}</p>
          <p>{product.availabilityStatus}</p>
          <p>Stock: {product.stock}</p>
          <p>Warranty Information: {product.warrantyInformation}</p>
          <p>Shipping Information: {product.shippingInformation}</p>
        </div>
      )}
    </>
  );
}

export default ProductDetail