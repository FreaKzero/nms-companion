import { create } from 'zustand';

import usePositionStore from './usePositionStore';
import useRedditStore from './useRedditStore';

import { FrigateType, PositionType, SettlementType } from '../lib/getNmsSave';

export interface MissionsType {
  error?: any;
  frigates: FrigateType[];
  settlements: SettlementType[];
  position: PositionType;
}

interface MissionsStoreState {
  loading: boolean;
  error: boolean;
  frigates: FrigateType[];
  settlements: SettlementType[];
  getMissions: () => void;
}

const defState: Omit<MissionsStoreState, 'getMissions'> = {
  error: false,
  loading: true,
  frigates: [],
  settlements: []
};

const useMissionsStore = create<MissionsStoreState>()((set) => ({
  ...defState,
  getMissions: async () => {
    set({ loading: true });

    try {
      const mis: MissionsType = await electron.ipcRenderer.invoke('GET_MISSIONS');
      if (mis.error) {
        set({ ...defState, loading: false, error: true });
        return;
      }
      set({ frigates: mis.frigates, settlements: mis.settlements, loading: false });
      await usePositionStore.getState().setCurrent(mis.position);
      await useRedditStore.getState().getFeed();
    } catch (_err) {
      set({ ...defState, loading: false, error: true });
    }
  }
}));

export default useMissionsStore;
