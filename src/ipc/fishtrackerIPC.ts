import { existsSync, promises as fs } from 'fs';

import { OptionManagerType } from '@/app/lib/OptionManager';

import { ipcMain } from 'electron';

import fishtrackerDef from '../app/mappings/fishtracker.json';

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
  depth: number;
}

const registerFishTrackerIpc = (opt: OptionManagerType) => {
  ipcMain.handle('FISHTRACKER-GET', async () => {
    if (!existsSync(opt.fishtrackerFile)) {
      try {
        await fs.writeFile(opt.fishtrackerFile, JSON.stringify(fishtrackerDef), 'utf8');
        return fishtrackerDef;
      } catch (_e) {
        return { error: true };
      }
    }

    try {
      const tracker = await fs.readFile(opt.fishtrackerFile, 'utf-8');
      return JSON.parse(tracker);
    } catch (_e) {
      return { error: true };
    }
  });

  ipcMain.handle('FISHTRACKER-SET', async (_ev, fishes: FishType[]) => {
    try {
      await fs.writeFile(opt.fishtrackerFile, JSON.stringify(fishes), 'utf-8');
    } catch (_e) {
      return { error: true };
    }
  });
};

export default registerFishTrackerIpc;
