import { useSearchParams } from 'react-router-dom';

function Pagination({ page, total }) {
  const totalPages = Math.ceil(total / 10); // 10 is the hardcoded limit
  const [, setSearchParams] = useSearchParams()

  return (
    <div id="page-handler">
      <button
        onClick={() => setSearchParams((currentParams) => {
          currentParams.set("page", String(page - 1));
          return currentParams
        })}
        disabled={page === 1 ? true : false}
      >
        Previous
      </button>
      <p>Page {page}</p>
      <button
        onClick={() => setSearchParams((currentParams) => {
          currentParams.set("page", String(page + 1));
          return currentParams
        })}
        disabled={page >= totalPages ? true : false}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination