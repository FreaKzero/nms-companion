import { Discoveries } from '@/ipc/discoveriesIPC';

import { create } from 'zustand';

import useSaveStore from './useSaveStore';

import { confirmModal } from '../components/ConfirmModal';

export interface EnhancedDiscoveries extends Discoveries {
  BaseCount?: number;
}

interface DiscoveriesStore {
  loading: boolean;
  entries: EnhancedDiscoveries[];
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
    const bases = useSaveStore.getState().bases;

    const baseCountMap = bases.reduce<Record<number, number>>((acc, b) => {
      acc[b.GalaxyIndex] = (acc[b.GalaxyIndex] || 0) + 1;
      return acc;
    }, {});

    const entries: EnhancedDiscoveries[] = list.map((d) => ({
      ...d,
      BaseCount: baseCountMap[d.GalaxyIndex] || 0
    }));

    set({ loading: false, entries, totalEntries: list.length });
  },

  check: async (data) => {
    const entriesBefore = get().entries.length;
    const entries = await electron.ipcRenderer.invoke('db.discoveries.check', data);

    if (entries !== null) {
      if (entriesBefore !== entries.length) {
        confirmModal({
          message: `Galaxy ${data.GalaxyName}, number ${data.GalaxyIndex} discovered!`,
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
