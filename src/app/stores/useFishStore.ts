import { FishType } from '@/ipc/fishtrackerIPC';

import { create } from 'zustand';

interface FishStoreState {
  loading: boolean;
  error: boolean;
  fishes: FishType[];
  getFishes: () => Promise<void>;
  toggleDone: (id: number) => Promise<void>;
  resetAll: () => Promise<void>;
}

const defState: Omit<FishStoreState, 'getFishes' | 'toggleDone' | 'resetAll'> = {
  loading: true,
  error: false,
  fishes: []
};

const useFishStore = create<FishStoreState>()((set, get) => ({
  ...defState,

  getFishes: async () => {
    set({ loading: true, error: false });
    try {
      const fishes: FishType[] = await electron.ipcRenderer.invoke('FISHTRACKER-GET');
      set({ fishes, loading: false, error: false });
    } catch (_err) {
      console.log(_err);
      set({ ...defState, loading: false, error: true });
    }
  },

  toggleDone: async (id: number) => {
    try {
      const newFishes = get().fishes.map((i) => (i.id === id ? { ...i, done: !i.done } : i));
      await electron.ipcRenderer.invoke('FISHTRACKER-SET', newFishes);
      set({ fishes: newFishes });
    } catch (_err) {
      set({ error: true });
    }
  },

  resetAll: async () => {
    try {
      const reset: FishType[] = await electron.ipcRenderer.invoke('RESET_FISHES');
      set({ fishes: reset });
    } catch (_err) {
      set({ error: true });
    }
  }
}));

export default useFishStore;
