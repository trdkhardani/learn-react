import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { addProduct } from '../api/products';

type AddProductInput = {
  title: string;
  price: string;
  stock: string;
}

type AddProductInputValidation = {
  title?: string;
  price?: string;
  stock?: string;
}

function CreateProduct() {
  const [productInput, setProductInput] = useState<AddProductInput>({
    title: '',
    price: '',
    stock: '',
  });

  const [validationError, setValidationError] = useState<AddProductInputValidation>({});

  const validateForm = (form: AddProductInput) => {
    const errors: AddProductInputValidation = {};
    if (form.title.trim().length === 0)
      errors.title = 'Product title must not be empty.';

    if (form.title.trim().length > 50)
      errors.title = 'Product title must not exceed 50 characters.';

    if (Number(form.price) <= 0)
      errors.price = 'Price must be greater than 0';

    if (Number(form.stock) <= 0)
      errors.stock = 'Stock must be greater than 0';

    return errors;
  }

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
    const validate = validateForm(productInput);
    if (Object.keys(validate).length > 0) {
      setValidationError(validate);
      return;
    }

    console.log({
      title: productInput.title.trim(),
      price: Number(productInput.price),
      stock: Number(productInput.stock),
    });

    setValidationError({})
    // setProductInput({})
    mutation.mutate({
      title: productInput.title.trim(),
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
          <input onBlur={() => {}} value={productInput.title} onChange={(ev) => setProductInput(prevInput => ({...prevInput, title: ev.target.value}))} type="text" name="productTitle" id="productTitle" />
          {validationError.title && <p className='validation-msg'>{validationError.title}</p>}
        </div>
        <div>
          <label htmlFor="productPrice">Price ($)</label>
          <input value={productInput.price} onChange={(ev) => setProductInput(prevInput => ({...prevInput, price: ev.target.value}))} type="number" inputMode='numeric' pattern='[0-9]*' name="productPrice" id="productPrice" />
          {validationError.price && <p className='validation-msg'>{validationError.price}</p>}
        </div>
        <div>
          <label htmlFor="productStock">Stock</label>
          <input value={productInput.stock} onChange={(ev) => setProductInput(prevInput => ({...prevInput, stock: ev.target.value}))} type="number" inputMode='numeric' pattern='[0-9]*' name="productStock" id="productStock" />
          {validationError.stock && <p className='validation-msg'>{validationError.stock}</p>}
        </div>
        <button type="submit" disabled={mutation.isPending}>{mutation.isPending ? 'Adding...' : 'Add'}</button>
      </form>
    </div>
    </>
  )
}

export default CreateProduct;