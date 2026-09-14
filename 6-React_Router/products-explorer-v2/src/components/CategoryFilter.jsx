import { useEffect } from 'react';
import { fetchProductCategories } from '../api/categories';

function CategoryFilter({ category, onCategoryChange, productCategories, onProductCategoriesChange, onPageChange }) {

  useEffect(() => {
    (async () => {
      try {
        const categories = await fetchProductCategories();
        onProductCategoriesChange(categories);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      <label htmlFor="category-dropdown">Category</label>
      <select
        value={category}
        name="category-dropdown"
        id="category-dropdown"
        onChange={(ev) => {
          onCategoryChange(ev.target.value);
          onPageChange(1);
        }}
      >
        <option value="">All</option>
        {productCategories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default CategoryFilter;
