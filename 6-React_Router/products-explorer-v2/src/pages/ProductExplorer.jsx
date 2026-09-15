import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import SortControl from '../components/SortControl';

function ProductExplorer() {
  const [productCategories, setProductCategories] = useState([]);

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