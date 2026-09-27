import { useState } from "react";
import useProduct from "../../../hooks/useProduct";
import ProductReview from "./ProductReview";
import ProductDetailStructure from './ProductDetailStructure';

function ProductDetail({
  productId,
  onDetailModalOpen,
}: {
  productId: string;
  onDetailModalOpen: (isOpen: boolean) => void;
}) {
  const [reviewsToggle, setReviewsToggle] = useState(false);
  const { status, product, errorMsg } = useProduct(productId!);

  return (
    <>
      {status === "loading" && <ProductDetailStructure onDetailModalOpen={onDetailModalOpen} />}
      {/* {status !== "loading" && (
        <button onClick={() => status === "error" ? navigate('/') : navigate(-1)}>{status === "error" ? 'Back To Home' : 'Back'}</button>
      )} */}
      {status === "error" && <p>{errorMsg}</p>}
      {status === "success" && (
        <div id="product-detail" className="modal" hidden={true}>
          <button
            style={{ width: "fit-content" }}
            onClick={() => onDetailModalOpen(false)}
          >
            X
          </button>
          <h2>Product Details</h2>
          <p>
            <img src={product.thumbnail} alt={product.title} />{" "}
          </p>
          <h3>{product.title}</h3>
          <p>{product.category}</p>
          <p>${product.price}</p>
          <p>&#11088; {product.rating}</p>
          <p>{product.availabilityStatus}</p>
          <p>Stock: {product.stock}</p>
          <p>Warranty Information: {product.warrantyInformation}</p>
          <p>Shipping Information: {product.shippingInformation}</p>
          <button onClick={() => setReviewsToggle(!reviewsToggle)}>
            {reviewsToggle ? "Hide Reviews" : "See Reviews"}
          </button>
          {product.reviews.map((review) => (
            <ProductReview review={review} reviewsToggle={reviewsToggle} />
          ))}
        </div>
      )}
    </>
  );
}

export default ProductDetail;
