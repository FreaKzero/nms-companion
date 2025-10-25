import { create } from 'zustand';

import usePositionStore from './usePositionStore';
import useRedditStore from './useRedditStore';
import useSupplyStore from './useSupplyStore';

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
  needAction: number;
  getMissions: () => void;
}

const defState: Omit<MissionsStoreState, 'getMissions'> = {
  error: false,
  loading: true,
  needAction: 0,
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

      const needActionSettle = mis.settlements.filter((settle) => (settle.buildActive === false &&
        settle.buildClass !== 'None') ||
        settle.needsJudgement === true).length;

      const needActionFrigate = mis.frigates.filter((fri) => fri.done === fri.events).length;

      const needAction = needActionFrigate + needActionSettle;

      const settlements = mis.settlements.filter((settle) => settle.buildActive === true ||
        settle.buildClass !== 'None' ||
        settle.needsJudgement === true ||
        settle.produce > 0);

      set({ frigates: mis.frigates, settlements, needAction, loading: false });
      await usePositionStore.getState().setCurrent(mis.position);
      await useRedditStore.getState().getFeed();
      await useSupplyStore.getState().getAll();
    } catch (_err) {
      set({ ...defState, loading: false, error: true });
    }
  }
}));

export default useMissionsStore;
