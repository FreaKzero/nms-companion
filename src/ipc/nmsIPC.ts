// import { writeFileSync } from 'node:fs';

import getSave, { createFrigateMissions, createPosition, createSettlementMissions } from '@/app/lib/getNmsSave';

import { ipcMain } from 'electron';

// TestBlock

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

const registerNmsIpc = () => {
  const savePath = 'C:/Users/FreaKzero/AppData/Roaming/HelloGames/NMS/st_76561197991901848/save3.hg';
  ipcMain.on('GET_LIST', (ev) => {
    const x = getSave(savePath);

    const POS = createPosition(x.BaseContext.PlayerStateData.UniverseAddress, x.BaseContext.PlayerStateData.SaveSummary);
    ev.sender.send('GET_LIST_EXEC', POS);
  });

  ipcMain.on('GET_TASKS', (ev) => {
    const x = getSave(savePath);

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
