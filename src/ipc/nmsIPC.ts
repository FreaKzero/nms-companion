import http from 'http';
import https from 'https';
import fs from 'node:fs';
import path from 'node:path';

import getSave, { createFrigateMissions, createPosition, createSettlementMissions } from '@/app/lib/getNmsSave';
import OptionManager from '@/app/lib/OptionManager';

import { ipcMain } from 'electron';

export interface CommunityMissionType {
  missionId: number;
  currentTier: number;
  percentage: number;
  totalTiers: number;
}
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
const CACHE_TTL = 0.5 * 60 * 60 * 1000;

const registerNmsIpc = () => {
  ipcMain.handle('GET_COMMUNITYMISSION', async (_ev) => {
    const CACHE_PATH = path.join(OPTIONS.cacheDir, 'cmcache.json');

    if (!fs.existsSync(OPTIONS.cacheDir)) {
      fs.mkdirSync(OPTIONS.cacheDir, { recursive: true });
    }

    try {
      const stats = fs.statSync(CACHE_PATH);
      const age = Date.now() - stats.mtimeMs;

      if (age < CACHE_TTL) {
        const cachedData = fs.readFileSync(CACHE_PATH, 'utf-8');
        return JSON.parse(cachedData);
      }
    } catch {
    // please fetch
    }

    const options = { headers: { 'User-Agent': 'nms-log/1.0' } };
    const json: string = await new Promise((resolve, reject) => {
      https.get('https://api.nmsassistant.com/HelloGames/CommunityMission', options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });

    try {
      fs.writeFileSync(CACHE_PATH, json, 'utf-8');
    } catch (err) {
      console.warn('⚠️ Cache write failed:', err);
    }

    return JSON.parse(json) as CommunityMissionType;
  });

  ipcMain.handle('GET_POSITION', async () => {
    try {
      const saveData = await getSave(OPTIONS.savePath);
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

  ipcMain.handle('GET_MISSIONS', async () => {
    try {
      const saveData = await getSave(OPTIONS.savePath);

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
