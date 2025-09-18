import { readFileSync } from 'node:fs';

import { BaseContext, NMSSave, UniverseAddress } from '../iface/nmssave';
import { PlanetNames } from '../mappings/PlanetNames';
import mapping from '../mappings/save.json';

export interface SettlementType {
  buildActive: boolean;
  name: string;
  startTime: Date;
  category: string;
  estimate: Date;
  needsJudgement: boolean;
  race: string;
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

export function voxelToPortal (P: number, X: number, Y: number, Z: number, SSI: number) {
  // Voxel Coordinate to Portal Code
  const dd1 = X + 2047;
  const dd2 = Y + 127;
  const dd3 = Z + 2047;

  const g1 = dd1.toString(16).toUpperCase();
  const g2 = dd2.toString(16).toUpperCase();
  const g3 = dd3.toString(16).toUpperCase();
  const g4 = SSI.toString(16).toUpperCase();

  const dec1 = parseInt(g1, 16);
  const dec2 = parseInt(g2, 16);
  const dec3 = parseInt(g3, 16);
  // const dec4 = parseInt(g4, 16);

  const dec5 = parseInt('801', 16);
  const dec6 = parseInt('81', 16);
  const dec7 = parseInt('1000', 16);
  const dec8 = parseInt('100', 16);

  const calc1 = (dec1 + dec5) % dec7;
  const calc2 = (dec2 + dec6) % dec8;
  const calc3 = (dec3 + dec5) % dec7;

  const hexX = calc1.toString(16).toUpperCase();
  const hexY = calc2.toString(16).toUpperCase();
  const hexZ = calc3.toString(16).toUpperCase();

  const ihexX = parseInt(hexX, 16) & 0xFFF;
  const ihexY = parseInt(hexY, 16) & 0xFF;
  const ihexZ = parseInt(hexZ, 16) & 0xFFF;
  const ihexSSI = parseInt(g4, 16) & 0xFFF;

  const formattedPortalCode = `${P}${padHex(ihexSSI, 3)}${padHex(ihexY, 2)}${padHex(ihexZ, 3)}${padHex(ihexX, 3)}`;

  return formattedPortalCode;

  function padHex (number: number, length: number) {
    return number.toString(16).toUpperCase()
      .padStart(length, '0');
  }
}

export const getGalaxyName = (galaxy: number) => PlanetNames[galaxy] || `Unknown (${galaxy})`;

export const createSettlementMissions = (BaseContext: BaseContext): SettlementType[] => {
  const x = BaseContext.PlayerStateData.SettlementStatesV2.filter((item) => item.Owner.USN === 'FreaKzero').map((item) => {
    const start = item.LastBuildingUpgradesTimestamps[item.NextBuildingUpgradeIndex];
    const NOW = Math.floor(new Date().getTime());

    const getEstimate = (timestamp: number, buildClass: string) => {
      const times: Record<string, number> = {
        Settlement_Small: 1200,
        Settlement_Medium: 3600,
        Settlement_Large: 7200,
        Settlement_Marget: 0
      };

      return (timestamp + times[buildClass]) * 1000;
    };

    const startTime = new Date(start * 1000);
    const estimate = getEstimate(start, item.NextBuildingUpgradeClass.BuildingClass);
    const buildActive = NOW < estimate;

    return {
      buildActive,
      name: item.Name,
      startTime,
      category: item.NextBuildingUpgradeClass.BuildingClass,
      estimate: new Date(estimate),
      needsJudgement: item.PendingJudgementType.SettlementJudgementType !== 'None',
      race: item.Race.AlienRace
    };
  });

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
      done: a.Events.filter((a) => a.Success === true).length
    };
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
    Summary,
    Raw: {
      x: UniverseAddress.GalacticAddress.VoxelX,
      y: UniverseAddress.GalacticAddress.VoxelY,
      z: UniverseAddress.GalacticAddress.VoxelZ,
      planet: UniverseAddress.GalacticAddress.PlanetIndex,
      solarSystem: UniverseAddress.GalacticAddress.SolarSystemIndex,
      galaxy: UniverseAddress.RealityIndex
    }
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
      console.log('Invalid Block, bad file');
      return Buffer.alloc(0);
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

export default function getSave (savePath: string) {
  const data = readFileSync(savePath);
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
}
