import { BrowserRouter, Routes, Route, Link, useParams, useSearchParams } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <button>
      <Link style={{ textDecoration: "none", color: "white", width: "auto", border: "1px solid red", boxSizing: "border-box" }} to="/">Home</Link>
      </button>
      <Link to="/products">Products</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search')
  setSearchParams({
    search
  })
  return <h1>Products {search && `(Search: ${search})`}</h1>;
}

function ProductsWildcard() {
  return <h1>Products Wildcard</h1>;
}

function ProductById() {
  const { productId } = useParams()
  return <h1>Product {`${productId}`}</h1>;
}

function About() {
  return <h1>About</h1>;
}

function NotFound() {
  return <h1>Page Not Found</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/products/*" element={<ProductsWildcard />} />
        <Route path="/product/:productId" element={<ProductById />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
