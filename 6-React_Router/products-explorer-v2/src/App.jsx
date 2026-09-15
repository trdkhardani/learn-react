// import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import ProductExplorer from "./pages/ProductExplorer";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./Navbar";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";

function AppLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductExplorer />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
