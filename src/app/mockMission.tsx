export const MOCKFRIGATES = [
  {
    category: 'Balanced',
    started: new Date('2025-10-16T11:12:54.000Z'),
    lastEvent: new Date('2025-10-16T13:01:56.000Z'),
    frigates: 1,
    fail: 2,
    success: 1,
    duration: 'VeryShort',
    events: 6,
    done: 6
  },
  {
    category: 'Combat',
    started: new Date('2025-10-16T11:12:48.000Z'),
    lastEvent: new Date('2025-10-16T13:05:18.000Z'),
    frigates: 1,
    fail: 0,
    success: 6,
    duration: 'Short',
    events: 6,
    done: 6
  },
  {
    category: 'Exploration',
    started: new Date('2025-10-16T11:13:03.000Z'),
    lastEvent: new Date('2025-10-16T13:05:33.000Z'),
    frigates: 1,
    fail: 0,
    success: 4,
    duration: 'Short',
    events: 6,
    done: 4
  },
  {
    category: 'Exploration',
    started: new Date('2025-10-16T11:12:34.000Z'),
    lastEvent: new Date('2025-10-16T13:05:04.000Z'),
    frigates: 1,
    fail: 0,
    success: 4,
    duration: 'Medium',
    events: 10,
    done: 4
  },
  {
    category: 'Mining',
    started: new Date('2025-10-16T11:12:42.000Z'),
    lastEvent: new Date('2025-10-16T13:05:12.000Z'),
    frigates: 1,
    fail: 0,
    success: 4,
    duration: 'VeryLong',
    events: 18,
    done: 4
  }
];

export const MOCKSETTLE = [
  {
    buildClass: 'Settlement_SmallIndustrial',
    buildActive: false,
    name: 'Settlement 1',
    startTime: new Date('2025-10-16T10:04:15.000Z'),
    category: 'Settlement_SmallIndustrial',
    estimate: new Date('2025-10-16T10:24:15.000Z'),
    needsJudgement: true,
    judgementType: 'BlessingPerkRelated',
    race: 'Builders',
    produce: 4,
    buildProgress: 100
  },
  {
    buildClass: 'Settlement_SmallIndustrial',
    buildActive: true,
    name: 'Settlement 2',
    startTime: new Date('2025-10-16T12:04:15.000Z'),
    category: 'Settlement_SmallIndustrial',
    estimate: new Date('2025-10-16T16:00:15.000Z'),
    needsJudgement: true,
    judgementType: 'StrangerVisit',
    race: 'Explorers',
    produce: 4,
    buildProgress: 50
  },
  {
    buildClass: 'Settlement_SmallIndustrial',
    buildActive: false,
    name: 'Settlement 3',
    startTime: new Date('2025-10-15T13:04:15.000Z'),
    category: 'Settlement_SmallIndustrial',
    estimate: new Date('2025-10-16T03:00:15.000Z'),
    needsJudgement: true,
    judgementType: 'Conflict',
    race: 'Builders',
    produce: 0,
    buildProgress: 0.6
  }
];
