interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-12 pb-10">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-6 py-2 bg-white/10 rounded-lg hover:bg-brand disabled:opacity-30 transition"
      >
        Previous
      </button>
      <span className="font-bold text-gray-400">
        Page {currentPage} sur {Math.min(totalPages, 500)}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-6 py-2 bg-white/10 rounded-lg hover:bg-brand disabled:opacity-30 transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;