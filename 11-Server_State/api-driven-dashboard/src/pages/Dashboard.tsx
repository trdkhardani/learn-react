import CreateProduct from '../components/CreateProduct';
import EditProduct from '../components/EditProduct';
import ProductRecords from '../components/ProductRecords';

function Dashboard() {
  return (
    <main>
      <ProductRecords />
      {/** Create/Edit New Product Record */}
      <CreateProduct/>
      <EditProduct/>
    </main>
  )
}

export default Dashboard;
