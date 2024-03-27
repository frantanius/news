import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DateValueType } from 'react-tailwindcss-datepicker';
import { ESourceValue } from 'lib/defenitions';

/* Define the state filter */
type State = {
  search: string;
  selectedSource: string;
  selectedCategory: string;
  date: DateValueType;
  dateKey: number; // for clear date
  savedFilters: {
    search: string;
    selectedSource: string;
    selectedCategory: string;
  };
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
  saveFilter: () => void;
};

/* Initialize the state filter */
const initialState: State = {
  search: '',
  selectedSource: ESourceValue.NY_TIMES,
  selectedCategory: '',
  date: { startDate: '', endDate: '' },
  dateKey: 0,
  savedFilters: {
    search: '',
    selectedSource: '',
    selectedCategory: '',
  },
};

export const Store = create<State & Action>()(
  persist(
    (set) => ({
      ...initialState,
      setSearch: (search) => set({ search }),
      setSelectedSource: (selectedSource) => set({ selectedSource }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setDate: (date) => set({ date }),
      setDateKey: (key) => set({ dateKey: key }),
      clearOnlySearch: () => set((state) => ({ ...state, search: '' })),
      clearAll: () => set(initialState),
      saveFilter: () =>
        set((state) => ({
          ...state,
          savedFilters: {
            search: state.search,
            selectedSource: state.selectedSource,
            selectedCategory: state.selectedCategory,
          },
        })),
    }),
    // Persisted
    {
      name: 'feeds',
      getStorage: () => localStorage,
      partialize: (state) => ({ savedFilters: state.savedFilters }),
    },
  ),
);

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
  const saveFilter = Store((state) => state.saveFilter);
  const savedFilters = Store((state) => state.savedFilters);

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
    saveFilter,
    savedFilters,
  };
};

export const initializeFeed = () => {
  const ls = localStorage.getItem('feeds');
  const savedFilters = ls ? JSON.parse(ls).state.savedFilters : {};

  Store.setState({
    search: savedFilters.search || '',
    selectedSource: savedFilters.selectedSource || ESourceValue.NY_TIMES,
    selectedCategory: savedFilters.selectedCategory || '',
  });
};
