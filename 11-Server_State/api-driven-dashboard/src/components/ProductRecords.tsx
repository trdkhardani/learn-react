import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

function ProductRecords() {
  const [page, setPage] = useState(1);

  const {
    data: productRecords,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["productRecords", page],
    queryFn: ({ signal }) => fetchProducts(page, signal),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });

  return (
    <>
      {/* {console.log(productRecords)} */}
      <h2>Products</h2>
      {(isPending) && <p>Loading Products...</p>}
      {!isPending && isFetching && (<p>Refreshing Products...</p>)}
      {isError && <p>{error.message}</p>}
      <button
        type="button"
        onClick={() => {
          refetch();
        }}
      >
        Refresh
      </button>
      <div id="product-records" className="products-container">
        {productRecords?.products.map((product) => (
          <ProductCard key={product.id} product={product} page={page} />
        ))}
      </div>
      <Pagination
        page={page}
        onPageChange={setPage}
        total={productRecords?.total ?? 0}
      />
    </>
  );
}

export default ProductRecords;
