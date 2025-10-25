import { SupplyState } from '@/ipc/supplyIPC';

import { create } from 'zustand';

import { Nullable } from './apiInterfaces';

interface SupplyStore {
  loading: boolean;
  entries: SupplyState[];
  add: (item: SupplyState) => Promise<void>;
  delete: (id: number) => Promise<void>;
  update: (id: number, item: SupplyState) => Promise<void>;
  getAll: (search?: string) => Promise<void>;
  getId: (id: number) => Promise<void>;
  pickup: (id: number) => Promise<void>;
  totalEntries: number;
  edit: Nullable<SupplyState>;
}

const useSupplyStore = create<SupplyStore>()((set, get) => ({
  loading: true,
  entries: [],
  totalEntries: 0,
  edit: null,

  add: async (item: SupplyState) => {
    set({ loading: true });
    const ID = await electron.ipcRenderer.invoke('db.supply.create', item);
    set({
      loading: false,
      entries: [...get().entries, { ...item, id: ID }],
      totalEntries: get().totalEntries + 1
    });
  },

  delete: async (id: number) => {
    set({ loading: true });
    await electron.ipcRenderer.invoke('db.supply.delete', id);
    set({
      loading: false,
      entries: get().entries.filter((item) => item.id !== id),
      totalEntries: get().totalEntries - 1
    });
  },

  update: async (id: number, item: SupplyState) => {
    set({ loading: true });
    try {
      await electron.ipcRenderer.invoke('db.supply.update', id, {
        BaseName: item.BaseName,
        ExtractionPerHour: item.ExtractionPerHour,
        Storage: item.Storage,
        Material: item.Material
      });

      set({
        loading: false,
        entries: get().entries.map((e) => (e.id === id ? { ...item, id } : e))
      });
    } catch (e) {
      console.log(e);
      set({
        loading: false
      });
    }
  },

  getAll: async (search = '') => {
    set({ loading: true });
    const list: SupplyState[] = await electron.ipcRenderer.invoke('db.supply.getAll', search);
    set({ loading: false, entries: list, totalEntries: list.length });
  },

  getId: async (id: number) => {
    set({ loading: true, edit: null });
    const edit: SupplyState = await electron.ipcRenderer.invoke('db.supply.getId', id);
    set({ loading: false, edit });
  },

  pickup: async (id: number) => {
    set({ loading: true });
    const LastPickup: string = await electron.ipcRenderer.invoke('db.supply.pickup', id);
    set({
      entries: get().entries.map((e) => (e.id === id ? { ...e, LastPickup } : e)),
      loading: false
    });
  }
}));

export default useSupplyStore;
