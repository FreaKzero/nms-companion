import { OptionManagerType } from '@/app/lib/OptionManager';
import { fetchReddit, parseRSS } from '@/app/lib/redditParser';

import { ipcMain, shell } from 'electron';

const registerRedditIPC = (opt: OptionManagerType) => {
  ipcMain.handle('GET_REDDIT', async (_ev, lastRead: Date) => {
    const xml = await fetchReddit(opt.redditFeed);
    const posts = parseRSS(xml, lastRead);
    const cleanposts = posts.sort((a, b) => {
      return b.published.getTime() - a.published.getTime();
    }).slice(1);
    return cleanposts;
  });

  ipcMain.handle('SEARCH_REDDIT', async (_ev, search: string) => {
    const xml = await fetchReddit(opt.redditFeed, search);
    const posts = parseRSS(xml);
    return posts;
  });

  ipcMain.handle('OPEN_REDDIT_SHARE', async (_ev, title: string) => {
    shell.openExternal(`https://www.reddit.com/r/${opt.redditFeed}/submit/?type=IMAGE&title=${encodeURI(title)}`);
  });
};

export default registerRedditIPC;
