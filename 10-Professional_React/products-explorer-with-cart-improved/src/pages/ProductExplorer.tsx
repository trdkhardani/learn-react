import { lazy, Suspense, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import SortControl from "../components/SortControl";
import type { Category } from "../types/category";
// import ProductDetail from '../components/ModalMenu/ProductDetail/ProductDetail';
import ErrorBoundary from "../components/ErrorBoundary";
import ProductDetailStructure from '../components/ModalMenu/ProductDetail/ProductDetailStructure';
const ProductDetail = lazy(
  () => import("../components/ModalMenu/ProductDetail/ProductDetail"),
);

function ProductExplorer() {
  const [productCategories, setProductCategories] = useState<Category[]>([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [productIdForDetail, setProductIdForDetail] = useState("");

  return (
    <>
      <h1>Product Explorer</h1>
      {detailModalOpen && (
        <Suspense fallback={<ProductDetailStructure onDetailModalOpen={setDetailModalOpen}/>}>
          <ProductDetail
            productId={productIdForDetail}
            onDetailModalOpen={setDetailModalOpen}
          />
        </Suspense>
      )}
      <SearchBar />
      <CategoryFilter
        productCategories={productCategories}
        onProductCategoriesChange={setProductCategories}
      />
      <SortControl />
      <ErrorBoundary>
        <ProductList
          onDetailModalOpen={setDetailModalOpen}
          onProductIdForDetailChange={setProductIdForDetail}
        />
      </ErrorBoundary>
    </>
  );
}

export default ProductExplorer;
