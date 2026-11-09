// import { useCartStore } from '../stores/useCartStore';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, editProduct } from "../api/products";
import type { Product, ProductsResponse } from "../types/product";

type IndividualProduct = {
  product: Product;
  page: number;
  // onDetailModalOpen: (isOpen: boolean) => void;
  // onProductIdForDetailChange: (productId: string) => void;
};

function ProductCard({ product, page }: IndividualProduct) {
  const queryClient = useQueryClient();

  const mutation = {
    edit: useMutation({
      mutationFn: editProduct,

      onMutate: async ({ id, stock }) => {
        await queryClient.cancelQueries({
          queryKey: ["productRecords", page],
        });

        const previousProductsResponse =
          queryClient.getQueryData<ProductsResponse>(["productRecords", page]);

        queryClient.setQueryData<ProductsResponse>(
          ["productRecords", page],
          (oldData) => {
            if (!oldData) return oldData;

            return {
              ...oldData,
              products: oldData.products.map((product) =>
                product.id === id ? { ...product, stock } : product,
              ),
            };
          },
        );

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
    }),

    delete: useMutation({
      mutationFn: deleteProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["productRecords"] });
      },
    }),
  };

  const handleMarkAsSold = (productId: number) => {
    mutation.edit.mutate({ id: productId, stock: 0 });
  };

  const handleDelete = (productId: number) => {
    mutation.delete.mutate(productId);
  }

  return (
    <div className="product-card">
      {/* <p>
        <img src={product.thumbnail} alt={product.title} />{" "}
      </p> */}
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <p>{product.stock > 0 ? `Stock: ${product.stock}` : "Out of stock"}</p>
      <div className="product-card-buttons-wrapper">
        <button
          data-testid={`mark-as-sold-out-button-${product.id}`}
          aria-label={`Mark ${product.title} as sold out`}
          onClick={() => handleMarkAsSold(product.id)}
          disabled={mutation.edit.isPending}
        >
          {mutation.edit.isPending ? 'Marking...' : 'Mark as sold out'}
        </button>
        <button
          data-testid={`delete-product-button-${product.id}`}
          aria-label={`Delete ${product.title}`}
          onClick={() => handleDelete(product.id)}
          disabled={mutation.delete.isPending}
        >
          {mutation.delete.isPending ? 'Deleting...' : 'Delete Product'}
        </button>
      </div>
      { mutation.delete.isError && <div>Error deleting this product. Please try again later.</div> }
      { mutation.edit.isError && <div>Error marking this product as sold out. Please try again later.</div> }
    </div>
  );
}

export default ProductCard;
