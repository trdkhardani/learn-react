import { useNavigate, useParams } from 'react-router-dom';
import useProduct from '../hooks/useProduct';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { status, product, errorMsg } = useProduct(productId!);

  return (
    <>
      <h1>Product Details</h1>
      {status === "loading" && "Loading Product..."}
      {status !== "loading" && (
        <button onClick={() => status === "error" ? navigate('/') : navigate(-1)}>{status === "error" ? 'Back To Home' : 'Back'}</button>
      )}
      {status === "error" && <p>{errorMsg}</p>}
      {status === "success" && (
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