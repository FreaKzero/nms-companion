import http from 'http';
import https from 'https';
import fs from 'node:fs';
import path from 'node:path';

import getSave, { createBases, createFrigateMissions, createPosition, createSettlementMissions, FrigateType, SettlementType } from '@/app/lib/getNmsSave';
import { OptionManagerType } from '@/app/lib/OptionManager';

import { ipcMain } from 'electron';

export interface CommunityMissionType {
  missionId: number;
  currentTier: number;
  percentage: number;
  totalTiers: number;
}
export interface PositionType {
  error?: boolean;
  PortalCode: string;
  GalaxyIndex: number;
  GalaxyName: string;
  ShareCode: string;
  Summary: string;
}

export interface BasesType {
  GalaxyIndex: number;
  name: string;
}

export interface SaveType {
  loading: boolean;
  error: boolean;

  missions: {
    frigates: FrigateType[];
    settlements: SettlementType[];
  };
  position: PositionType;
  bases: BasesType[];
}

const CACHE_TTL = 1 * 60 * 60 * 1000;

const registerNmsIpc = (opt: OptionManagerType) => {
  ipcMain.handle('GET_COMMUNITYMISSION', async (_ev) => {
    const CACHE_PATH = path.join(opt.cacheDir, 'cmcache.json');

    if (!fs.existsSync(opt.cacheDir)) {
      fs.mkdirSync(opt.cacheDir, { recursive: true });
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

  ipcMain.handle('GET_SAVEFILE', async () => {
    try {
      const saveData = await getSave(opt.savePath);

      const bases = createBases(saveData.BaseContext);
      const frigates = createFrigateMissions(saveData.BaseContext);
      const settlements = opt.charName.trim() !== '' ? createSettlementMissions(saveData.BaseContext, opt.charName) : [];
      const position: PositionType = createPosition(
        saveData.BaseContext.PlayerStateData.UniverseAddress,
        saveData.BaseContext.PlayerStateData.SaveSummary
      );

      return {
        missions: {
          frigates, settlements
        },
        position,
        bases
      };
    } catch (err) {
      return { error: err };
    }
  });
};

export default registerNmsIpc;
