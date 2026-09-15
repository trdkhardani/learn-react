import { useSearchParams } from 'react-router-dom';

function SortControl() {
  const [searchParams, setSearchParams] = useSearchParams()
  const sort = searchParams.get("sort") ?? ""
  const order = searchParams.get("order") ?? "asc"
  return (
    <>
      <label htmlFor="sort">Sort By</label>
      <select
        value={sort}
        name="sort"
        id="sort"
        onChange={(ev) => {
          setSearchParams((currentParams) => {
            currentParams.set("sort", ev.target.value)
            currentParams.set("page", 1)
            return currentParams
          });
        }}
      >
        <option value="">None</option>
        <option value="price">Price</option>
        <option value="title">Title</option>
        <option value="rating">Rating</option>
      </select>
      {searchParams.get("sort") && searchParams.get("sort").length > 0 && (
        <span>
          <label htmlFor="order">Order</label>
          <select
            value={order}
            name="order"
            id="order"
            onChange={(ev) => {
              setSearchParams((currentParams) => {
                currentParams.set("order", ev.target.value)
                currentParams.set("page", 1)
                return currentParams
              });
        }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </span>
      )}
    </>
  );
}

export default SortControl;
