import { create } from 'zustand';

import { Nullable } from './apiInterfaces';

export interface DiscoveriesState {
  id?: number;
  GalaxyIndex: number;
  GalaxyName: string;
  DiscoveryDate: string;
  PortalCount: number;
}

interface DiscoveriesStore {
  loading: boolean;
  entries: DiscoveriesState[];
  add: (item: DiscoveriesState) => Promise<void>;
  update: (id: number, item: DiscoveriesState) => Promise<void>;
  getAll: (search?: string) => Promise<void>;
  totalEntries: number;
}

const useDiscoveriesStore = create<DiscoveriesStore>()((set, get) => ({
  loading: true,
  entries: [],
  totalEntries: 0,

  add: async (item: DiscoveriesState) => {
    set({ loading: true });
    const ID = await electron.ipcRenderer.invoke('db.discoveries.create', item);
    set({
      loading: false,
      entries: [...get().entries, { ...item, id: ID }],
      totalEntries: get().totalEntries + 1
    });
  },

  update: async (id: number, item: DiscoveriesState) => {
    set({ loading: true });
    try {
      await electron.ipcRenderer.invoke('db.discoveries.update', id, {
        GalaxyIndex: item.GalaxyIndex,
        GalaxyName: item.GalaxyName,
        DiscoveryDate: item.DiscoveryDate
      });

      set({
        loading: false,
        entries: get().entries.map((e) => (e.id === id ? { ...item, id } : e))
      });
    } catch (e) {
      console.log(e);
      set({ loading: false });
    }
  },

  getAll: async (search = '') => {
    set({ loading: true });
    const list: DiscoveriesState[] = await electron.ipcRenderer.invoke('db.discoveries.getAll', search);
    set({ loading: false, entries: list, totalEntries: list.length });
  }
}));

export default useDiscoveriesStore;
