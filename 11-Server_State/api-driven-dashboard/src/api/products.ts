import type { Product, ProductEditInput, ProductInput, ProductsResponse } from '../types/product';

// const apiBaseUrl = "https://dummyjson.com/products";
const apiBaseUrl = "http://localhost:3000/products";

// export const newlyAddedProducts: Product[] = [];

export async function fetchProducts(page: number, signal?: AbortSignal): Promise<ProductsResponse> {
  const limit = 10;
  const skip = (page - 1) * limit;
  const response = await fetch(`${apiBaseUrl}?limit=${limit}&skip=${skip}&select=id,title,price,stock`, { signal });

  if (!response.ok)
    throw new Error("Error fetching products.");

  return await response.json();
}

export async function addProduct(input: ProductInput): Promise<Product> {
  const response = await fetch(`${apiBaseUrl}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input)
  });

  if (!response.ok)
    throw new Error("Error creating product");

  const data = await response.json();
  // newlyAddedProducts.push(data)

  return data;
}

export async function editProduct(input: ProductEditInput): Promise<Product> {
  const response = await fetch(`${apiBaseUrl}/${input.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: input.title,
      price: input.price,
      stock: input.stock,
    })
  });

  if (!response.ok)
    throw new Error("Error updating product");

  const data: Product = await response.json();

  return data;
}

export async function deleteProduct(productId: number): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok)
    throw new Error("Error deleting product");

  return;
}