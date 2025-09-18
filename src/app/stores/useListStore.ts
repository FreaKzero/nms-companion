import { create } from 'zustand';

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
  Tag: string;
}

interface iListStore {
  loading: boolean;
  entries: ListState[];
  add: (item: ListState) => Promise<ListState>;
  delete: (key: string) => Promise<void>;
  getAll: () => Promise<void>;
}

const useListStore = create<iListStore>()((set, get) => ({
  loading: true,
  entries: [],

  add: async (item: ListState) => {
    const res = await getDB().collection(COLLECTION)
      .add(item);

    const newItem = {
      id: res.data.key,
      ...res.data.data
    };

    await getDB().collection(COLLECTION)
      .doc(newItem.id)
      .set(newItem);

    set({ loading: false, entries: [...get().entries, newItem] });
    return newItem;
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
