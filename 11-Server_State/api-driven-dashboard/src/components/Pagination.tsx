import type React from 'react';

type Pagination = {
  page: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

function Pagination({ page, onPageChange, total }: Pagination) {
  const totalPages = Math.ceil(total / 10); // 10 is the hardcoded limit
  return (
    <div id="pagination">
      <button
        onClick={() => onPageChange((page: number) => page - 1)}
        disabled={page === 1 ? true : false}
      >
        Previous
      </button>
      <p>Page {page}</p>
      <button
        onClick={() => onPageChange((page: number) => page + 1)}
        disabled={page >= totalPages ? true : false}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;