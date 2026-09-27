import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import SortControl from '../components/SortControl';
import type { Category } from '../types/category';
import ProductDetail from '../components/ModalMenu/ProductDetail/ProductDetail';

function ProductExplorer() {
  const [productCategories, setProductCategories] = useState<Category[]>([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [productIdForDetail, setProductIdForDetail] = useState('')

  return (
    <>
        <h1>Product Explorer</h1>
        {detailModalOpen && <ProductDetail productId={productIdForDetail} onDetailModalOpen={setDetailModalOpen} />}
        <SearchBar />
        <CategoryFilter productCategories={productCategories} onProductCategoriesChange={setProductCategories} />
        <SortControl />
        <ProductList onDetailModalOpen={setDetailModalOpen} onProductIdForDetailChange={setProductIdForDetail} />
    </>
  );
}

export default ProductExplorer