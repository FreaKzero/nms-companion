import { HammerIcon, LucideIcon, SectionIcon, SkullIcon, UserPlusIcon, HourglassIcon, Building2Icon } from 'lucide-react';

import { SettlementType } from '../lib/getNmsSave';
import getRelativeTime from '../lib/getRelativeTime';

const progressMap: Record<string, string> = {
  true: 'bg-amber-600',
  false: 'bg-green-700'
};

const judementMap: Record<string, { icon: LucideIcon; color: string; text: string }> = {
  Conflict: {
    icon: SkullIcon,
    color: 'bg-red-500',
    text: 'Settlement in Conflict'
  },
  StrangerVisit: {
    icon: UserPlusIcon,
    color: 'bg-amber-600',
    text: 'Settlement has a Visitor'
  },
  Policy: {
    icon: SectionIcon,
    color: 'bg-amber-600',
    text: 'Settlement needs Management'
  },
  BuildingChoice: {
    icon: Building2Icon,
    color: 'bg-amber-600',
    text: 'Settlement has a new Building Choice'
  },

  None: {
    icon: HourglassIcon,
    color: 'bg-green-700',
    text: 'No special Events'
  }
};

const prog = (b: boolean): string => {
  return progressMap[b.toString()];
};

const JudgementIcon = ({ type }: { type: string }) => {
  const Icon = judementMap[type]?.icon;
  const col = judementMap[type]?.color || '';

  return (
    <div className={`w-15 h-15 rounded-lg flex items-center justify-center ${col}`}>
      {Icon && <Icon />}
    </div>
  );
};

const SettleListItem = (settle: SettlementType) => {
  const status = judementMap[settle.judgementType]?.text || settle.judgementType;

  return (
    <li className='flex items-start gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transtion-all duration-200 rounded-lg'>
      <div className={`w-15 h-15 rounded-lg flex items-center justify-center ${prog(settle.buildActive)}`}>
        {settle.buildActive ? <HammerIcon /> : <HourglassIcon />}
      </div>
      <div className={`w-15 h-15 rounded-lg flex items-center justify-center ${prog(settle.needsJudgement)}`}>
        <JudgementIcon type={settle.judgementType} />
      </div>

      <div className='flex flex-col flex-1 text-sm text-gray-900 dark:text-gray-100 overflow-hidden'>
        <p className='font-medium line-clamp-2 text-lg'>{settle.name} • {settle.race}</p>
        {settle.buildActive && <p className='text-gray-600 dark:text-gray-400 text-xs'>Build started {getRelativeTime(settle.startTime)} • Done {getRelativeTime(settle.estimate)}</p>}
        <span className='text-xs text-gray-400'>{status}</span>

      </div>
    </li>
  );
};

function SettlementsList ({ settlements }: { settlements: SettlementType[] }) {
  return (
    <div>
      <ul className='flex flex-col'>
        {settlements.map((a, i) => {
          return (<SettleListItem key={`settle-${i}`} {...a} />);
        })}
      </ul>
    </div>
  );
}

export default SettlementsList;
