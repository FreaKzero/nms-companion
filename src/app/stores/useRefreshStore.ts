import { create } from 'zustand';

import useMissionsStore from './useMissionsStore';

interface AutoRefreshStore {
  autoRefresh: boolean;
  toggleAutoRefresh: () => void;
  start: () => void;
  stop: () => void;
}

export const useAutoRefreshStore = create<AutoRefreshStore>((set, get) => {
  let intervalId: number | undefined;
  let isRunning = false;

  const getMissions = async () => {
    if (isRunning) return;
    isRunning = true;
    try {
      await useMissionsStore.getState().getMissions();
    } finally {
      isRunning = false;
    }
  };

  const start = () => {
    if (!intervalId) {
      intervalId = window.setInterval(getMissions, 2 * 60 * 1000);
      set({ autoRefresh: true });
    }
  };

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
      set({ autoRefresh: false });
    }
  };

  const toggleAutoRefresh = () => {
    if (get().autoRefresh) stop();
    else start();
  };
  return { autoRefresh: false, toggleAutoRefresh, start, stop };
});
