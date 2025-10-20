import { existsSync, promises as fs } from 'fs';

import OptionManager from '@/app/lib/OptionManager';

import { ipcMain } from 'electron';

import fishtrackerDef from '../app/mappings/fishtracker.json';

const OPTIONS = OptionManager.load();

export interface FishType {
  id: number;
  fish: string;
  biome: string;
  onlyNight?: boolean;
  done: boolean;
  onlyDay?: boolean;
  onlyExpedition?: boolean;
  value: string;
  size: string;
}

const registerFishTrackerIpc = () => {
  ipcMain.handle('FISHTRACKER-GET', async () => {
    if (!existsSync(OPTIONS.fishtrackerFile)) {
      try {
        await fs.writeFile(OPTIONS.fishtrackerFile, JSON.stringify(fishtrackerDef), 'utf8');
        return fishtrackerDef;
      } catch (_e) {
        return { error: true };
      }
    }

    try {
      const tracker = await fs.readFile(OPTIONS.fishtrackerFile, 'utf-8');
      return JSON.parse(tracker);
    } catch (_e) {
      return { error: true };
    }
  });

  ipcMain.handle('FISHTRACKER-SET', async (_ev, fishes: FishType[]) => {
    try {
      await fs.writeFile(OPTIONS.fishtrackerFile, JSON.stringify(fishes), 'utf-8');
    } catch (_e) {
      return { error: true };
    }
  });
};

export default registerFishTrackerIpc;
