import { useSearchParams } from "react-router-dom";

type PaginationOptions = {
  page: number;
  total: number;
};

function Pagination({ page, total }: PaginationOptions) {
  const totalPages = Math.ceil(total / 10); // 10 is the hardcoded limit
  const [, setSearchParams] = useSearchParams();

  const handlePaginationNext = () => {
    setSearchParams((currentParams) => {
      currentParams.set("page", String(page + 1));
      return currentParams;
    });
  };

  const handlePaginationPrev = () => {
    setSearchParams((currentParams) => {
      currentParams.set("page", String(page - 1));
      return currentParams;
    });
  };

  return (
    <div id="page-handler">
      <button
        onClick={handlePaginationPrev}
        disabled={page === 1 ? true : false}
      >
        Previous
      </button>
      <p>Page {page}</p>
      <button
        onClick={handlePaginationNext}
        disabled={page >= totalPages ? true : false}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
