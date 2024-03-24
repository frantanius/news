import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import useDropdown from 'hooks/useDropdown';
import { useNews } from 'hooks/useNews';
import Filter from 'components/search/filter';
import { Input } from 'components/ui/input';

export default function Search() {
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();
  const [searchValue, setSearchValue] = useState<string>('');
  const [value] = useDebounce(searchValue, 1000);
  useNews({ search: value });

  return (
    <>
      <label
        htmlFor="search-news"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <Input
          id="search-news"
          type="search"
          className="focus:bg-[#292a2d]"
          placeholder="search for articles by keyword"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          type="button"
          onClick={toggleDropdown}
          className="absolute bottom-2.5 right-2.5 px-4 py-2 focus:outline-none"
        >
          <span className="sr-only">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-gray-400"
            viewBox="0 0 52 52"
            fill="currentColor"
          >
            {isOpen ? (
              <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z" />
            ) : (
              <path d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z" />
            )}
          </svg>
        </button>
        {isOpen && <Filter dropdownRef={dropdownRef} />}
      </div>
    </>
  );
}
