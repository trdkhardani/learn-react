import type { Category } from '../types/category';

export async function fetchProductCategories(): Promise<Category[]> {
  const response = await fetch("https://dummyjson.com/products/categories");

  if (!response.ok) throw new Error("Error fetching categories");

  return await response.json();
}