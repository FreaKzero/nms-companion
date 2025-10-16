import { create } from 'zustand';

import { redditFeed } from '../lib/redditParser';

interface RedditStoreState {
  loading: boolean;
  error: boolean;
  entries: redditFeed[];
  newEntries: number;
  getFeed: (subreddit?: string) => Promise<void>;
}

const defState: Omit<RedditStoreState, 'getFeed'> = {
  loading: true,
  error: false,
  newEntries: 0,
  entries: []
};

const useRedditStore = create<RedditStoreState>()((set) => ({
  ...defState,

  getFeed: async () => {
    set({ loading: true, error: false });

    try {
      const entries: redditFeed[] = await electron.ipcRenderer.invoke('GET_REDDIT');

      const now = Date.now();
      const THIRTY_MIN = 30 * 60 * 1000;

      const newEntries = entries.filter((item) => now - item.published.getTime() <= THIRTY_MIN).length;

      set({ entries, newEntries, loading: false, error: false });
    } catch (err) {
      console.error('RSS Fetch Error:', err);
      set({ ...defState, loading: false, error: true });
    }
  }
}));

export default useRedditStore;
