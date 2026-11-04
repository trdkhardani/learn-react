import CreateNewProductRecord from '../components/CreateNewProductRecord';
import EditNewProductRecord from '../components/EditNewProductRecord';
import NewProductRecords from '../components/NewProductRecords';
import ProductRecords from '../components/ProductRecords';

function Dashboard() {
  return (
    <main>
      <ProductRecords />
      {/** New Product Records */}
      <NewProductRecords/>
      {/** Create/Edit New Product Record */}
      <CreateNewProductRecord/>
      <EditNewProductRecord/>
    </main>
  )
}

export default Dashboard;
