import { create } from 'zustand';

import { FrigateType, SettlementType } from '../lib/getNmsSave';

export interface MissionsType {
  frigates: FrigateType[];
  settlements: SettlementType[];
}

interface MissionsStoreState {
  loading: boolean;
  frigates: FrigateType[];
  settlements: SettlementType[];
  getMissions: () => void;
}

const defState: Omit<MissionsStoreState, 'getMissions'> = {
  loading: true,
  frigates: [],
  settlements: []
};

const useMissionsStore = create<MissionsStoreState>()((set) => ({
  ...defState,
  getMissions: async () => {
    set({ ...defState });
    electron.ipcRenderer.on('GET_TASKS_EXEC', (_evt, entries: MissionsType) => {
      set({
        loading: false,
        ...entries
      });
    });

    electron.ipcRenderer.send('GET_TASKS');
  }

}));

export default useMissionsStore;
