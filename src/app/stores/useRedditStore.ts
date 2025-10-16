import { create } from 'zustand';

import { redditFeed } from '../lib/redditParser';

interface RedditStoreState {
  loading: boolean;
  error: boolean;
  entries: redditFeed[];
  newEntries: number;
  lastRead: Date;
  getFeed: (subreddit?: string) => Promise<void>;
  setRead: () => void;
}

const defState: Omit<RedditStoreState, 'getFeed' | 'setRead'> = {
  loading: true,
  error: false,
  newEntries: 0,
  lastRead: new Date(),
  entries: []
};

const useRedditStore = create<RedditStoreState>()((set, get) => ({
  ...defState,
  setRead: () => {
    set({ lastRead: new Date() });
  },
  getFeed: async () => {
    set({ loading: true, error: false });

    try {
      const entries: redditFeed[] = await electron.ipcRenderer.invoke('GET_REDDIT');
      const newEntries = entries.filter((item) => get().lastRead.getTime() <= item.published.getTime()).length;

      set({ entries, newEntries, loading: false, error: false });
    } catch (err) {
      console.error('RSS Fetch Error:', err);
      set({ ...defState, loading: false, error: true });
    }
  }
}));

export default useRedditStore;
