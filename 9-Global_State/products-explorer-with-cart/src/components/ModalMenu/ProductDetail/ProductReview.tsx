import type { Review } from '../../../types/product';

function ProductReview({review, reviewsToggle}: {review: Review, reviewsToggle: boolean}) {
  return (
    <div className='product-reviews' hidden={reviewsToggle}>
      <p><strong>{review.reviewerName}</strong></p>
      <p>{review.date}</p>
      <p>&#11088; {review.rating}</p>
      <p>{review.comment}</p>
    </div>
  )
}

export default ProductReview;