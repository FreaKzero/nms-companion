import { PositionType } from '@/ipc/nmsIPC';

import { create } from 'zustand';

const defState = {
  loading: true,
  ShareCode: '',
  PortalCode: '',
  GalaxyName: '',
  GalaxyIndex: 0,
  Summary: '',
  error: false
};

interface PositionStoreState {
  error: boolean;
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

      if (position.error) {
        return set({ ...defState, loading: false, error: true });
      }

      set({ ...position, loading: false });
    } catch (err) {
      set({ ...defState, loading: false, error: true });
    }
  }
}));

export default usePositionStore;
