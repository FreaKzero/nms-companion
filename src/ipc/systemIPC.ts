import OptionManager, { OptionManagerType } from '@/app/lib/OptionManager';

import { ipcMain, app } from 'electron';

let OPTIONS = OptionManager.load();

const registerSystemIpc = () => {
  ipcMain.handle('GET_SETTINGS', (_ev) => {
    OPTIONS = OptionManager.load();
    return OPTIONS;
  });

  ipcMain.handle('SAVE_SETTINGS', (_ev, data: OptionManagerType) => {
    OPTIONS = OptionManager.update(data);
    return OPTIONS;
  });

  ipcMain.handle('APP_RESTART', () => {
    app.relaunch();
    app.exit(0);
  });
};

export default registerSystemIpc;
