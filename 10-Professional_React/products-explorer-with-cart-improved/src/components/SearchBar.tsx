import { useSearchParams } from "react-router-dom";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((currentParams) => {
      currentParams.set("search", ev.target.value);
      currentParams.set("page", "1");
      return currentParams;
    });
  };

  return (
    <>
      <label id='search' htmlFor="search">Search</label>
      <input aria-label='Search for products' aria-labelledby='search' value={search} type="text" onChange={handleSearch} />
    </>
  );
}

export default SearchBar;
