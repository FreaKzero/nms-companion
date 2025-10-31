import { PositionType } from '@/ipc/nmsIPC';

import { create } from 'zustand';

import useDiscoveriesStore from './useDiscoveriesStore';

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
  setCurrent: async (data: PositionType) => {
    await useDiscoveriesStore.getState().check({
      GalaxyIndex: data.GalaxyIndex,
      GalaxyName: data.GalaxyName
    });

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

      await useDiscoveriesStore.getState().check({
        GalaxyIndex: position.GalaxyIndex,
        GalaxyName: position.GalaxyName
      });

      set({ ...position, loading: false });
    } catch (_err) {
      set({ ...defState, loading: false, error: true });
    }
  }
}));

export default usePositionStore;
