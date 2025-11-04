import { existsSync, mkdirSync, unlinkSync, writeFile, writeFileSync } from 'node:fs';
import path from 'node:path';

import OptionManager, { OptionManagerType } from '@/app/lib/OptionManager';

import { ipcMain, app, shell, nativeImage } from 'electron';

import getSave from '../app/lib/getNmsSave';

let OPTIONS = OptionManager.load();

const registerSystemIpc = () => {
  ipcMain.handle('GET_SETTINGS', () => {
    OPTIONS = OptionManager.load();
    return OPTIONS;
  });

  ipcMain.handle('SHOW_FILE', (_ev, filePath: string) => shell.showItemInFolder(filePath));

  ipcMain.handle('SET_SETTINGS', (_ev, data: OptionManagerType) => {
    OPTIONS = OptionManager.update(data);
    return OPTIONS;
  });

  ipcMain.handle('SAVE_SCREEN', async (_ev, arrayBuffer: ArrayBuffer, id: string) => {
    try {
      const buffer = Buffer.from(arrayBuffer);
      const image = nativeImage.createFromBuffer(buffer);
      const resized = image.resize({ width: Number(OPTIONS.picSize) });
      const outBuffer = resized.toPNG();
      const outPath = path.join(OPTIONS.locationThumbDir, `${id}.png`);

      if (!existsSync(OPTIONS.locationThumbDir)) {
        mkdirSync(OPTIONS.locationThumbDir);
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
    const saveData = getSave(OPTIONS.savePath);
    writeFileSync('./devSave.json', JSON.stringify(saveData, null, 2));
  });

  ipcMain.handle('OPEN_URL', (_ev, url: string) => {
    shell.openExternal(url);
  });

  ipcMain.handle('EMPTY_CACHE', () => {
    const caches = ['cmcache.json'];

    caches.forEach((f) => {
      const cacheFile = path.join(OPTIONS.cacheDir, f);
      if (existsSync(cacheFile)) {
        unlinkSync(cacheFile);
      }
    });
  });

  return OPTIONS;
};

export default registerSystemIpc;
