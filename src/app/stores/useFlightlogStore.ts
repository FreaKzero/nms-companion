import { create } from 'zustand';

export interface FlightLogItem {
  ID: string;
  Summary: string;
  GalaxyIndex: number;
  GalaxyName: string | null;
  PortalCode: string;
  Created: string;
}

interface FlightlogStoreState {
  loading: boolean;
  error: boolean;
  items: FlightLogItem[];
  loadAll: () => Promise<void>;
  add: (summary: string, galaxyIndex: number, portalCode: string) => Promise<void>;
  truncate: () => Promise<void>;
}

const defState = {
  loading: false,
  error: false,
  items: [] as FlightLogItem[]
};

const useFlightlogStore = create<FlightlogStoreState>((set) => ({
  ...defState,

  loadAll: async () => {
    set({ ...defState, loading: true });
    try {
      const rows: FlightLogItem[] = await electron.ipcRenderer.invoke('db.flightlog.getAll');
      set({ items: rows, loading: false, error: false });
    } catch (_err) {
      set({ ...defState, loading: false, error: true });
    }
  },

  add: async (summary: string, galaxyIndex: number, portalCode: string) => {
    if (summary.includes('Space Anomaly')) {
      return;
    }

    set({ ...defState, loading: true });
    try {
      await electron.ipcRenderer.invoke('db.flightlog.add', {
        Summary: summary,
        GalaxyIndex: galaxyIndex,
        PortalCode: portalCode
      });

      const rows: FlightLogItem[] = await electron.ipcRenderer.invoke('db.flightlog.getAll');
      set({ items: rows, loading: false, error: false });
    } catch (_err) {
      set({ ...defState, loading: false, error: true });
    }
  },

  truncate: async () => {
    set({ ...defState, loading: true });
    try {
      await electron.ipcRenderer.invoke('db.flightlog.truncate');
      set({ items: [], loading: false, error: false });
    } catch (_err) {
      set({ ...defState, loading: false, error: true });
    }
  }
}));

export default useFlightlogStore;
