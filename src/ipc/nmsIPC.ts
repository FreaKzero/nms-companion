import http from 'http';
import https from 'https';
import { existsSync, mkdirSync, writeFile } from 'node:fs';
import path from 'node:path';

import getSave, { createFrigateMissions, createPosition, createSettlementMissions } from '@/app/lib/getNmsSave';
import OptionManager from '@/app/lib/OptionManager';

import { ipcMain, nativeImage } from 'electron';

export interface PositionType {
  error?: boolean;
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
  ipcMain.handle('GET_POSITION', async () => {
    try {
      const saveData = getSave(OPTIONS.savePath);
      const position: PositionType = createPosition(
        saveData.BaseContext.PlayerStateData.UniverseAddress,
        saveData.BaseContext.PlayerStateData.SaveSummary
      );
      return position;
    } catch (err) {
      return { error: err };
    }
  });

  ipcMain.handle('ARRAYBUFFER_SCREEN_URL', async (_ev, url: string) => {
    try {
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client
          .get(url, (res) => {
            if (res.statusCode !== 200) {
              reject(new Error(`Request failed with status ${res.statusCode}`));
              return;
            }

            const data: Uint8Array[] = [];
            res.on('data', (chunk) => data.push(chunk));
            res.on('end', () => resolve(Buffer.concat(data).buffer));
          })
          .on('error', reject);
      });

      return arrayBuffer;
    } catch (err) {
      console.error('Save Screen Error:', err);
    }
  });

  ipcMain.handle('SAVE_SCREEN', async (_ev, arrayBuffer: ArrayBuffer, id: string) => {
    try {
      const buffer = Buffer.from(arrayBuffer);
      const image = nativeImage.createFromBuffer(buffer);
      const resized = image.resize({ width: 500 });
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

  ipcMain.handle('GET_MISSIONS', async () => {
    try {
      const saveData = getSave(OPTIONS.savePath);

      const frigates = createFrigateMissions(saveData.BaseContext);
      const settlements = OPTIONS.charName.trim() !== '' ? createSettlementMissions(saveData.BaseContext, OPTIONS.charName) : [];
      const position: PositionType = createPosition(
        saveData.BaseContext.PlayerStateData.UniverseAddress,
        saveData.BaseContext.PlayerStateData.SaveSummary
      );

      return { frigates, settlements, position };
    } catch (err) {
      return { error: err };
    }
  });
};

export default registerNmsIpc;
