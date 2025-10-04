import { create } from 'zustand';

import { ListState } from './useListStore';
interface iSearchStore {
  loading: boolean;
  searchResults: ListState[];
  searchTerm: string;
  searchTotal: number;
  searchPage: number;
  searchPageSize: number;

  search: (term: string, page?: number, pageSize?: number) => Promise<void>;
  clearSearch: () => void;
}

const useSearchStore = create<iSearchStore>((set) => ({
  loading: false,
  searchResults: [],
  searchTerm: '',
  searchTotal: 0,
  searchPage: 1,
  searchPageSize: 10,

  search: async (term: string, page = 1, pageSize = 10) => {
    set({ loading: true, searchTerm: term });
    const { rows, total } = await electron.ipcRenderer.invoke('DB-SEARCH', term, page, pageSize);
    set({
      loading: false,
      searchResults: rows,
      searchTotal: total,
      searchPage: page,
      searchPageSize: pageSize
    });
  },

  clearSearch: () => {
    set({
      searchResults: [],
      searchTerm: '',
      searchTotal: 0,
      searchPage: 1,
      searchPageSize: 10
    });
  }
}));

export default useSearchStore;
