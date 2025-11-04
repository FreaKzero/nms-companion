import { create } from 'zustand';

import { FrigateType, SettlementType, PositionType } from '../lib/getNmsSave';

interface SaveStoreState {
  loading: boolean;
  error: boolean;

  missions: {
    frigates: FrigateType[];
    settlements: SettlementType[];
    needAction: number;
  };
  position: PositionType;

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
  position: {
    GalaxyName: '',
    PortalCode: '',
    ShareCode: '',
    GalaxyIndex: 0,
    Summary: ''
  }
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
      const saveData: {
        missions: {
          frigates: FrigateType[];
          settlements: SettlementType[];
        };
        position: PositionType;
      } = await electron.ipcRenderer.invoke('GET_SAVEFILE');

      set({
        missions: {
          ...saveData.missions,
          needAction: calculateNeedAction(saveData.missions.frigates, saveData.missions.settlements)
        },
        position: saveData.position,
        loading: false,
        error: false
      });
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
