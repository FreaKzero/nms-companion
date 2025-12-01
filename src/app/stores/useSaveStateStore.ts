import { create } from 'zustand';

export interface SavestateItem {
  filename: string;
  created: string | null;
  size: string;
}

interface SavestatesState {
  list: SavestateItem[];
  loading: boolean;
  error: string | null;
  activeOperation: string | null;

  getAll: () => Promise<void>;
  create: () => Promise<boolean>;
  restore: (filename: string) => Promise<boolean>;
  remove: (filename: string) => Promise<boolean>;
}

export const useSavestatesStore = create<SavestatesState>((set, get) => ({
  list: [],
  loading: false,
  error: null,
  activeOperation: null,

  getAll: async () => {
    set({ loading: true, error: null, activeOperation: 'Loading Savestates' });

    try {
      const res = await electron.ipcRenderer.invoke('SAVESTATES_LIST');
      if (!res.success) throw new Error(res.error);

      set({ list: res.list, loading: false, activeOperation: null });
    } catch (err: any) {
      set({
        error: err.message,
        loading: false,
        activeOperation: null
      });
    }
  },

  create: async () => {
    set({ loading: true, error: null, activeOperation: 'Creating Savestate' });

    try {
      const res = await electron.ipcRenderer.invoke('SAVESTATES_ZIP');
      if (!res.success) throw new Error(res.error);

      await get().getAll();
      set({ activeOperation: null });
      return true;
    } catch (err: any) {
      set({
        error: err.message,
        loading: false,
        activeOperation: null
      });
      return false;
    }
  },

  restore: async (filename: string) => {
    set({ loading: true, error: null, activeOperation: 'Restoring Savestate' });

    try {
      const res = await electron.ipcRenderer.invoke('SAVESTATES_UNZIP', filename);
      if (!res.success) throw new Error(res.error);

      set({ loading: false, activeOperation: null });
      return true;
    } catch (err: any) {
      set({
        error: err.message,
        loading: false,
        activeOperation: null
      });
      return false;
    }
  },

  remove: async (filename: string) => {
    set({ loading: true, error: null, activeOperation: 'delete' });

    try {
      const res = await electron.ipcRenderer.invoke('SAVESTATES_DELETE', filename);
      if (!res.success) throw new Error(res.error);

      await get().getAll();
      set({ activeOperation: null });
      return true;
    } catch (err: any) {
      set({
        error: err.message,
        loading: false,
        activeOperation: null
      });
      return false;
    }
  }
}));
