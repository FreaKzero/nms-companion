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
  Summary: string;
}

const usePositionStore = create<PositionStoreState>()((set) => ({
  ...defState,
  getCurrent: async () => {
    set({ ...defState });
    electron.ipcRenderer.on('GET_LIST_EXEC', (_evt, arg) => {
      const f = arg as unknown as PositionType;
      set({ loading: false, ...f });
    });

    electron.ipcRenderer.send('GET_LIST');
  }
}));

export default usePositionStore;
