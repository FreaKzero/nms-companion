/* eslint-disable @stylistic/jsx-closing-tag-location */
import { HammerIcon, LucideIcon, SectionIcon, UserPlusIcon, HourglassIcon, Building2Icon, UsersIcon, AngryIcon, UserStarIcon, WandSparklesIcon, Package2Icon } from 'lucide-react';

import { SettlementType } from '../lib/getNmsSave';
import getRelativeTime from '../lib/getRelativeTime';

const progressMap: Record<string, string> = {
  true: 'bg-amber-600',
  false: 'bg-green-700'
};

const judementMap: Record<string, { icon: LucideIcon; color: string; text: string }> = {
  Conflict: {
    icon: AngryIcon,
    color: 'bg-amber-600',
    text: 'Settlers have a Conflict'
  },
  StrangerVisit: {
    icon: UserPlusIcon,
    color: 'bg-amber-600',
    text: 'Settlement has a Visitor'
  },
  Policy: {
    icon: SectionIcon,
    color: 'bg-amber-600',
    text: 'Settlement needs Policy Management'
  },
  BuildingChoice: {
    icon: Building2Icon,
    color: 'bg-amber-600',
    text: 'Settlement has a new Building Choice'
  },
  ProcPerkRelated: {
    icon: UsersIcon,
    color: 'bg-amber-600',
    text: 'Settler has a Request'
  },
  JobPerkRelated: {
    icon: UserStarIcon,
    color: 'bg-amber-600',
    text: 'Settlement has a job related Request'
  },
  Request: {
    icon: UsersIcon,
    color: 'bg-amber-600',
    text: 'Settler has a Request'
  },
  BlessingPerkRelated: {
    icon: WandSparklesIcon,
    color: 'bg-amber-600',
    text: 'Settlement can get a Blessing'
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

interface BuildIconProps {
  start: Date;
  end: Date;
  isDone?: boolean;
}

export const BuildIcon: React.FC<BuildIconProps> = ({ start, end, isDone }) => {
  let progress;

  if (start && end) {
    const now = new Date();
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    progress = Math.min(Math.max(elapsed / total, 0), 1); // Clamp 0-1
  } else {
    progress = 100;
  }

  return (
    <div className='relative w-15 h-15 rounded-lg flex items-center justify-center overflow-hidden bg-gray-700'>
      <div
        className='absolute top-0 left-0 h-full bg-green-700 transition-all duration-300'
        style={{ width: `${isDone ? 100 : progress * 100}%` }}
      />

      <div className='relative z-10 text-white'>
        <HammerIcon />
      </div>
    </div>
  );
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
  const isDone = !settle.buildActive && settle.buildClass !== 'None';

  return (
    <li className='flex items-start gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transtion-all duration-200 rounded-lg'>

      {settle.produce > 0 && <div className='w-15 h-15 rounded-lg flex items-center justify-center bg-green-700'>
        <Package2Icon /><br />
      </div>}

      {isDone && <div className={`w-15 h-15 rounded-lg flex items-center justify-center ${prog(isDone)}`}>
        <Building2Icon />
      </div>}

      {(settle.buildActive && settle.buildClass !== 'None') && <BuildIcon start={settle.startTime} end={settle.estimate} />}

      {settle.judgementType !== 'None' && <div className={`w-15 h-15 rounded-lg flex items-center justify-center ${prog(settle.needsJudgement)}`}>
        <JudgementIcon type={settle.judgementType} />
      </div>}

      <div className='flex flex-col flex-1 text-sm text-gray-900 dark:text-gray-100 overflow-hidden'>
        <p className='line-clamp-2 text-xl font-nms'>{settle.name} • {settle.race}</p>
        {isDone && <p className='text-gray-600 dark:text-gray-400 text-xs'>Building can be reopened</p>}
        {settle.buildActive && <p className='text-gray-600 dark:text-gray-400 text-xs'>Build started {getRelativeTime(settle.startTime)} • Done {getRelativeTime(settle.estimate)}</p>}
        <span className='text-xs text-gray-400'>{status} {settle.produce > 0 && `• ${settle.produce} Products`}</span>
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
