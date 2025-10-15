import { writeFileSync } from 'node:fs';

import OptionManager, { OptionManagerType } from '@/app/lib/OptionManager';
import { fetchReddit, parseRSS } from '@/app/lib/redditParser';

import { ipcMain, app } from 'electron';

import getSave from '../app/lib/getNmsSave';

let OPTIONS = OptionManager.load();

const registerSystemIpc = () => {
  ipcMain.handle('GET_SETTINGS', (_ev) => {
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

  ipcMain.handle('GET_REDDIT', async () => {
    const xml = await fetchReddit('NMSCoordinateExchange');
    const posts = parseRSS(xml);
    const cleanposts = posts.slice(2);  // first 2 are always announcements
    return cleanposts;
  });
};

export default registerSystemIpc;
