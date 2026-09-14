import useProducts from '../hooks/useProducts';
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

function ProductList({ search, page, onPageChange, category, sortOption, onSelectedProductIdChange }) {
  const { products, loading, error, total } = useProducts(search);

  const filteredProducts =
    category.length > 0
      ? products.filter((product) => product.category === category)
      : products;
  const totalFilteredProducts = filteredProducts.length;

  const productsCopy =
    category.length > 0 ? [...filteredProducts] : [...products];
  const sortedProducts = productsCopy.sort((a, b) => {
    if (sortOption.by === "title") {
      return sortOption.order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }

    if (sortOption.order === "desc") return b[sortOption.by] - a[sortOption.by];

    return a[sortOption.by] - b[sortOption.by];
  });

  const paginatedProducts = sortedProducts.slice((page - 1) * 10, page * 10);

  return (
    <>
      {search.length < 1 && !loading && products.length === 0 && (
        <p>Search for Products</p>
      )}
      {loading && <p>Searching Products...</p>}
      {error && <p>{error}</p>}
      {search.length > 0 && !loading && !error && products.length === 0 && (
        <p>No products found</p>
      )}
      <div id="products-container">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectedProductIdChange={onSelectedProductIdChange}
          />
        ))}
      </div>
      {search.length >= 0 && !loading && products.length > 0 && (
        <Pagination
          page={page}
          onPageChange={onPageChange}
          total={category.length > 0 ? totalFilteredProducts : total}
        />
      )}
    </>
  );
}

export default ProductList;
