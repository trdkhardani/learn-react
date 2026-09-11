export async function fetchProducts({search, category, page, signal}) {
  const limit = 10;
  const skip = (page - 1) * limit;

  const params = new URLSearchParams({
    q: search,
    category,
    limit,
    skip
  });

  const response = await fetch(
    `https://dummyjson.com/products/search?${params}`,
    { signal },
  );

  if (!response.ok) throw new Error("Error fetching products");

  return await response.json();
}


export async function fetchProductCategories() {
  const response = await fetch('https://dummyjson.com/products/categories');

  if (!response.ok)
    throw new Error('Error fetching categories');

  return await response.json();
}