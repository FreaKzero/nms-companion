export const MOCKFRIGATES = [
  {
    category: 'Balanced',
    started: '2025-10-11T01:12:54.000Z',
    lastEvent: '2025-10-11T03:01:56.000Z',
    frigates: 1,
    fail: 0,
    success: 4,
    duration: 'VeryShort',
    events: 4,
    done: 4
  },
  {
    category: 'Combat',
    started: '2025-10-11T01:12:48.000Z',
    lastEvent: '2025-10-11T03:05:18.000Z',
    frigates: 1,
    fail: 0,
    success: 4,
    duration: 'Short',
    events: 6,
    done: 4
  },
  {
    category: 'Exploration',
    started: '2025-10-11T01:13:03.000Z',
    lastEvent: '2025-10-11T03:05:33.000Z',
    frigates: 1,
    fail: 0,
    success: 4,
    duration: 'Short',
    events: 6,
    done: 4
  },
  {
    category: 'Exploration',
    started: '2025-10-11T01:12:34.000Z',
    lastEvent: '2025-10-11T03:05:04.000Z',
    frigates: 1,
    fail: 0,
    success: 4,
    duration: 'Medium',
    events: 10,
    done: 4
  },
  {
    category: 'Mining',
    started: '2025-10-11T01:12:42.000Z',
    lastEvent: '2025-10-11T03:05:12.000Z',
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
    startTime: new Date('2025-10-08T13:04:15.000Z'),
    category: 'Settlement_SmallIndustrial',
    estimate: new Date('2025-10-08T13:24:15.000Z'),
    needsJudgement: true,
    judgementType: 'BlessingPerkRelated',
    race: 'Builders',
    produce: 4
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
    race: 'Explorers',
    produce: 4
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
    race: 'Builders',
    produce: 0
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
    race: 'Builders',
    produce: 4
  }
];
// set({ frigates: mis.frigates, settlements: MOCK, loading: false });
