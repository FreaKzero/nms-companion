import OptionManager from '@/app/lib/OptionManager';
import { fetchReddit, parseRSS } from '@/app/lib/redditParser';

import { ipcMain } from 'electron';

const OPTIONS = OptionManager.load();

const registerRedditIPC = () => {
  ipcMain.handle('GET_REDDIT', async (_ev, lastRead: Date) => {
    const xml = await fetchReddit(OPTIONS.redditFeed);
    const posts = parseRSS(xml, lastRead);
    const cleanposts = posts.sort((a, b) => {
      return b.published.getTime() - a.published.getTime();
    }).slice(1);
    return cleanposts;
  });

  ipcMain.handle('SEARCH_REDDIT', async (_ev, search: string) => {
    const xml = await fetchReddit(OPTIONS.redditFeed, search);
    const posts = parseRSS(xml);
    return posts;
  });
};

export default registerRedditIPC;
