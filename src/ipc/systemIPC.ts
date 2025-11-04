import { existsSync, mkdirSync, unlinkSync, writeFile, writeFileSync } from 'node:fs';
import path from 'node:path';

import OptionManager, { OptionManagerType } from '@/app/lib/OptionManager';

import { ipcMain, app, shell, nativeImage } from 'electron';

import getSave from '../app/lib/getNmsSave';

const registerSystemIpc = (opt: OptionManagerType) => {
  ipcMain.handle('GET_SETTINGS', () => {
    return opt;
  });

  ipcMain.handle('SET_SETTINGS', (_ev, data: OptionManagerType) => {
    const newOpt = OptionManager.update(data);
    return newOpt;
  });

  ipcMain.handle('SHOW_FILE', (_ev, filePath: string) => shell.showItemInFolder(filePath));

  ipcMain.handle('SAVE_SCREEN', async (_ev, arrayBuffer: ArrayBuffer, id: string) => {
    try {
      const buffer = Buffer.from(arrayBuffer);
      const image = nativeImage.createFromBuffer(buffer);
      const resized = image.resize({ width: Number(opt.picSize) });
      const outBuffer = resized.toPNG();
      const outPath = path.join(opt.locationThumbDir, `${id}.png`);

      if (!existsSync(opt.locationThumbDir)) {
        mkdirSync(opt.locationThumbDir);
      }

      await writeFile(outPath, outBuffer, (err) => {
        if (err) {
          console.log(err);
        }
      });

      return outPath;
    } catch (err) {
      console.error('Save Screen Error:', err);
    }
  });

  ipcMain.handle('APP_RESTART', () => {
    app.relaunch();
    app.exit(0);
  });

  ipcMain.handle('DEBUG_SAVE', () => {
    const saveData = getSave(opt.savePath);
    writeFileSync('./devSave.json', JSON.stringify(saveData, null, 2));
  });

  ipcMain.handle('OPEN_URL', (_ev, url: string) => {
    shell.openExternal(url);
  });

  ipcMain.handle('EMPTY_CACHE', () => {
    const caches = ['cmcache.json'];

    caches.forEach((f) => {
      const cacheFile = path.join(opt.cacheDir, f);
      if (existsSync(cacheFile)) {
        unlinkSync(cacheFile);
      }
    });
  });
};

export default registerSystemIpc;
