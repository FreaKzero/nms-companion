import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TimerData {
  id: string;
  label: string;
  endTime: number;
}

interface TimersState {
  timers: TimerData[];

  addTimer: (timer: TimerData) => void;
  removeTimer: (id: string) => void;
  cleanup: () => void;
}

export const useTimersStore = create<TimersState>()(persist(
  (set, get) => ({
    timers: [] as TimerData[],

    addTimer: (timer) => set({ timers: [...get().timers, timer] }),

    removeTimer: (id) => set({ timers: get().timers.filter((t) => t.id !== id) }),

    cleanup: () => set({
      timers: get().timers.filter((t) => t.endTime > Date.now())
    })
  }),
  {
    name: 'timer-storage',
    version: 1
  }
));
