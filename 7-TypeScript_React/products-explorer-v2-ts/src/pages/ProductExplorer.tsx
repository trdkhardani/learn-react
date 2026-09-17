import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import SortControl from '../components/SortControl';
import type { Category } from '../types/category';

function ProductExplorer() {
  const [productCategories, setProductCategories] = useState<Category[]>([]);

  return (
    <>
        <h1>Product Explorer</h1>
        <SearchBar />
        <CategoryFilter productCategories={productCategories} onProductCategoriesChange={setProductCategories} />
        <SortControl />
        <ProductList />
    </>
  );
}

export default ProductExplorer