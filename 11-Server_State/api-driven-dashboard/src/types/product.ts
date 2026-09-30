export type Product = {
  id: number;
  title: string;
  price: number;
  stock: number;
}

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type ProductInput = Omit<Product, "id">;