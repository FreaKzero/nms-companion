import { readFile } from 'node:fs/promises';

import { voxelToPortal } from './utils';

import { BaseContext, NMSSave, UniverseAddress } from '../iface/nmssave';
import { GalaxyNames } from '../mappings/GalaxyNames';
import mapping from '../mappings/save.json';

export interface SettlementType {
  buildActive: boolean;
  buildClass: string;
  name: string;
  startTime: Date;
  estimate: Date;
  needsJudgement: boolean;
  judgementType: string; // 'Conflict' | 'StrangerVisit' | 'Policy';
  race: string;
  produce: number;
  buildProgress: number;
}

export interface FrigateType {
  category: string;
  started: Date;
  lastEvent: Date;
  frigates: number;
  fail: number;
  success: number;
  duration: string;
  events: number;
  done: number;
}

export interface PositionType {
  PortalCode: string;
  GalaxyIndex: number;
  GalaxyName: string;
  ShareCode: string;
  Summary: string;
}

// https:// github.com/NMSCD/nms-save-web-editor

export const getGalaxyName = (galaxy: number) => GalaxyNames[galaxy] || `Unknown (${galaxy})`;

export const getGalaxyNumber = (hx: string): number => {
  let hex: string;

  if (hx.startsWith('0x')) {
    hex = hx.slice(2);
  } else {
    hex = Number(hx).toString(16)
      .toUpperCase();
  }

  hex = hex.toUpperCase().padStart(16, '0');
  const b3 = hex.slice(-10, -8);

  return parseInt(b3, 16);
};

export const createBases = (BaseContext: BaseContext) => {
  try {
    const x = BaseContext.PlayerStateData.PersistentPlayerBases
      .filter((i) => i.BaseType.PersistentBaseTypes === 'HomePlanetBase')
      .map((item) => {
        return {
          name: item.Name,
          GalaxyIndex: getGalaxyNumber(String(item.GalacticAddress))
        };
      });

    return x;
  } catch (e) {
    console.log(e);
  }
};

export const createSettlementMissions = (BaseContext: BaseContext, owner: string): SettlementType[] => {
  const x = BaseContext.PlayerStateData.SettlementStatesV2
    .filter((item) => item.Owner.USN === owner)
    .map((item) => {
      const start = item.LastBuildingUpgradesTimestamps[item.NextBuildingUpgradeIndex];
      const NOW = Math.floor(Date.now());
      const produce = item.ProductionState.reduce((acc, cur) => acc + cur.Amount, 0);

      const getEstimate = (timestamp: number, buildClass: string) => {
        const times: Record<string, number> = {
          Settlement_SheriffsOffice: 120,
          Settlement_Small: 1200,
          Settlement_Medium: 3600,
          Settlement_Large: 7200,
          Settlement_LandingZone: 3600,
          Settlement_Market: 7200,
          Settlement_SmallIndustrial: 1200,
          Settlement_Factory: 5730,
          DroneHive: null,
          Settlement_FishPond: 1200,
          Settlement_Bar: 3600,
          Settlement_Tower: 3600,
          Settlement_Farm: 5730,
          Settlement_Double: 3600
        };

        return (timestamp + times[buildClass]) * 1000;
      };

      const startTime = start * 1000;
      const estimate = getEstimate(start, item.NextBuildingUpgradeClass.BuildingClass);
      const buildActive = NOW < estimate;

      let buildProgress = 0;
      if (estimate && startTime) {
        const total = estimate - startTime;
        const elapsed = NOW - startTime;
        buildProgress = Math.min(Math.max(elapsed / total, 0), 1) * 100;
      }

      return {
        buildClass: item.NextBuildingUpgradeClass.BuildingClass,
        buildActive,
        buildProgress,
        name: item.Name,
        startTime: new Date(startTime),
        estimate: estimate ? new Date(estimate) : null,
        needsJudgement: item.PendingJudgementType.SettlementJudgementType !== 'None',
        judgementType: item.PendingJudgementType.SettlementJudgementType,
        race: item.Race.AlienRace,
        produce
      };
    })
    .filter((settle) => settle.buildActive === true ||
      settle.buildClass !== 'None' ||
      settle.needsJudgement === true ||
      settle.produce > 0)
    .sort((a, b) => b.buildProgress - a.buildProgress);

  return x;
};

export const createFrigateMissions = (BaseContext: BaseContext): FrigateType[] => {
  return BaseContext.PlayerStateData.FleetExpeditions.map((a) => {
    return {
      category: a.ExpeditionCategory.ExpeditionCategory,
      started: new Date(a.StartTime * 1000),
      lastEvent: new Date(a.TimeOfLastUAChange * 1000),
      frigates: a.AllFrigateIndices.length,
      fail: a.NumberOfFailedEventsThisExpedition,
      success: a.NumberOfSuccessfulEventsThisExpedition,
      duration: a.ExpeditionDuration.ExpeditionDuration,
      events: a.Events.length,
      done: a.NumberOfFailedEventsThisExpedition + a.NumberOfSuccessfulEventsThisExpedition
    };
  }).sort((a, b) => {
    const ratioA = a.events > 0 ? a.done / a.events : 0;
    const ratioB = b.events > 0 ? b.done / b.events : 0;
    return ratioB - ratioA;
  });
};

export const createPosition = (UniverseAddress: UniverseAddress, Summary: string): PositionType => {
  const portalCode = voxelToPortal(
    UniverseAddress.GalacticAddress.PlanetIndex,
    UniverseAddress.GalacticAddress.VoxelX,
    UniverseAddress.GalacticAddress.VoxelY,
    UniverseAddress.GalacticAddress.VoxelZ,
    UniverseAddress.GalacticAddress.SolarSystemIndex
  );

  return {
    ShareCode: `${UniverseAddress.RealityIndex}:${portalCode}`,
    GalaxyIndex: UniverseAddress.RealityIndex,
    GalaxyName: getGalaxyName(UniverseAddress.RealityIndex),
    PortalCode: portalCode,
    Summary
  };
};

export function mapKeys (json: NMSSave, mapping: any[]): NMSSave {
  if (Array.isArray(json)) {
    // @ts-expect-error complexity
    return json.map((item) => mapKeys(item, mapping));
  } else if (typeof json === 'object' && json !== null) {
    const newJson = {};
    for (const key in json) {
      const x = mapping.find((m) => m.Key === key);
      let mappedKey;
      if (x) {
        mappedKey = x.Value;
      }
      if (mappedKey) {
        // @ts-expect-error complexity
        newJson[mappedKey] = mapKeys(json[key], mapping);
      } else {
        // @ts-expect-error complexity
        newJson[key] = mapKeys(json[key], mapping);
      }
    }
    return newJson;
  } else {
    return json;
  }
}

export function reverseMapKeys (json: NMSSave, mapping: any[]): any {
  if (Array.isArray(json)) {
    return json.map((item) => reverseMapKeys(item, mapping));
  } else if (typeof json === 'object' && json !== null) {
    const newJson = {};
    for (const key in json) {
      const mappedKey = mapping.find((m) => m.Value === key)?.Key;
      if (mappedKey) {
        // @ts-expect-error complexity
        newJson[mappedKey] = reverseMapKeys(json[key], mapping);
      } else {
        // @ts-expect-error complexity
        newJson[key] = reverseMapKeys(json[key], mapping);
      }
    }
    return newJson;
  } else {
    return json;
  }
}

export function decompressLZ (input: any, uncompressedSize: number) {
  const inputLength = input.length;
  let inputPos = 0;
  const output = Buffer.alloc(uncompressedSize);
  let outputPos = 0;

  while (inputPos < inputLength) {
    const token = input[inputPos++];
    const literalLength = token >> 4;
    const matchLength = token & 0x0F;

    // Read literal length
    let len = literalLength;
    if (len === 15) {
      let b;
      do {
        b = input[inputPos++];
        len += b;
      } while (b === 255);
    }

    // Copy literals
    input.copy(output, outputPos, inputPos, inputPos + len);
    inputPos += len;
    outputPos += len;

    if (inputPos >= inputLength) break; // No more data

    // Read offset
    const offset = input.readUInt16LE(inputPos);
    inputPos += 2;

    // Read match length
    let matchLen = matchLength + 4;
    if (matchLength === 15) {
      let b;
      do {
        b = input[inputPos++];
        matchLen += b;
      } while (b === 255);
    }

    // Copy match
    for (let i = 0; i < matchLen; i++) {
      output[outputPos] = output[outputPos - offset];
      outputPos++;
    }
  }

  return output;
}

export function decompress (data: Buffer) {
  let offset = 0;
  const outputChunks = [];

  while (offset < data.length) {
    const magic = data.readUInt32LE(offset);
    offset += 4;

    if (magic !== 0xfeeda1e5) {
      throw new Error('Bad File');
    }

    const compressedSize = data.readUInt32LE(offset);
    offset += 4;
    const uncompressedSize = data.readUInt32LE(offset);
    offset += 4;

    offset += 4; // Skip 4 reserved bytes

    const compressedBlock = data.slice(offset, offset + compressedSize);
    offset += compressedSize;

    const decompressed = decompressLZ(compressedBlock, uncompressedSize);
    outputChunks.push(decompressed);
  }

  return Buffer.concat(outputChunks);
}

export default async function getSave (savePath: string) {
  try {
    const data = await readFile(savePath);
    let processed;

    if (!(data[0] === 0x7B && data[1] === 0x22)) {
      processed = decompress(data);
    } else {
      processed = data;
    }

    // @ts-expect-error complexity
    const json = JSON.parse(processed.slice(0, -1));
    const mapped = mapKeys(json, mapping.Mapping);
    return mapped;
  } catch (err) {
    console.log(err);
  }
}
