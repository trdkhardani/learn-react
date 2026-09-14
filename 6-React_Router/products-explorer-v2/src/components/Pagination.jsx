function Pagination({ page, onPageChange, total }) {
  const totalPages = Math.ceil(total / 10); // 10 is the hardcoded limit
  return (
    <div id="page-handler">
      <button
        onClick={() => onPageChange((currentPage) => currentPage - 1)}
        disabled={page === 1 ? true : false}
      >
        Previous
      </button>
      <p>Page {page}</p>
      <button
        onClick={() => onPageChange((currentPage) => currentPage + 1)}
        disabled={page >= totalPages ? true : false}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination