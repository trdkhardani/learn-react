import ProductCard from "./ProductCard";

function ProductList() {
  const products = [
    {
      id: 1,
      name: "Mechanical Keyboard",
      price: 850000,
      category: "Peripherals",
      inStock: true,
    },
    {
      id: 2,
      name: "Gaming Mouse",
      price: 450000,
      category: "Peripherals",
      inStock: false,
    },
    {
      id: 3,
      name: "USB Microphone",
      price: 1200000,
      category: "Audio",
      inStock: true,
    },
  ];

  return (
    products.map((product) => <ProductCard key={product.id} product={product} />)
    // <>
    // {
    // }
    // </>
  );
}

export default ProductList;
