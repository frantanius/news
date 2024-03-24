import { RefObject, useState } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import { Select } from 'components/ui/select';
import { Checkbox } from 'components/ui/checkbox';

const categories = [
  'general',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

interface FilterProps {
  dropdownRef: RefObject<HTMLDivElement>;
}

export default function Filter({ dropdownRef }: FilterProps) {
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [checkedCategory, setCheckedCategory] = useState<string[]>([]);
  const [date, setDate] = useState<DateValueType>({
    startDate: '',
    endDate: '',
  });
  const [dateKey, setDateKey] = useState<number>(0);

  const handleSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSource(event.target.value);
  };

  const handleCategory =
    (category: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      setCheckedCategory((prev) => {
        if (isChecked) {
          return [...prev, category];
        } else {
          return prev.filter((item) => item !== category);
        }
      });
    };

  const handleDate = (newValue: DateValueType) => {
    if (newValue) {
      setDate(newValue);
    }
  };

  const clearAll = () => {
    setSelectedSource('');
    setCheckedCategory([]);
    setDate({ startDate: '', endDate: '' });
    setDateKey((prevKey) => prevKey + 1);
  };

  const isSearchDisabled =
    selectedSource === '' &&
    checkedCategory.length === 0 &&
    (date?.startDate === '' || date?.endDate === '');

  return (
    <div
      className="absolute z-10 mt-1 w-full rounded-md bg-[rgb(54,54,58)] shadow-lg"
      role="menu"
      ref={dropdownRef}
    >
      <div className="p-4">
        <div className="flow-root">
          <dl className="-my-3 divide-y divide-gray-500 text-sm">
            {/* Filter by Source */}
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3">
              <dt className=" font-googleSans font-medium text-gray-300">
                <label htmlFor="source"> Source</label>
              </dt>
              <dd className="text-gray-400 sm:col-span-2">
                <Select
                  name="source"
                  id="source"
                  className="mt-1.5"
                  value={selectedSource}
                  onChange={handleSource}
                >
                  <option value="" disabled>
                    Choose Source
                  </option>
                  <option value="newsapi">News Api</option>
                  <option value="bbc">BBC News</option>
                  <option value="nytimes">New York Times</option>
                </Select>
              </dd>
            </div>

            {/* Filter by Category */}
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3">
              <dt className="font-googleSans font-medium text-gray-300">
                Categories
              </dt>
              <dd className="text-gray-300 sm:col-span-2">
                <div className="space-y-2">
                  {categories.map((category, idx) => (
                    <label
                      key={idx}
                      htmlFor={`Option${idx}`}
                      className="flex cursor-pointer items-start gap-4"
                    >
                      <div className="flex items-center">
                        &#8203;
                        <Checkbox
                          id={`Option${idx}`}
                          checked={checkedCategory.includes(category)}
                          onChange={handleCategory(category)}
                        />
                      </div>
                      <strong className="font-medium capitalize text-gray-400">
                        {category}
                      </strong>
                    </label>
                  ))}
                </div>
              </dd>
            </div>

            {/* Filter by Date */}
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3">
              <dt className="font-googleSans font-medium text-gray-300">
                Date
              </dt>
              <dd className="text-gray-400 sm:col-span-2">
                <Datepicker
                  key={dateKey}
                  inputClassName="w-full rounded border border-slate-500 bg-transparent px-3 py-2 text-sm text-slate-300 focus:border-slate-600 focus:ring-0 focus:outline-none"
                  useRange={false}
                  value={date}
                  onChange={handleDate}
                />
              </dd>
            </div>
          </dl>

          <div className="mr-auto mt-10 flex w-full justify-end gap-5">
            <button
              onClick={clearAll}
              className="px-4 py-2 font-googleSans text-sm font-semibold text-indigo-300 hover:rounded-full hover:bg-[rgb(59,61,67)]"
            >
              Clear
            </button>
            <button
              disabled={isSearchDisabled}
              className="rounded-full bg-indigo-300 px-4 py-2 font-googleSans text-sm font-semibold text-blue-900 shadow-sm hover:bg-indigo-200 disabled:bg-[rgb(60,64,67)] disabled:text-gray-500"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
