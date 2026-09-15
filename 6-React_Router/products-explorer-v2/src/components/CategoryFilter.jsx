import { useEffect } from 'react';
import { fetchProductCategories } from '../api/categories';
import { useSearchParams } from 'react-router-dom';

function CategoryFilter({ productCategories, onProductCategoriesChange }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get("category") ?? "";
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
          setSearchParams((currentParams) => {
            currentParams.set("category", ev.target.value);
            currentParams.set("page", 1);
            return currentParams
          });
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
