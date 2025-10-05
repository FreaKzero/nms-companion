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
    set({ ...defState, loading: true });

    try {
      const missions: MissionsType = await electron.ipcRenderer.invoke('GET_TASKS');
      set({ ...missions, loading: false });
    } catch (err) {
      console.error('Fehler beim Laden der Missionen:', err);
      set({ ...defState, loading: false });
    }
  }
}));

export default useMissionsStore;
