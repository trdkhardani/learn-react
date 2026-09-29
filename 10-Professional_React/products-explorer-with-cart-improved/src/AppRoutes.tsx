import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
// import ProductExplorer from "./pages/ProductExplorer";
import UserProfile from "./pages/Profile";
import Cart from './pages/Cart';
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";

const ProductExplorer = lazy(() => import("./pages/ProductExplorer"));
// const Cart = lazy(() => import("./pages/Cart"));

function AppRoutes() {
  return (
    <Suspense fallback={<div>Switching...</div>}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductExplorer />} />
          {/* <Route path="products/:productId" element={<ProductDetail />} /> */}
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
