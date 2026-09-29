import type React from "react";
import { useSearchParams } from "react-router-dom";

function SortControl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ?? "";
  const order = searchParams.get("order") ?? "asc";

  const handleSort = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((currentParams) => {
      currentParams.set("sort", ev.target.value);
      currentParams.set("page", "1");
      return currentParams;
    });
  };

  const handleOrder = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((currentParams) => {
      currentParams.set("order", ev.target.value);
      currentParams.set("page", "1");
      return currentParams;
    });
  };

  return (
    <>
      <label htmlFor="sort">Sort By</label>
      <select aria-label='Sort products by' value={sort} name="sort" id="sort" onChange={handleSort}>
        <option value="">None</option>
        <option value="price">Price</option>
        <option value="title">Title</option>
        <option value="rating">Rating</option>
      </select>
      {sort.length > 0 && (
        <span>
          <label htmlFor="order">Order</label>
          <select
            aria-label='Order products by'
            value={order}
            name="order"
            id="order"
            onChange={handleOrder}
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
