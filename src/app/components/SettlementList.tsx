import { HammerIcon, SectionIcon } from 'lucide-react';

import { SettlementType } from '../lib/getNmsSave';
import getRelativeTime from '../lib/getRelativeTime';

const SettleListItem = (settle: SettlementType) => {
  const progressMap: Record<string, string> = {
    true: 'bg-amber-600',
    false: 'bg-green-700'
  };

  const prog = (b: boolean): string => {
    return progressMap[b.toString()];
  };

  const shouldVisit = !settle.needsJudgement && !settle.buildActive;

  return (
    <li className='flex items-start gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transtion-all duration-200 rounded-lg'>
      <div className={`w-15 h-15 rounded-lg flex items-center justify-center ${prog(settle.buildActive)}`}>
        <HammerIcon />
      </div>
      <div className={`w-15 h-15 rounded-lg flex items-center justify-center ${prog(settle.needsJudgement)}`}>
        <SectionIcon />
      </div>

      <div className='flex flex-col flex-1 text-sm text-gray-900 dark:text-gray-100 overflow-hidden'>
        <p className='font-medium line-clamp-2 text-lg'>{settle.name} • {settle.race}</p>
        {settle.buildActive && <p className='text-gray-600 dark:text-gray-400 text-xs'>Build started {getRelativeTime(settle.startTime)} • Done {getRelativeTime(settle.estimate)}</p>}
        {settle.needsJudgement && <span className='text-xs'>Settlement needs a Judgement</span>}
        {shouldVisit && <span className='text-xs text-gray-600'>Nothing to Report</span>}
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
