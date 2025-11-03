import { Discoveries } from '@/ipc/discoveriesIPC';

import { create } from 'zustand';

import { confirmModal } from '../components/ConfirmModal';

interface DiscoveriesStore {
  loading: boolean;
  entries: Discoveries[];
  add: (item: Discoveries) => Promise<void>;
  getAll: (search?: string) => Promise<void>;
  check: (data: Discoveries) => Promise<Discoveries | null>;
  totalEntries: number;
}

const useDiscoveriesStore = create<DiscoveriesStore>()((set, get) => ({
  loading: true,
  entries: [],
  totalEntries: 0,

  add: async (item: Discoveries) => {
    set({ loading: true });
    const ID = await electron.ipcRenderer.invoke('db.discoveries.create', item);
    set({
      loading: false,
      entries: [...get().entries, { ...item, id: ID }],
      totalEntries: get().totalEntries + 1
    });
  },

  getAll: async (search = '') => {
    set({ loading: true });
    const list: Discoveries[] = await electron.ipcRenderer.invoke('db.discoveries.getAll', search);
    set({ loading: false, entries: list, totalEntries: list.length });
  },

  check: async (data) => {
    const entriesBefore = get().entries.length;
    const entries = await electron.ipcRenderer.invoke('db.discoveries.check', data);

    if (entries !== null) {
      if (entriesBefore !== entries.length) {
        const found = entries[entries.length - 1];
        confirmModal({
          message: `Galaxy ${found.GalaxyName}, number ${found.GalaxyIndex} discovered!`,
          title: 'Discovered new Galaxy',
          info: true
        });
      }
      set({ loading: false, entries, totalEntries: get().totalEntries + 1 });
    }

    return entries;
  }
}));

export default useDiscoveriesStore;
