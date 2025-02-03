'use client';

import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Previous Button */}
      <Button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-yellow-300 text-gray-800 rounded-md hover:bg-yellow-200 disabled:opacity-50"
      >
        ⬅️ Prev
      </Button>

      {/* Page Indicator */}
      <span className="text-lg font-bold text-gray-800">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <Button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className=" bg-yellow-300 text-gray-800 rounded-md hover:bg-yellow-200 disabled:opacity-50"
      >
        Next ➡️
      </Button>
    </div>
  );
}
