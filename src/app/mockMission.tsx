export const MOCKFRIGATES = [
  {
    category: 'Diplomacy',
    started: new Date('2025-10-09T00:23:01.000Z'),
    lastEvent: new Date('2025-10-09T00:23:01.000Z'),
    frigates: 1,
    fail: 0,
    success: 0,
    duration: 'Long',
    events: 10,
    done: 0
  },
  {
    category: 'Balanced',
    started: new Date('2025-10-09T00:23:07.000Z'),
    lastEvent: new Date('2025-10-09T00:23:07.000Z'),
    frigates: 1,
    fail: 0,
    success: 2,
    duration: 'VeryLong',
    events: 10,
    done: 0
  },
  {
    category: 'Combat',
    started: new Date('2025-10-09T00:23:15.000Z'),
    lastEvent: new Date('2025-10-09T00:23:15.000Z'),
    frigates: 1,
    fail: 0,
    success: 4,
    duration: 'Short',
    events: 10,
    done: 0
  },
  {
    category: 'Balanced',
    started: new Date('2025-10-09T00:23:24.000Z'),
    lastEvent: new Date('2025-10-09T00:23:24.000Z'),
    frigates: 2,
    fail: 0,
    success: 6,
    duration: 'VeryShort',
    events: 10,
    done: 0
  },
  {
    category: 'Exploration',
    started: new Date('2025-10-09T00:23:32.000Z'),
    lastEvent: new Date('2025-10-09T00:23:32.000Z'),
    frigates: 1,
    fail: 0,
    success: 0,
    duration: 'Short',
    events: 10,
    done: 0
  }
];

export const MOCKSETTLE = [
  {
    buildClass: 'Settlement_SmallIndustrial',
    buildActive: false,
    name: 'Settlement 1',
    startTime: new Date('2025-10-08T13:04:15.000Z'),
    category: 'Settlement_SmallIndustrial',
    estimate: new Date('2025-10-08T13:24:15.000Z'),
    needsJudgement: true,
    judgementType: 'BlessingPerkRelated',
    race: 'Builders'
  },
  {
    buildClass: 'Settlement_SmallIndustrial',
    buildActive: true,
    name: 'Settlement 2',
    startTime: new Date('2025-10-08T13:04:15.000Z'),
    category: 'Settlement_SmallIndustrial',
    estimate: new Date('2025-10-09T04:00:15.000Z'),
    needsJudgement: true,
    judgementType: 'StrangerVisit',
    race: 'Explorers'
  },
  {
    buildClass: 'Settlement_SmallIndustrial',
    buildActive: false,
    name: 'Settlement 3',
    startTime: new Date('2025-10-08T13:04:15.000Z'),
    category: 'Settlement_SmallIndustrial',
    estimate: new Date('2025-10-09T03:00:15.000Z'),
    needsJudgement: true,
    judgementType: 'Conflict',
    race: 'Builders'
  },
  {
    buildClass: 'None',
    buildActive: false,
    name: 'Settlement 4',
    startTime: null,
    category: 'Settlement_SmallIndustrial',
    estimate: null,
    needsJudgement: true,
    judgementType: 'Policy',
    race: 'Builders'
  }
];
// set({ frigates: mis.frigates, settlements: MOCK, loading: false });
