import fs from 'node:fs';
import path from 'node:path';

import { app } from 'electron';

export interface OptionManagerType {
  savePath: string;
  locationThumbDir: string;
  databasePath: string;
  charName: string;
  fishtrackerFile: string;
  redditFeed: string;
}

const BASE_DIR = path.join(app.getPath('home'), '.nms-log');

const DEFAULT: OptionManagerType = {
  savePath: '',
  locationThumbDir: path.join(BASE_DIR, 'thumbs'),
  databasePath: path.join(BASE_DIR, 'nms-log.sqlite'),
  fishtrackerFile: path.join(BASE_DIR, 'fishtracker.json'),
  charName: '',
  redditFeed: 'NMSCoordinateExchange'
};

if (!fs.existsSync(BASE_DIR)) {
  fs.mkdirSync(BASE_DIR, { recursive: true });
}

const SETTINGS_FILE = path.join(BASE_DIR, 'nms-log-settings.json');

const OptionManager = {
  update: (newData: OptionManagerType) => {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(newData, null, 2));
    return newData;
  },
  load: (): OptionManagerType => {
    if (!fs.existsSync(SETTINGS_FILE)) {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT, null, 2));
      return DEFAULT;
    }

    const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
    return settings;
  }
};

export default OptionManager;
