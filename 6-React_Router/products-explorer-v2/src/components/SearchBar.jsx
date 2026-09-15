import { useSearchParams } from 'react-router-dom';

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get("search") ?? ""
  return (
    <>
    <label htmlFor="search">Search</label>
        <input
          value={search}
          type="text"
          onChange={(ev) => {
            setSearchParams((currentParams) => {
              currentParams.set("search", ev.target.value)
              currentParams.set("page", 1)
              return currentParams
            });
          }}
        />
    </>
  )
}

export default SearchBar