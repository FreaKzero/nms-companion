import { ListState } from '@/ipc/dbIPC';

import { create } from 'zustand';

import { Nullable } from './apiInterfaces';

interface iListStore {
  loading: boolean;
  entries: ListState[];
  add: (item: ListState, file?: Nullable<ArrayBuffer>) => Promise<void>;
  delete: (id: number) => Promise<void>;
  update: (id: number, item: ListState) => Promise<void>;
  getAll: () => Promise<void>;
  getPage: (page?: number, pageSize?: number, search?: string) => Promise<void>;
  totalEntries: number;
  currentPage: number;
  pageSize: number;
}

const useListStore = create<iListStore>()((set, get) => ({
  loading: true,
  entries: [],
  totalEntries: 0,
  currentPage: 1,
  pageSize: 20,

  add: async (item: ListState, file?: Nullable<ArrayBuffer>) => {
    set({ loading: true });
    const ID = await electron.ipcRenderer.invoke('DB-CREATE', item);

    if (file) {
      const fileName = await electron.ipcRenderer.invoke('SAVE_SCREEN', file, ID);
      item.Screenshot = fileName;
      await electron.ipcRenderer.invoke('DB-UPDATE', ID, item);
    }

    set({ loading: false, entries: [...get().entries, { ...item, id: ID }] });
  },

  delete: async (id: number) => {
    set({ loading: true });
    await electron.ipcRenderer.invoke('DB-DELETE', id);
    set({
      loading: false,
      entries: get().entries.filter((item) => item.id !== id),
      totalEntries: get().totalEntries - 1
    });
  },

  update: async (id: number, item: ListState) => {
    set({ loading: true });
    await electron.ipcRenderer.invoke('DB-UPDATE', id, item);
    set({
      loading: false,
      entries: get().entries.map((e) => (e.id === id ? { ...item, id } : e))
    });
  },

  getAll: async () => {
    set({ loading: true });
    const list: ListState[] = await electron.ipcRenderer.invoke('DB-READ-ALL');
    set({ loading: false, entries: list, totalEntries: list.length });
  },

  getPage: async (page = 1, pageSize = 20, search = '') => {
    set({ loading: true });
    const { rows, total } = await electron.ipcRenderer.invoke('DB-GET-PAGE', page, pageSize, search);
    set({
      loading: false,
      entries: rows,
      totalEntries: total,
      currentPage: page,
      pageSize
    });
  }
}));

export default useListStore;
