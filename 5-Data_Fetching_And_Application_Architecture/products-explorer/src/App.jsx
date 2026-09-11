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
  const [category, setCategory] = useState("all");
  const [productCategories, setProductCategories] = useState([]);
  const [sort, setSort] = useState("all");
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const categories = await fetchProductCategories()
        setProductCategories(categories)
      } catch(err) {
        console.error(err)
      }
    })()
  }, [])

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        setProducts([]);

        if (search.length < 1) return;

        const data = await fetchProducts({
          search,
          page,
          category,
          signal: controller.signal,
        });
        setProducts(data.products);
        setTotal(data.total);
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
  }, [search, page, category]);

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
        <select value={category} name="category-dropdown" id="category-dropdown" onChange={(ev) => setCategory(ev.target.value)}>
          <option value="all">All</option>
          {
            productCategories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)
          }
        </select>
        {console.log(category)}
        {search.length < 1 && !loading && products.length === 0 && (
          <p>Search for Products</p>
        )}
        {loading && <p>Searching Products...</p>}
        {error && <p>{error}</p>}
        {search.length > 0 && !loading && !error && products.length === 0 && (
          <p>No products found</p>
        )}
        <div id="products-container">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {search.length > 0 && !loading && products.length > 0 && (
          <PageHandler page={page} onPageChange={setPage} total={total} />
        )}
      </main>
    </>
  );
}

export default App;
