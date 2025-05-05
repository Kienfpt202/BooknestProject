type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  return (
    <div className="flex justify-center gap-2 py-4">
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-2 rounded-full transition ${
            num === currentPage
              ? "bg-[#8B5A2B] text-white"
              : "bg-[#5C4033] text-white hover:bg-[#3d2d22]"
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
