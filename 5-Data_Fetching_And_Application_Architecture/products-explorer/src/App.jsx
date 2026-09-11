import { useEffect, useState } from "react";
import "./App.css";
import { fetchProductCategories, fetchProducts } from "./api/products";

function ProductCard({ product }) {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [sortOption, setSortOption] = useState({ by: "", order: "asc" });
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

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

  // const filteredProducts =
  //   sortOption.by.length > 0
  //     ? [...sortedProducts].filter((product) => product.category === category)
  //     : [...products].filter((product) => product.category === category);
  const filteredProducts =
    category.length > 0
      ? products.filter((product) => product.category === category)
      : products;
  const totalFilteredProducts = filteredProducts.length;

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption.by === "title") {
      return sortOption.order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }

    if (sortOption.order === "desc") return b[sortOption.by] - a[sortOption.by];

    return a[sortOption.by] - b[sortOption.by];
  });

  return (
    <>
      <h1>Products Explorer</h1>
      <main>
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
          {category.length > 0
            ? filteredProducts
                .slice((page - 1) * 10, page * 10)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            : sortedProducts
                .slice((page - 1) * 10, page * 10)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
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
