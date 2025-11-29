import { SaveType } from '@/ipc/nmsIPC';

import { create } from 'zustand';

import useDiscoveriesStore from './useDiscoveriesStore';
import useFlightlogStore from './useFlightlogStore';

import { FrigateType, SettlementType, PositionType } from '../lib/getNmsSave';

interface SaveStoreState extends SaveType {
  missions: {
    frigates: FrigateType[];
    settlements: SettlementType[];
    needAction: number;
  };
  getSave: () => Promise<void>;
  setFrigates: (frigates: FrigateType[]) => void;
  setSettlements: (settlements: SettlementType[]) => void;
  setPosition: (data: PositionType) => void;
}

const defState: Omit<SaveStoreState, 'getSave' | 'setFrigates' | 'setSettlements' | 'setPosition'> = {
  loading: true,
  error: false,
  missions: {
    frigates: [],
    settlements: [],
    needAction: 0
  },
  bases: [],
  position: {
    GalaxyName: '',
    PortalCode: '',
    ShareCode: '',
    GalaxyIndex: 0,
    Summary: ''
  },
  isMultiplayer: false
};

const calculateNeedAction = (frigates: FrigateType[], settlements: SettlementType[]) => {
  const needActionSettle = settlements.filter((s) => (s.buildActive === false && s.buildClass !== 'None') || s.needsJudgement === true).length;
  const needActionFrigate = frigates.filter((f) => f.done === f.events).length;
  return needActionSettle + needActionFrigate;
};

const useSaveStore = create<SaveStoreState>()((set) => ({
  ...defState,

  getSave: async () => {
    set({ loading: true });
    try {
      const saveData: SaveType = await electron.ipcRenderer.invoke('GET_SAVEFILE');

      set({
        missions: {
          ...saveData.missions,
          needAction: calculateNeedAction(saveData.missions.frigates, saveData.missions.settlements)
        },
        position: saveData.position,
        bases: saveData.bases,
        // isMultiplayer: saveData.isMultiplayer,
        isMultiplayer: false,
        loading: false,
        error: false
      });

      const pos = saveData.position;

      await useDiscoveriesStore.getState().check({
        GalaxyIndex: pos.GalaxyIndex,
        GalaxyName: pos.GalaxyName
      });

      await useFlightlogStore.getState().add(pos.Summary, pos.GalaxyIndex, pos.PortalCode);
    } catch (_err) {
      console.log(_err);
      set({ ...defState, loading: false, error: true });
    }
  },

  setFrigates: (frigates: FrigateType[]) => {
    set((state) => ({
      missions: {
        ...state.missions,
        frigates,
        needAction: calculateNeedAction(frigates, state.missions.settlements)
      }
    }));
  },

  setSettlements: (settlements: SettlementType[]) => {
    set((state) => ({
      missions: {
        ...state.missions,
        settlements,
        needAction: calculateNeedAction(state.missions.frigates, settlements)
      }
    }));
  },

  setPosition: (data: PositionType) => {
    set({ position: data });
  }
}));

export default useSaveStore;
