function SearchBar({ search, onSearchChange, onPageChange }) {
  return (
    <>
    <label htmlFor="search">Search</label>
        <input
          value={search}
          type="text"
          onChange={(ev) => {
            onSearchChange(ev.target.value);
            onPageChange(1);
          }}
        />
    </>
  )
}

export default SearchBar