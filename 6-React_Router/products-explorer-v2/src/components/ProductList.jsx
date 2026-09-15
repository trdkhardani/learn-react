import { useSearchParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

function ProductList() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const category = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const order = searchParams.get("order") ?? "";

  const { products, loading, error, total } = useProducts(search);

  const filteredProducts =
    (category && category.length > 0)
      ? products.filter((product) => product.category === category)
      : products;
  const totalFilteredProducts = filteredProducts.length;

  const productsCopy =
    (category && category.length > 0) ? [...filteredProducts] : [...products];
  const sortedProducts = productsCopy.sort((a, b) => {
    if (sort === "title") {
      return order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }

    if (order === "desc") return b[sort] - a[sort];

    return a[sort] - b[sort];
  });

  const totalProducts = category.length > 0 ? totalFilteredProducts : total;
  const paginatedProducts = sortedProducts.slice((page - 1) * 10, page * 10);

  return (
    <>
      {(search && search.length < 1) && !loading && products.length === 0 && (
        <p>Search for Products</p>
      )}
      {loading && <p>Searching Products...</p>}
      {error && <p>{error}</p>}
      {(search && search.length >= 0) && !loading && !error && products.length === 0 && (
        <p>No products found</p>
      )}
      <div id="products-container">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      { !loading && products.length > 0 && (
        <Pagination
          page={page}
          total={totalProducts}
        />
      )}
    </>
  );
}

export default ProductList;
