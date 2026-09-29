import { lazy, Suspense, useState } from "react";
import useProduct from "../../../hooks/useProduct";
// import ProductReview from "./ProductReview";
const ProductReview = lazy(() => import("./ProductReview"))
// import ProductDetailStructure from './ProductDetailStructure';

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
      {/* {status === "loading" && <ProductDetailStructure onDetailModalOpen={onDetailModalOpen} />} */}
      {/* {status !== "loading" && (
        <button onClick={() => status === "error" ? navigate('/') : navigate(-1)}>{status === "error" ? 'Back To Home' : 'Back'}</button>
      )} */}
      {status === "error" && <p>{errorMsg}</p>}
      {status === "success" && (
        <dialog id="product-detail" className="modal">
          <button
            aria-label={`Close ${product.title} details menu`}
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
          <button
            aria-label={`Toggle ${product.title} reviews`}
            onClick={() => setReviewsToggle(!reviewsToggle)}
          >
            {reviewsToggle ? "Hide Reviews" : "See Reviews"}
          </button>
          {reviewsToggle &&
            product.reviews.map((review, index) => (
              <Suspense fallback={<p>Loading Reviews...</p>}>
                <ProductReview
                  key={index}
                  review={review}
                  // reviewsToggle={reviewsToggle}
                />
              </Suspense>
            ))}
        </dialog>
      )}
    </>
  );
}

export default ProductDetail;
