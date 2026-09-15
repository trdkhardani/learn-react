import { useEffect, useState } from 'react';
import { fetchProductById } from '../api/products';

function useProduct(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null)
        setProduct({})

        const data = await fetchProductById(productId, controller.signal);
        setProduct(data);
      } catch(err) {
        if (controller.signal.aborted) return;
        setError(err)
        console.error(err)
      } finally {
        if (!controller.signal.aborted)
          setLoading(false)
      }
    })()

    return () => {
      controller.abort();
    }
  }, [productId])

  return {
    product,
    loading,
    error,
  }
}

export default useProduct;