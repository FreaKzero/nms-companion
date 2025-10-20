import { create } from 'zustand';

import { OptionManagerType } from '../lib/OptionManager';

interface OptionManagerStoreState extends OptionManagerType {
  setSettings: (options: Partial<OptionManagerType>) => void;
  getSettings: () => void;
}

const defState: OptionManagerType = {
  savePath: '',
  locationThumbDir: '',
  databasePath: '',
  fishtrackerFile: '',
  charName: ''
};

const useOptionManagerStore = create<OptionManagerStoreState>((set) => ({
  ...defState,
  setSettings: async (options) => {
    try {
      await electron.ipcRenderer.invoke('SET_SETTINGS', options);
      set((state) => ({ ...state, ...options }));
    } catch (err) {
      console.error('Error saving options:', err);
    }
  },
  getSettings: async () => {
    try {
      const settings: OptionManagerType = await electron.ipcRenderer.invoke('GET_SETTINGS');
      set({ ...settings });
    } catch (err) {
      console.error('Error loading options:', err);
      set({ ...defState });
    }
  }
}));

export default useOptionManagerStore;
