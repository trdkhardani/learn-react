export async function fetchProducts({ search, signal }) {
  const limit = 200;

  const params = new URLSearchParams({
    q: search,
    limit,
  });

  const response = await fetch(
    `https://dummyjson.com/products/search?${params}`,
    { signal },
  );

  if (!response.ok) throw new Error("Error fetching products");

  return await response.json();
}

export async function fetchProductById(productId, signal) {
  const response = await fetch(`https://dummyjson.com/products/${productId}`, {
    signal,
  });

  if (!response.ok) {
    if (response.status === 404)
      throw new Error(`No product with ID ${productId} found`);

    throw new Error("Error fetching products");
  }

  return await response.json();
}
