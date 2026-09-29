import { memo, useEffect } from "react";
import { fetchProductCategories } from "../api/categories";
import { useSearchParams } from "react-router-dom";
import type { Category } from "../types/category";

type CategoryFilterProps = {
  productCategories: Category[];
  onProductCategoriesChange: React.Dispatch<React.SetStateAction<Category[]>>;
};

const CategoryFilter = memo(
  ({ productCategories, onProductCategoriesChange }: CategoryFilterProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
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

    const handleCategoryChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams((currentParams) => {
        currentParams.set("category", ev.target.value);
        currentParams.set("page", "1");
        return currentParams;
      });
    };

    return (
      <>
        <label
          htmlFor="category-dropdown"
          data-testid="category-dropdown-label"
        >
          Category
        </label>
        <select
          aria-label="Select products category"
          value={category}
          name="category-dropdown"
          id="category-dropdown"
          onChange={handleCategoryChange}
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
  },
);
// function CategoryFilter({
//   productCategories,
//   onProductCategoriesChange,
// }: CategoryFilterProps) {
// }

export default CategoryFilter;
