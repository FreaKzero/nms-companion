import { PositionType } from '@/ipc/nmsIPC';

import { create } from 'zustand';

const defState = {
  loading: true,
  ShareCode: '',
  PortalCode: '',
  GalaxyName: '',
  GalaxyIndex: 0,
  Summary: ''
};

interface PositionStoreState {
  loading: boolean;
  ShareCode: string;
  PortalCode: string;
  GalaxyName: string;
  GalaxyIndex: number;
  getCurrent: () => void;
  setCurrent: (data: PositionType) => void;
  Summary: string;
}

const usePositionStore = create<PositionStoreState >()((set) => ({
  ...defState,
  setCurrent: (data: PositionType) => {
    set((state) => ({
      ...state,
      ...data
    }));
  },
  getCurrent: async () => {
    set({ ...defState, loading: true });

    try {
      const position: PositionType = await electron.ipcRenderer.invoke('GET_POSITION');
      set({ ...position, loading: false });
    } catch (err) {
      console.error('Fehler beim Laden der Position:', err);
      set({ ...defState, loading: false });
    }
  }
}));

export default usePositionStore;
