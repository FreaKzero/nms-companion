import F_COMBAT from 'assets/F_COMBAT.png';
import F_DEFAULT from 'assets/F_DEFAULT.png';
import F_EXPLORE from 'assets/F_EXPLORE.png';
import F_MINING from 'assets/F_MINING.png';
import F_TRADE from 'assets/F_TRADE.png';

import { FrigateType } from '../lib/getNmsSave';
import getRelativeTime from '../lib/getRelativeTime';

const FrigateListItem = (frigate: FrigateType) => {
  const IconMap: Record<string, string> = {
    Combat: F_COMBAT,
    Balanced: F_DEFAULT,
    Diplomacy: F_TRADE,
    Mining: F_MINING,
    Exploration: F_EXPLORE
  };

  interface IconProgressProps {
    all: number;
    current: number;
    category: string;
  }
  const IconProgress: React.FC<IconProgressProps> = ({ all, current, category }) => {
    const progress = all > 0 ? Math.min(current / all, 1) : 0;
    const percentage = Math.round(progress * 100);

    return (
      <div className='relative w-15 h-15 rounded-lg flex items-center justify-center overflow-hidden bg-gray-700'>
        <div
          className='absolute top-0 left-0 h-full bg-green-700 transition-all duration-300'
          style={{ width: `${percentage}%` }}
        />

        <div className='relative z-10 text-white flex flex-col items-center'>
          <img src={IconMap[category]} className='h-5 w-5' />
        </div>
      </div>
    );
  };

  return (
    <li className='flex items-start gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transtion-all duration-200 rounded-lg'>

      <IconProgress all={frigate.events} current={frigate.success} category={frigate.category} />

      <div className='flex flex-col flex-1 text-sm text-gray-900 dark:text-gray-100 overflow-hidden'>
        <p className='line-clamp-2 text-lg font-nms'>{frigate.category} • {frigate.duration.replace('Very', 'Very ')} Mission ({frigate.frigates})</p>
        <p className='text-gray-600 dark:text-gray-400 text-xs'>Started {getRelativeTime(frigate.started)} • Last Event: {getRelativeTime(frigate.lastEvent)}</p>
        <span className='text-xs'>
          {frigate.success} Succeeded • {frigate.fail} Failed of {frigate.events} Events
        </span>
      </div>
    </li>
  );
};

function FrigateList ({ frigates }: { frigates: FrigateType[] }) {
  const sortedFrigates = frigates.sort((a, b) => {
    const ratioA = a.events > 0 ? a.success / a.events : 0;
    const ratioB = b.events > 0 ? b.success / b.events : 0;
    return ratioB - ratioA;
  });

  return (
    <div>
      <ul className='flex flex-col'>
        {sortedFrigates.map((a, i) => {
          return (<FrigateListItem key={`frigate-${i}`} {...a} />);
        })}
      </ul>
    </div>
  );
}

export default FrigateList;
