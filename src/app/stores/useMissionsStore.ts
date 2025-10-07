import { create } from 'zustand';

import usePositionStore from './usePositionStore';

import { FrigateType, PositionType, SettlementType } from '../lib/getNmsSave';

export interface MissionsType {
  frigates: FrigateType[];
  settlements: SettlementType[];
  position: PositionType;
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
      const mis: MissionsType = await electron.ipcRenderer.invoke('GET_MISSIONS');
      set({ frigates: mis.frigates, settlements: mis.settlements, loading: false });
      usePositionStore.getState().setCurrent(mis.position);
    } catch (err) {
      console.error('Fehler beim Laden der Missionen:', err);
      set({ ...defState, loading: false });
    }
  }
}));

export default useMissionsStore;
