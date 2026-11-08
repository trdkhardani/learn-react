// import { useCartStore } from '../stores/useCartStore';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct } from "../api/products";
import type { Product, ProductsResponse } from "../types/product";

type IndividualProduct = {
  product: Product;
  page: number;
  // onDetailModalOpen: (isOpen: boolean) => void;
  // onProductIdForDetailChange: (productId: string) => void;
};

function ProductCard({ product, page }: IndividualProduct) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editProduct,

    onMutate: async ({ id, stock }) => {
      console.log("1. onMutate triggered", { id, stock });

      await queryClient.cancelQueries({
        queryKey: ["productRecords", page],
      });

      console.log("2. Queries cancelled");

      const previousProductsResponse = queryClient.getQueryData<ProductsResponse>([
        "productRecords",
        page,
      ]);

      console.log("3. Previous products:", previousProductsResponse);

      queryClient.setQueryData<ProductsResponse>(
        ["productRecords", page],
        (oldData) => {
          console.log("4. Current cache:", oldData);

          if (!oldData) return oldData;

          return {
            ...oldData,
            products: oldData.products.map((product) => product.id === id ? { ...product, stock } : product)
          }
        },
      );

      console.log("5. Cache updated");

      return { previousProductsResponse };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        ["productRecords", page],
        context?.previousProductsResponse,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["productRecords", page],
      });
    },
  });

  const handleMarkAsSold = (productId: number) => {
    mutation.mutate({ id: productId, stock: 0 })
  }

  return (
    <div className="product-card">
      {/* <p>
        <img src={product.thumbnail} alt={product.title} />{" "}
      </p> */}
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <p>{product.stock > 0 ? `Stock: ${product.stock}` : 'Out of stock'}</p>
      <div className="product-card-buttons-wrapper">
        <button
          data-testid={`mark-as-sold-out-button-${product.id}`}
          aria-label={`Mark ${product.title} as sold out`}
          onClick={() => handleMarkAsSold(product.id)}
        >
          Mark as sold out
        </button>
        <button
          data-testid={`delete-product-button-${product.id}`}
          aria-label={`Delete ${product.title}`}
          onClick={() => {}}
        >
          Delete Product
        </button>
      </div>
      {/* <ProductDetail productId={String(product.id)} /> */}
      {/* <Link className='view-detail-btn' to={`/products/${product.id}`}>View Detail</Link> */}
    </div>
  );
}

export default ProductCard;
