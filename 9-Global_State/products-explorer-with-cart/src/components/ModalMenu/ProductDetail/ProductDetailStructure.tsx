function ProductDetailStructure({ onDetailModalOpen }: { onDetailModalOpen: (isOpen: boolean) => void }) {
  return (
    <div id="product-detail" className="modal" hidden={true}>
      <button
        style={{ width: "fit-content" }}
        onClick={() => onDetailModalOpen(false)}
      >
        X
      </button>
      <h2>Product Details</h2>
      <p>
        <img src="" alt="" />{" "}
      </p>
      <h3>Loading...</h3>
      <p>Loading...</p>
      <p>Loading...</p>
      <p>&#11088; Loading...</p>
      <p>Loading...</p>
      <p>Stock: Loading...</p>
      <p>Warranty Information: Loading...</p>
      <p>Shipping Information: Loading...</p>
    </div>
  );
}

export default ProductDetailStructure