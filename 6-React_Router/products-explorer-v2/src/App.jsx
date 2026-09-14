import { useState } from "react";
import "./App.css";
import ProductExplorer from "./pages/ProductExplorer";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  return (
    <>
      <main hidden={selectedProductId ? true : false}>
        <ProductExplorer onSelectedProductIdChange={setSelectedProductId} />
      </main>
      {selectedProductId && (
        <article>
          {selectedProductId && (
            <ProductDetail
              productId={selectedProductId}
              onSelectedProductIdChange={setSelectedProductId}
            />
          )}
        </article>
      )}
    </>
  );
}

export default App;
