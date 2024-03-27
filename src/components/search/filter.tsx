import { RefObject } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { useStoreFilter } from 'hooks/useStoreFilter';
import { SOURCE_OPTIONS, CATEGORIES } from 'lib/constants';
import { ESourceValue, TSourceOption } from 'lib/defenitions';
import { Select } from 'components/ui/select';

interface FilterProps {
  dropdownRef: RefObject<HTMLDivElement>;
}

export default function Filter({ dropdownRef }: FilterProps) {
  const {
    selectedSource,
    selectedCategory,
    date,
    dateKey,
    setSelectedSource,
    setSelectedCategory,
    setDate,
    clearAll,
    saveFilter,
  } = useStoreFilter();

  const handleSaveFeed = () => {
    saveFilter();
    alert('Successfully saved news feeds!');
  };

  return (
    <div
      className="absolute z-10 mt-1 w-full rounded-md bg-[rgb(54,54,58)] shadow-lg"
      role="menu"
      ref={dropdownRef}
    >
      <div className="p-4">
        <div className="flow-root">
          <dl className="-my-3 divide-y divide-gray-700 text-sm">
            {/* Filter by Source */}
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3">
              <dt className=" font-googleSans font-medium text-gray-300">
                <label htmlFor="source">Source</label>
              </dt>
              <dd className="text-gray-400 sm:col-span-2">
                <Select
                  name="source"
                  id="source"
                  className="mt-1.5"
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                >
                  <option value="" disabled>
                    Choose Source
                  </option>
                  {SOURCE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.option}
                    </option>
                  ))}
                </Select>
              </dd>
            </div>

            {/* Filter by Category */}
            {selectedSource !== ESourceValue.NEWS_API_ALL && (
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3">
                <dt className=" font-googleSans font-medium text-gray-300">
                  <label htmlFor="source">Categories</label>
                </dt>
                <dd className="text-gray-400 sm:col-span-2">
                  <Select
                    name="source"
                    id="source"
                    className="mt-1.5"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {CATEGORIES[selectedSource]?.map((opt: TSourceOption) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.option}
                      </option>
                    ))}
                  </Select>
                </dd>
              </div>
            )}

            {/* Filter by Date */}
            {selectedSource !== ESourceValue.NEWS_API_TOP && (
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3">
                <dt className="font-googleSans font-medium text-gray-300">
                  Date
                </dt>
                <dd className="text-gray-400 sm:col-span-2">
                  <Datepicker
                    key={dateKey}
                    maxDate={new Date()}
                    useRange={false}
                    value={date}
                    onChange={(d) => setDate(d)}
                    inputClassName="w-full rounded border border-slate-500 bg-transparent px-3 py-2 text-sm text-slate-300 focus:border-slate-600 focus:ring-0 focus:outline-none"
                  />
                </dd>
              </div>
            )}
          </dl>

          <div className="mr-auto mt-5 flex w-full justify-end">
            <button
              onClick={clearAll}
              className="px-4 py-2 font-googleSans text-sm font-semibold text-indigo-300 hover:rounded-full hover:bg-[rgb(59,61,67)]"
            >
              Clear
            </button>
            <button
              onClick={handleSaveFeed}
              disabled={!selectedSource && !selectedCategory}
              className="rounded-full bg-indigo-300 px-4 py-2 font-googleSans text-sm font-semibold text-blue-900 shadow-sm hover:bg-indigo-200 disabled:bg-[rgb(60,64,67)] disabled:text-gray-500"
            >
              Save to Feed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
