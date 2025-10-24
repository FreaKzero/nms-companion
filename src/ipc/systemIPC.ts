import { writeFileSync } from 'node:fs';

import OptionManager, { OptionManagerType } from '@/app/lib/OptionManager';
import { fetchReddit, parseRSS } from '@/app/lib/redditParser';

import { ipcMain, app, shell } from 'electron';

import getSave from '../app/lib/getNmsSave';

let OPTIONS = OptionManager.load();

const registerSystemIpc = () => {
  ipcMain.handle('GET_SETTINGS', () => {
    OPTIONS = OptionManager.load();
    return OPTIONS;
  });

  ipcMain.handle('SET_SETTINGS', (_ev, data: OptionManagerType) => {
    OPTIONS = OptionManager.update(data);
    return OPTIONS;
  });

  ipcMain.handle('APP_RESTART', () => {
    app.relaunch();
    app.exit(0);
  });

  ipcMain.handle('DEBUG_SAVE', () => {
    const saveData = getSave(OPTIONS.savePath);
    writeFileSync('./devSave.json', JSON.stringify(saveData, null, 2));
  });

  ipcMain.handle('OPEN_URL', (_ev, url: string) => {
    shell.openExternal(url);
  });

  ipcMain.handle('GET_REDDIT', async (_ev, lastRead: Date) => {
    const xml = await fetchReddit('NMSCoordinateExchange');
    const posts = parseRSS(xml, lastRead);
    const cleanposts = posts.sort((a, b) => {
      return b.published.getTime() - a.published.getTime();
    }).slice(1);
    return cleanposts;
  });

  return OPTIONS;
};

export default registerSystemIpc;
