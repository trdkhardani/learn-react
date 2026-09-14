function SortControl({ onPageChange, sortOption, onSortOptionChange }) {
  return (
    <>
      <label htmlFor="sort-by">Sort By</label>
      <select
        value={sortOption.by}
        name="sort-by"
        id="sort-by"
        onChange={(ev) => {
          onSortOptionChange((sortOption) => ({
            ...sortOption,
            by: ev.target.value,
          }));
          onPageChange(1);
        }}
      >
        <option value="">None</option>
        <option value="price">Price</option>
        <option value="title">Title</option>
        <option value="rating">Rating</option>
      </select>
      {sortOption.by.length > 0 && (
        <span>
          <label htmlFor="order-by">Order</label>
          <select
            value={sortOption.order}
            name="order-by"
            id="order-by"
            onChange={(ev) => {
              onSortOptionChange((sortOption) => ({
                ...sortOption,
                order: ev.target.value,
              }));
              onPageChange(1);
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
