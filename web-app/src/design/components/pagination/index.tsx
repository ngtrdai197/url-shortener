import React, { useMemo } from 'react';

export interface PaginationProps {
  pageSize: number;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  onPageChange: (index: number | string) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageSize,
  totalCount,
  siblingCount = -1,
  currentPage,
  onPageChange,
}) => {
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  // Note: If there is only 1 page, pagination will be not shown.
  if (currentPage === 0 || paginationRange.length < 2) return null;

  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const lastPage = paginationRange[paginationRange.length - 1];
  const DOTS = '...';

  return (
    <ul className="c-pagination inline-flex items-center justify-between rounded-[25px] px-[10px] py-[5px] bg-light-grayish-blue">
      <li
        className={`px-[10px] py-[5px] cursor-pointer select-none hover:opacity-50${
          currentPage === 1 ? ' text-strong-gray pointer-events-none' : ''
        }`}
        onClick={onPrevious}
      >
        {'<'}
      </li>
      {paginationRange.map((page, index) => {
        if (page === DOTS) {
          return (
            <li key={index} className="select-none">
              {DOTS}
            </li>
          );
        }

        return (
          <li
            key={index}
            className={`px-[10px] py-[5px] cursor-pointer select-none hover:opacity-50${
              page === currentPage ? ' bg-bright-blue text-white rounded-[8px] hover:opacity-100' : ''
            }`}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </li>
        );
      })}
      <li
        className={`px-[10px] py-[5px] cursor-pointer select-none hover:opacity-50${
          currentPage === lastPage ? ' text-strong-gray pointer-events-none' : ''
        }`}
        onClick={onNext}
      >
        {'>'}
      </li>
    </ul>
  );
};

const usePagination = ({ totalCount = 10, pageSize = 1, siblingCount = 1, currentPage = 0 }) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, index) => index + start);
  };

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;
    const DOTS = '...';

    /*
     Case 1: If the number of pages is less than the page numbers we want to show in our pagination component,
     we return the reange [1...totalPageCount].
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
      Case 2: No left dots to show, but right dots to be shown.
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      /*
      Case 3: No right dots to show, but left dots to be shown.
    */
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

      return [firstPageIndex, DOTS, ...rightRange];
    } else {
      /*
      Case 4: Both left and right dots to be shown.
    */
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
