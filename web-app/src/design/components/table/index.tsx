import React, { TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, useCallback, useRef, useState } from 'react';
import { Icon } from '../icon';
import { Pagination, PaginationProps } from '../pagination';
import { useThemeMode } from '../../../brand/contexts/theme-mode';
import { useClickOutside } from '../../hooks/useClickOutside';

export interface TableContainerProps extends PaginationProps, TableFilteringProps {
  children: React.ReactNode;
  onChangeDisplaySetting?: (numOfRows: number) => void;
}

const rowsPerPageSettings: number[] = [50, 100, 150, 200];

export const TableContainer: React.FC<TableContainerProps> = ({ onFilter, ...tableChunkProps }) => {
  return (
    <div className="bg-white dark:bg-black border border-solid rounded-[8px] p-[16px]">
      <div className="pc:flex pc:items-center pc:justify-between">
        <TableFiltering onFilter={onFilter} />
      </div>
      <TableChunk {...tableChunkProps} />
    </div>
  );
};

interface TableProps extends Omit<TableHTMLAttributes<HTMLTableElement>, 'className'> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children, ...restProps }) => (
  <table {...restProps} className="rounded-[4px] bg-white overflow-hidden table-fixed	w-full border-collapse">
    {children}
  </table>
);

export const TableHead: React.FC<ThHTMLAttributes<HTMLTableCellElement>> = ({ children, ...restProps }) => (
  <th {...restProps}>{children}</th>
);

export const TableCell: React.FC<TdHTMLAttributes<HTMLTableCellElement>> = ({ children, ...restProps }) => (
  <td {...restProps}>{children}</td>
);

interface TableFilteringProps {
  onFilter?: (e?: string) => void;
}

const TableFiltering: React.FC<TableFilteringProps> = ({ onFilter }) => {
  const { mode } = useThemeMode();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const containerRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const clearBtnRef = useRef<HTMLButtonElement>(null);

  const handleCollapse = useCallback(() => {
    if (!inputRef.current) return;

    const inputEl = inputRef.current;

    if (!inputEl.value) setIsCollapsed(true);
  }, []);

  useClickOutside(containerRef, handleCollapse);

  return (
    <label
      ref={containerRef}
      className={`flex items-center border border-solid rounded-[8px] px-[10px] py-[5px] ease-out duration-500 ${
        isCollapsed ? 'w-[40px]' : 'w-full pc:w-[400px]'
      }`}
      onClick={() => {
        setIsCollapsed(false);
      }}
      htmlFor="table-search"
    >
      <span className="relative top-[-1px] cursor-pointer mr-[5px]">
        <Icon name={mode === 'dark' ? 'search-white' : 'search-black'} className="text-[20px]" />
      </span>
      <div className="relative w-full overflow-hidden">
        <input
          ref={inputRef}
          placeholder="Input keyword..."
          id="table-search"
          className=" inline-block w-full focus:outline-none pr-[35px]"
          onChange={({ currentTarget: { value } }) => {
            if (clearBtnRef.current) {
              const clearBtnEl = clearBtnRef.current;

              if (value) clearBtnEl.classList.remove('invisible');
              else clearBtnEl.classList.add('invisible');
            }

            onFilter?.(value);
          }}
        />
        <button
          ref={clearBtnRef}
          className="absolute top-[50%] right-0 translate-y-[-50%] p-[5px] invisible hover:opacity-50"
          onClick={() => {
            if (!inputRef.current) return;

            const inputEl = inputRef.current;

            inputEl.value = '';
          }}
        >
          <Icon name={mode === 'dark' ? 'clear-white' : 'clear-black'} className="text-[20px]" />
        </button>
      </div>
    </label>
  );
};

const TableChunk: React.FC<TableContainerProps> = ({
  children,
  onChangeDisplaySetting,
  currentPage,
  ...paginationProps
}) => {
  const [page, setPage] = useState(currentPage ?? 1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  return (
    <div className="mt-[40px]">
      {children}
      <div className="mt-[20px]">
        Display
        <select
          value={rowsPerPage}
          className="appearance-none text-center bg-light-grayish-blue mx-[4px] rounded-[4px] cursor-pointer"
          onChange={({ currentTarget: { value } }) => {
            onChangeDisplaySetting?.(+value);
            setRowsPerPage(+value);
          }}
        >
          {rowsPerPageSettings.map((setting, idx) => (
            <option value={setting} key={idx}>
              {setting.toString()}
            </option>
          ))}
        </select>
        rows per page
      </div>
      <div className="text-center mt-[40px] pc:mt-[60px]">
        <Pagination
          {...paginationProps}
          currentPage={page}
          onPageChange={value => {
            paginationProps.onPageChange(value);
            setPage(+value);
          }}
        />
      </div>
    </div>
  );
};
