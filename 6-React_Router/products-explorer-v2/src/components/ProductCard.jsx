import { Link } from "react-router-dom";

function ProductCard({ product }) {
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
      {/* <button className="view-detail-btn"> */}
        <Link className='view-detail-btn' to={`/products/${product.id}`}>View Detail</Link>
      {/* </button> */}
    </div>
  );
}

export default ProductCard;
