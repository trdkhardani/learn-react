type Pagination = {
  page: number;
  onPageChange: (currentPage: number) => number;
  total: number;
}

function Pagination({ page, onPageChange, total }: Pagination) {
  const totalPages = Math.ceil(total / 10); // 10 is the hardcoded limit
  return (
    <div id="pagination">
      <button
        onClick={() => onPageChange((currentPage: number) => currentPage - 1)}
        disabled={page === 1 ? true : false}
      >
        Previous
      </button>
      <p>Page {page}</p>
      <button
        onClick={() => onPageChange((currentPage: number) => currentPage + 1)}
        disabled={page >= totalPages ? true : false}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;