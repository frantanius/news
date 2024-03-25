import { create } from 'zustand';
import { DateValueType } from 'react-tailwindcss-datepicker';
import mockSourceNews from 'assets/mocks/sourceNews.json';

/* Define the state filter */
type State = {
  search: string;
  selectedSource: string;
  selectedCategory: string;
  date: DateValueType;
  dateKey: number;
};

/* Define the actions filter */
type Action = {
  setSearch: (search: State['search']) => void;
  setSelectedSource: (source: State['selectedSource']) => void;
  setSelectedCategory: (category: State['selectedCategory']) => void;
  setDate: (date: State['date']) => void;
  setDateKey: (key: State['dateKey']) => void;
  clearOnlySearch: () => void;
  clearAll: () => void;
};

/* Initialize the state filter */
const initialState: State = {
  search: '',
  selectedSource: mockSourceNews[0].value,
  selectedCategory: '',
  date: { startDate: '', endDate: '' },
  dateKey: 0,
};

/* Create store filter */
export const Store = create<State & Action>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search }),
  setSelectedSource: (selectedSource) => set({ selectedSource }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setDate: (date) => set({ date }),
  setDateKey: (key) => set({ dateKey: key }),
  clearOnlySearch: () => set((state) => ({ ...state, search: '' })),
  clearAll: () =>
    set((state) => ({
      ...state,
      search: '',
      selectedSource: '',
      selectedCategory: '',
      date: { startDate: '', endDate: '' },
      dateKey: state.dateKey + 1,
    })),
}));

/* Selector optimation filter */
export const useStoreFilter = () => {
  const search = Store((state) => state.search);
  const selectedSource = Store((state) => state.selectedSource);
  const selectedCategory = Store((state) => state.selectedCategory);
  const date = Store((state) => state.date);
  const dateKey = Store((state) => state.dateKey);
  const setSearch = Store((state) => state.setSearch);
  const setSelectedSource = Store((state) => state.setSelectedSource);
  const setSelectedCategory = Store((state) => state.setSelectedCategory);
  const setDate = Store((state) => state.setDate);
  const setDateKey = Store((state) => state.setDateKey);
  const clearOnlySearch = Store((state) => state.clearOnlySearch);
  const clearAll = Store((state) => state.clearAll);

  return {
    search,
    selectedSource,
    selectedCategory,
    date,
    dateKey,
    setSearch,
    setSelectedSource,
    setSelectedCategory,
    setDate,
    setDateKey,
    clearOnlySearch,
    clearAll,
  };
};
