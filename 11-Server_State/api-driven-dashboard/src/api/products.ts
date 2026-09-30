import type { Product, ProductInput, ProductsResponse } from '../types/product';

const apiBaseUrl = "https://dummyjson.com/products";

export const newlyAddedProducts: Product[] = [];

export async function fetchProducts(page: number): Promise<ProductsResponse> {
  const limit = 10;
  const skip = (page - 1) * limit;
  const response = await fetch(`${apiBaseUrl}?limit=${limit}&skip=${skip}&select=id,title,price,stock`);

  if (!response.ok)
    throw new Error("Error fetching products.");

  // const data = await response.json();
  return await response.json();
}

export async function addNewProduct(input: ProductInput): Promise<Product> {
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
  newlyAddedProducts.push(data)

  return data;
}

export async function editNewProduct(productId: number, input: ProductInput): Promise<Product> {
  const response = await fetch(`${apiBaseUrl}/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input)
  });

  if (!response.ok)
    throw new Error("Error updating product");

  const data: Product = await response.json();

  const product = newlyAddedProducts.find((product) => product.id === productId);

  if (!product)
    throw new Error("Product not found");

  product.title = data.title;
  product.price = data.price;
  product.stock = data.stock;
  // newlyAddedProducts.map((product) => (product.id === productId ? { id: product.id, ...data } : product))

  return data;
}

export async function deleteNewProduct(productId: number, input: ProductInput): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input)
  });

  if (!response.ok)
    throw new Error("Error deleting product");

  const productIdx = newlyAddedProducts.findIndex((product) => product.id === productId);

  if (productIdx === -1)
    throw new Error("Product not found");

  newlyAddedProducts.splice(productIdx, 1)

  return;
}