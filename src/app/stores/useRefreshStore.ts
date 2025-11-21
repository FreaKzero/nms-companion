import { create } from 'zustand';

import useMetaStore from './useMetaStore';
import useRedditStore from './useRedditStore';
import useSaveStore from './useSaveStore';

interface AutoRefreshStore {
  autoRefresh: boolean;
  toggleAutoRefresh: () => void;
  start: () => void;
  stop: () => void;
}

export const useAutoRefreshStore = create<AutoRefreshStore>((set, get) => {
  let intervalId: number | undefined;
  let isRunning = false;

  const getData = async () => {
    if (isRunning) return;
    isRunning = true;
    try {
      await useMetaStore.getState().getCommunityMission();
      await useSaveStore.getState().getSave();
      await useRedditStore.getState().getFeed();
    } finally {
      isRunning = false;
    }
  };

  const start = () => {
    getData();
    if (!intervalId) {
      intervalId = window.setInterval(getData, 2 * 60 * 1000);
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
