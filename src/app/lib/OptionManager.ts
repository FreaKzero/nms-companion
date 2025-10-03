import fs from 'node:fs';
import path from 'node:path';

import { app } from 'electron';

export interface OptionManagerType {
  savePath: string;
  locationThumbDir: string;
}

const DEFAULT: OptionManagerType = {
  savePath: '',
  locationThumbDir: ''
};

const OptionManager = {
  update: (newData: OptionManagerType) => {
    fs.writeFileSync(path.join(app.getPath('home'), 'nms-log-settings.json'), JSON.stringify(newData, null, 2));
    return newData;
  },
  load: () => {
    const setJsonFile = path.join(app.getPath('home'), 'nms-log-settings.json');
    if (!fs.existsSync(setJsonFile)) {
      fs.writeFileSync(setJsonFile, JSON.stringify(DEFAULT, null, 2));
      return DEFAULT;
    }

    const settings = JSON.parse(fs.readFileSync(setJsonFile, 'utf-8'));
    return settings;
  }
};

export default OptionManager;
