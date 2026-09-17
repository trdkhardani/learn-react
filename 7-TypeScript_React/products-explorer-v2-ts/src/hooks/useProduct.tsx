import { useEffect, useState } from 'react';
import { fetchProductById } from '../api/products';
import type { Product } from '../types/product';

type State = {
  status: "loading";
} | {
  status: "success";
  product: Product;
} | {
  status: "error";
  message: string;
}

function useProduct(productId: string) {
  const [state, setState] = useState<State>()

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setState({
          status: "loading"
        })

        const data = await fetchProductById(productId, controller.signal);
        setState({
          status: "success",
          product: data
        })
      } catch(err: unknown) {
        if (controller.signal.aborted) return;

        if (err instanceof Error) {
          setState({
            status: "error",
            message: err.message
          })
        }
        console.error(err)
      }
    })()

    return () => {
      controller.abort();
    }
  }, [productId])

  return {
    status: state?.status,
    product: state?.status === "success" ? state.product : {} as Product,
    errorMsg: state?.status === "error" ? state.message : "",
    // loading: state?.status === "loading",
  }
}

export default useProduct;