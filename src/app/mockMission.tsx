export const MOCKSETTLE = [
  {
    buildClass: 'Settlement_SmallIndustrial',
    buildActive: false,
    name: 'Settlement 1',
    startTime: '2025-10-08T13:04:15.000Z',
    category: 'Settlement_SmallIndustrial',
    estimate: '2025-10-08T13:24:15.000Z',
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
    estimate: new Date('2025-10-08T15:24:15.000Z'),
    needsJudgement: true,
    judgementType: 'StrangerVisit',
    race: 'Explorers'
  },
  {
    buildClass: 'None',
    buildActive: false,
    name: 'Settlement 3',
    startTime: new Date('2025-10-08T13:04:15.000Z'),
    category: 'Settlement_SmallIndustrial',
    estimate: new Date('2025-10-08T15:24:15.000Z'),
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
