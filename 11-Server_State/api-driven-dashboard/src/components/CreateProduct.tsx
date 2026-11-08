import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { addProduct } from '../api/products';

type AddProductInput = {
  title: string;
  price: string;
  stock: string;
}

function CreateProduct() {
  const [productInput, setProductInput] = useState<AddProductInput>({
    title: '',
    price: '',
    stock: '',
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productRecords", 1] })
    },
    // onError: (error, variables, context) => {}
  })


  const handleAddProduct = (ev: React.SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault();

    console.log('mock add');

    console.log({
      title: productInput.title,
      price: Number(productInput.price),
      stock: Number(productInput.stock),
    });

    // setProductInput({})
    mutation.mutate({
      title: productInput.title,
      price: Number(productInput.price),
      stock: Number(productInput.stock),
    });
  }

  return (
    <>
    <h2>Add Product</h2>
    <div id='create-new-product-record'>
      <form onSubmit={handleAddProduct}>
        <div>
          <label htmlFor="productTitle">Product Title</label>
          <input value={productInput.title} onChange={(ev) => setProductInput(prevInput => ({...prevInput, title: ev.target.value}))} type="text" name="productTitle" id="productTitle" />
        </div>
        <div>
          <label htmlFor="productPrice">Price ($)</label>
          <input value={productInput.price} onChange={(ev) => setProductInput(prevInput => ({...prevInput, price: ev.target.value}))} type="number" inputMode='numeric' pattern='[0-9]*' name="productPrice" id="productPrice" />
        </div>
        <div>
          <label htmlFor="productStock">Stock</label>
          <input value={productInput.stock} onChange={(ev) => setProductInput(prevInput => ({...prevInput, stock: ev.target.value}))} type="text" inputMode='numeric' pattern='[0-9]*' name="productStock" id="productStock" />
        </div>
        <button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Adding...' : 'Add'}</button>
      </form>
    </div>
    </>
  )
}

export default CreateProduct;