import { writeFile } from 'node:fs';
import path from 'node:path';

import getSave, { createFrigateMissions, createPosition, createSettlementMissions } from '@/app/lib/getNmsSave';
import OptionManager from '@/app/lib/OptionManager';

import { app, ipcMain, nativeImage } from 'electron';

export interface PositionType {
  Raw: RawType;
  PortalCode: string;
  GalaxyIndex: number;
  GalaxyName: string;
  ShareCode: string;
  Summary: string;
}

interface RawType {
  x: number;
  y: number;
  z: number;
  planet: number;
  solarSystem: number;
  galaxy: number;
}

const OPTIONS = OptionManager.load();

const registerNmsIpc = () => {
  ipcMain.on('GET_LIST', (ev) => {
    const x = getSave(OPTIONS.savePath);
    const POS = createPosition(x.BaseContext.PlayerStateData.UniverseAddress, x.BaseContext.PlayerStateData.SaveSummary);
    ev.sender.send('GET_LIST_EXEC', POS);
  });

  ipcMain.handle('SAVE_SCREEN', async (_ev, arrayBuffer: ArrayBuffer, id: string) => {
    try {
      const buffer = Buffer.from(arrayBuffer);
      const image = nativeImage.createFromBuffer(buffer);
      const resized = image.resize({ width: 500 });
      const outBuffer = resized.toPNG();
      const outPath = path.join(app.getPath('desktop'), `${id}.png`);

      await writeFile(outPath, outBuffer, (err) => {
        if (err) {
          console.log(err);
        }
      });

      return outPath;
    } catch (err) {
      console.error('Fehler beim Resizen:', err);
    }
  });

  ipcMain.on('GET_TASKS', (ev) => {
    const x = getSave(OPTIONS.savePath);

    const frigates = createFrigateMissions(x.BaseContext);
    const settlements = createSettlementMissions(x.BaseContext);

    const output = {
      frigates,
      settlements
    };

    ev.sender.send('GET_TASKS_EXEC', output);
  });
};

export default registerNmsIpc;
