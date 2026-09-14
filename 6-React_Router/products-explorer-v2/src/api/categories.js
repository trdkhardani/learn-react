export async function fetchProductCategories() {
  const response = await fetch("https://dummyjson.com/products/categories");

  if (!response.ok) throw new Error("Error fetching categories");

  return await response.json();
}