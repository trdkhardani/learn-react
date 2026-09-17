import { Link } from "react-router-dom";
import type { Product } from '../types/product';

type IndividualProduct = {
  product: Product
}

function ProductCard({ product }: IndividualProduct) {
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
      <Link className='view-detail-btn' to={`/products/${product.id}`}>View Detail</Link>
    </div>
  );
}

export default ProductCard;
