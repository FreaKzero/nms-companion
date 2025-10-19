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

const loadLastRead = (): Date => {
  const stored = localStorage.getItem('reddit_lastRead');
  return stored ? new Date(stored) : new Date();
};

const defState: Omit<RedditStoreState, 'getFeed' | 'setRead'> = {
  loading: true,
  error: false,
  newEntries: 0,
  lastRead: loadLastRead(),
  entries: []
};

const useRedditStore = create<RedditStoreState>()((set, get) => ({
  ...defState,

  setRead: () => {
    const now = new Date();
    localStorage.setItem('reddit_lastRead', now.toISOString());
    set({ lastRead: now });
  },

  getFeed: async () => {
    set({ loading: true, error: false });

    try {
      const entries: redditFeed[] = await electron.ipcRenderer.invoke('GET_REDDIT', loadLastRead());
      const newEntries = entries.filter((item) => get().lastRead.getTime() <= item.published.getTime()).length;

      set({ entries, newEntries, loading: false, error: false });
    } catch (_err) {
      set({ ...defState, loading: false, error: true });
    }
  }
}));

export default useRedditStore;
