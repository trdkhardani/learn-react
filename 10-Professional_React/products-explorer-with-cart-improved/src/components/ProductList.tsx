import { useSearchParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { memo, useMemo } from "react";
// import { useState } from 'react';

type SortKey = "title" | "price" | "rating";
type OrderKey = "asc" | "desc";

type ProductListProps = {
  onDetailModalOpen: (isOpen: boolean) => void;
  onProductIdForDetailChange: (productId: string) => void;
};

const ProductList = memo(
  ({ onDetailModalOpen, onProductIdForDetailChange }: ProductListProps) => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") ?? "";
    const page = Number(searchParams.get("page") ?? "1");
    const category = searchParams.get("category") ?? "";
    const sortParam = searchParams.get("sort") ?? "";
    const orderParam = searchParams.get("order") ?? "";

    const { status, products, errorMsg, total } = useProducts(search);

    const filteredProducts =
      category && category.length > 0
        ? products.filter((product) => product.category === category)
        : products;
    const totalFilteredProducts = filteredProducts.length;

    const productsCopy =
      category && category.length > 0 ? [...filteredProducts] : [...products];
    const sortedProducts =
      sortParam.length > 0
        ? productsCopy.sort((a, b) => {
            const sort = (["title", "price", "rating"] as const).includes(
              sortParam as SortKey,
            )
              ? (sortParam as SortKey)
              : "title";

            const order = (["asc", "desc"] as const).includes(
              orderParam as OrderKey,
            )
              ? (orderParam as OrderKey)
              : "asc";

            if (sort === "title") {
              return order === "asc"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title);
            }

            if (order === "desc") return b[sort] - a[sort];

            return a[sort] - b[sort];
          })
        : productsCopy;

    const totalProducts = category.length > 0 ? totalFilteredProducts : total;
    const paginatedProducts = useMemo(() => {
      return sortedProducts.slice((page - 1) * 10, page * 10);
    }, [page, sortedProducts])
    // const paginatedProducts = sortedProducts.slice((page - 1) * 10, page * 10);

    return (
      <>
        {search &&
          search.length < 1 &&
          status !== "loading" &&
          products.length === 0 && <p>Search for Products</p>}
        {status === "loading" && <p>Searching Products...</p>}
        {status === "error" && <p>{errorMsg}</p>}
        {search.length >= 0 &&
          status === "success" &&
          products.length === 0 && <p>No products found</p>}
        <div id="products-container" data-testid="products-container-element">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDetailModalOpen={onDetailModalOpen}
              onProductIdForDetailChange={onProductIdForDetailChange}
            />
          ))}
        </div>
        {status === "success" && products.length > 0 && (
          <Pagination page={page} total={totalProducts} />
        )}
      </>
    );
  },
);

// function ProductList({
//   onDetailModalOpen,
//   onProductIdForDetailChange,
// }: ProductListProps) {
// }

export default ProductList;
