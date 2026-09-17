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
      <label htmlFor="search">Search</label>
      <input value={search} type="text" onChange={handleSearch} />
    </>
  );
}

export default SearchBar;
