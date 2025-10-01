// import { ipcRenderer } from 'electron';
import { v4 } from 'uuid';
import { create } from 'zustand';

import { Nullable } from './apiInterfaces';

import getDB from '../lib/db';

const COLLECTION = 'list';

export interface ListState {
  key?: string;
  id?: string;
  GalaxyName: string;
  PortalCode: string;
  ShareCode: string;
  Description: string;
  Screenshot: string;
  GalaxyIndex: number;
  Tag: string;
}

interface iListStore {
  loading: boolean;
  entries: ListState[];
  add: (item: ListState, file: Nullable<ArrayBuffer>) => Promise<void>;
  delete: (key: string) => Promise<void>;
  getAll: () => Promise<void>;
}

const useListStore = create<iListStore>()((set, get) => ({
  loading: true,
  entries: [],

  add: async (item: ListState, file: Nullable<ArrayBuffer>) => {
    const ID = v4();

    const entry = {
      id: ID,
      ...item
    };

    if (file) {
      const fileName = await electron.ipcRenderer.invoke('SAVE_SCREEN', file, ID);
      entry.Screenshot = fileName;
    }

    await getDB().collection(COLLECTION)
      .add(entry);

    set({ loading: false, entries: [...get().entries, entry] });
  },

  delete: async (key: string) => {
    await getDB().collection(COLLECTION)
      .doc({ id: key })
      .delete();

    set({ loading: false, entries: get().entries.filter((item) => item.id !== key) });
  },

  getAll: async () => {
    const list = await getDB().collection(COLLECTION)
      .get();

    set({ loading: false, entries: list });
  }

}));

export default useListStore;
