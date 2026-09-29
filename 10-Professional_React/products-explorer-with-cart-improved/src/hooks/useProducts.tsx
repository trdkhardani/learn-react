import { useEffect, useState } from "react";
import { fetchProducts } from '../api/products';
import type { Product } from '../types/product';

type State = {
  status: "loading";
} | {
  status: "success";
  products: Product[];
  total: number;
} | {
  status: "error";
  message: string;
}

function useProducts(search: string) {
  // const [products, setProducts] = useState<Product[]>([]);
  const [state, setState] = useState<State>()
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<{message: string;} | null>(null);
  // const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setState({
          status: "loading"
        })
        // setLoading(true);
        // setError(null);
        // setProducts([]);

        // if (search.length < 1) return;

        const data = await fetchProducts({
          search,
          signal: controller.signal,
        });
        setState({
          status: "success",
          products: data.products,
          total: data.total
        })
        // setProducts(data.products);
        // setTotal(data.total);
      } catch (err: unknown) {
        if (controller.signal.aborted) return;

        if (err instanceof Error) {
          setState({
            status: "error",
            message: err.message
          })
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [search]);

  return {
    status: state?.status,
    products: state?.status === "success" ? state.products : [],
    errorMsg: state?.status === "error" ? state.message : "",
    total: state?.status === "success" ? state.total : 0,
  }
}

export default useProducts