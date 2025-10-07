import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalEntries: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalEntries,
  pageSize,
  onPageChange,
  className = ''
}) => {
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize));

  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        buttons.push(<button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 rounded-md mx-1 transition cursor-pointer ${
              currentPage === i
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
                     >
          {i}
                     </button>);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        buttons.push(<span key={`dots-${i}`} className='mx-2 text-gray-500'>
          …
                     </span>);
      }
    }
    return buttons;
  };

  return (
    <div
      className={`flex justify-center items-center gap-2 mt-6 select-none ${className} sticky bottom-0 p-2 backdrop-blur-sm`}
    >
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className='p-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 cursor-pointer'
      >
        <ChevronLeft size={18} />
      </button>

      {renderPageButtons()}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className='p-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 cursor-pointer'
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
