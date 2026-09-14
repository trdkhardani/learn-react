import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import SortControl from '../components/SortControl';

function ProductExplorer({ onSelectedProductIdChange }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [sortOption, setSortOption] = useState({ by: "", order: "asc" });

  return (
    <>
        <h1>Product Explorer</h1>
        <SearchBar search={search} onSearchChange={setSearch} onPageChange={setPage} />
        <CategoryFilter category={category} onCategoryChange={setCategory} productCategories={productCategories} onProductCategoriesChange={setProductCategories} onPageChange={setPage}/>
        <SortControl onPageChange={setPage} sortOption={sortOption} onSortOptionChange={setSortOption} />
        <ProductList search={search} page={page} onPageChange={setPage} category={category} sortOption={sortOption} onSelectedProductIdChange={onSelectedProductIdChange} />
    </>
  );
}

export default ProductExplorer