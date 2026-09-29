import type { Review } from '../../../types/product';

function ProductReview({review}: {review: Review}) {
  return (
    <div className='product-reviews'>
      <p><strong>{review.reviewerName}</strong></p>
      <p>{review.date}</p>
      <p>&#11088; {review.rating}</p>
      <p>{review.comment}</p>
    </div>
  )
}

export default ProductReview;