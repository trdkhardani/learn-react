import { useEffect, useState } from "react";
import "./App.css";
import { fetchProductCategories } from "./api/products";
import useProducts from "./hooks/useProducts";
import useProduct from "./hooks/useProduct";

function ProductDetail({ productId, onSelectedProductIdChange }) {
  const { product, loading, error } = useProduct(productId);
  return (
    <>
      {loading && "Loading Product..."}
      {!loading && (
        <button onClick={() => onSelectedProductIdChange(null)}>Back</button>
      )}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div id="product-detail">
          <p>
            <img src={product.thumbnail} alt={product.title} />{" "}
          </p>
          <h2>{product.title}</h2>
          <p>{product.category}</p>
          <p>${product.price}</p>
          <p>&#11088; {product.rating}</p>
          <p>{product.availabilityStatus}</p>
          <p>Stock: {product.stock}</p>
          <p>Warranty Information: {product.warrantyInformation}</p>
          <p>Shipping Information: {product.shippingInformation}</p>
        </div>
      )}
    </>
  );
}

function ProductCard({ product, onSelectedProductIdChange }) {
  return (
    <div className="product-card">
      <p>
        <img src={product.thumbnail} alt={product.title} />{" "}
      </p>
      <h2>{product.title}</h2>
      <p>{product.category}</p>
      <p>${product.price}</p>
      <p>&#11088; {product.rating}</p>
      <p>{product.availabilityStatus}</p>
      <button
        className="view-detail-btn"
        onClick={() => onSelectedProductIdChange(product.id)}
      >
        View Detail
      </button>
    </div>
  );
}

function PageHandler({ page, onPageChange, total }) {
  const totalPages = Math.ceil(total / 10); // 10 is the hardcoded limit
  return (
    <div id="page-handler">
      <button
        onClick={() => onPageChange((currentPage) => currentPage - 1)}
        disabled={page === 1 ? true : false}
      >
        Previous
      </button>
      <p>Page {page}</p>
      <button
        onClick={() => onPageChange((currentPage) => currentPage + 1)}
        disabled={page >= totalPages ? true : false}
      >
        Next
      </button>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [sortOption, setSortOption] = useState({ by: "", order: "asc" });
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const categories = await fetchProductCategories();
        setProductCategories(categories);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const { products, loading, error, total } = useProducts(search);

  const filteredProducts =
    category.length > 0
      ? products.filter((product) => product.category === category)
      : products;
  const totalFilteredProducts = filteredProducts.length;

  const productsCopy = category.length > 0 ? [...filteredProducts] : [...products]
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
      <h1>Products Explorer</h1>
      {selectedProductId && (
        <article>
          {selectedProductId && (
            <ProductDetail
              productId={selectedProductId}
              onSelectedProductIdChange={setSelectedProductId}
            />
          )}
        </article>
      )}
      <main hidden={selectedProductId ? true : false}>
        <label htmlFor="search">Search</label>
        <input
          value={search}
          type="text"
          onChange={(ev) => {
            setSearch(ev.target.value);
            setPage(1);
          }}
        />
        <label htmlFor="category-dropdown">Category</label>
        <select
          value={category}
          name="category-dropdown"
          id="category-dropdown"
          onChange={(ev) => {
            setCategory(ev.target.value);
            setPage(1);
          }}
        >
          <option value="">All</option>
          {productCategories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="sort-by">Sort By</label>
        <select
          value={sortOption.by}
          name="sort-by"
          id="sort-by"
          onChange={(ev) => {
            setSortOption((sortOption) => ({
              ...sortOption,
              by: ev.target.value,
            }));
            setPage(1);
          }}
        >
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="title">Title</option>
          <option value="rating">Rating</option>
        </select>
        {sortOption.by.length > 0 && (
          <span>
            <label htmlFor="order-by">Order</label>
            <select
              value={sortOption.order}
              name="order-by"
              id="order-by"
              onChange={(ev) => {
                setSortOption((sortOption) => ({
                  ...sortOption,
                  order: ev.target.value,
                }));
                setPage(1);
              }}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </span>
        )}
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
              onSelectedProductIdChange={setSelectedProductId}
            />
          ))}
        </div>
        {search.length >= 0 && !loading && products.length > 0 && (
          <PageHandler
            page={page}
            onPageChange={setPage}
            total={category.length > 0 ? totalFilteredProducts : total}
          />
        )}
      </main>
    </>
  );
}

export default App;
