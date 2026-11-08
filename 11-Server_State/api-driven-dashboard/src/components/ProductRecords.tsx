import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { editProduct, fetchProducts } from "../api/products";
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
  } = useQuery({
    queryKey: ["productRecords", page],
    queryFn: () => fetchProducts(page),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });

  // const markSoldOut = async (productId: number) => {
  //   await editProduct(productId, { stock: 0 });
  // }

  // const mutation = useMutation({
  //   mutationFn: markSoldOut,
    
  // });

  return (
    <>
    {/* {console.log(productRecords)} */}
      <h2>Products</h2>
      {(isPending || isFetching) && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      <div id="product-records" className="products-container">
        {productRecords?.products.map((product) => (
          <ProductCard key={product.id} product={product} page={page} />
        ))}
      </div>
      <Pagination
        page={page}
        onPageChange={setPage}
        total={productRecords?.total}
      />
    </>
  );
}

export default ProductRecords;
