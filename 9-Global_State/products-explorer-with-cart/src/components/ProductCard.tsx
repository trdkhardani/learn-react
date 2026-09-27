import { useCartStore } from '../stores/useCartStore';
import type { Product } from "../types/product";

type IndividualProduct = {
  product: Product;
  onDetailModalOpen: (isOpen: boolean) => void;
  onProductIdForDetailChange: (productId: string) => void;
};

function ProductCard({ product, onDetailModalOpen, onProductIdForDetailChange }: IndividualProduct) {
  const handleViewDetail = () => {
    onDetailModalOpen(true);
    onProductIdForDetailChange(String(product.id))
  }

  const addToCart = useCartStore((state) => state.addItem);

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
      <div className="product-card-buttons-wrapper">
        <button onClick={handleViewDetail}>View Detail</button>
        <button onClick={() => addToCart(product.id)}>Add To Cart</button>
      </div>
      {/* <ProductDetail productId={String(product.id)} /> */}
      {/* <Link className='view-detail-btn' to={`/products/${product.id}`}>View Detail</Link> */}
    </div>
  );
}

export default ProductCard;
