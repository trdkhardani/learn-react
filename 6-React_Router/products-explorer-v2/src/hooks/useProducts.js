import { useEffect, useState } from "react";
import { fetchProducts } from '../api/products';

function useProducts(search) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        setProducts([]);

        // if (search.length < 1) return;

        const data = await fetchProducts({
          search,
          // page,
          // category,
          signal: controller.signal,
        });
        setProducts(data.products);
        setTotal(data.total);
        // if (category)
        //   setProducts([...data.products].filter((product) => product.category === category))
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [search]);

  return {
    products,
    loading,
    error,
    total,
  }
}

export default useProducts