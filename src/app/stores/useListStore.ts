import { ListState } from '@/ipc/locationIPC';

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
  getId: (id: number) => Promise<void>;
  totalEntries: number;
  currentPage: number;
  pageSize: number;
  edit: Nullable<ListState>;
}

const useListStore = create<iListStore>()((set, get) => ({
  loading: true,
  entries: [],
  totalEntries: 0,
  currentPage: 1,
  pageSize: 20,
  edit: null,

  add: async (item: ListState, file?: Nullable<ArrayBuffer>) => {
    set({ loading: true });
    const ID = await electron.ipcRenderer.invoke('db.list.create', item);

    if (file) {
      const fileName = await electron.ipcRenderer.invoke('SAVE_SCREEN', file, ID);
      item.Screenshot = fileName;
      await electron.ipcRenderer.invoke('db.list.update', ID, item);
    }

    set({ loading: false, entries: [...get().entries, { ...item, id: ID }] });
  },

  delete: async (id: number) => {
    set({ loading: true });
    await electron.ipcRenderer.invoke('db.list.delete', id);
    set({
      loading: false,
      entries: get().entries.filter((item) => item.id !== id),
      totalEntries: get().totalEntries - 1
    });
  },

  update: async (id: number, item: ListState) => {
    set({ loading: true });
    await electron.ipcRenderer.invoke('db.list.update', id, item);
    set({
      loading: false,
      entries: get().entries.map((e) => (e.id === id ? { ...item, id } : e))
    });
  },

  getAll: async () => {
    set({ loading: true });
    const list: ListState[] = await electron.ipcRenderer.invoke('db.list.getAll');
    set({ loading: false, entries: list, totalEntries: list.length });
  },

  getId: async (id: number) => {
    set({ loading: true, edit: null });
    const edit: ListState = await electron.ipcRenderer.invoke('db.list.getId', id);
    set({ loading: false, edit });
  },

  getPage: async (page = 1, pageSize = 20, search = '') => {
    set({ loading: true });
    const { rows, total } = await electron.ipcRenderer.invoke('db.list.getPage', page, pageSize, search);
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
