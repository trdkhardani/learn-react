// import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import ProductExplorer from "./pages/ProductExplorer";
// import ProductDetail from "./pages/ProductDetail";
import Navbar from "./Navbar";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import UserProfile from './pages/Profile';
import Login from './pages/LoginPage';

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
        {/* <div className='modal'>
          <h2>ey my g</h2>
        </div> */}
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductExplorer />} />
          {/* <Route path="products/:productId" element={<ProductDetail />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
