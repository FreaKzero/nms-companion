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

  const progressMap = {
    idle: 'bg-amber-600',
    success: 'bg-green-700',
    fail: 'bg-red-800'
  };

  let progClass = progressMap.idle;

  if (frigate.done === frigate.events) {
    progClass = progressMap.success;
  }

  if (frigate.fail > 0) {
    progClass = progressMap.fail;
  }

  return (
    <li className='flex items-start gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transtion-all duration-200 rounded-lg'>
      <div className={`w-15 h-15 rounded-lg flex items-center justify-center ${progClass}`}>
        <img src={IconMap[frigate.category]} className='h-5 w-5' />
      </div>
      <div className='flex flex-col flex-1 text-sm text-gray-900 dark:text-gray-100 overflow-hidden'>
        <p className='font-medium line-clamp-2 text-lg'>{frigate.category} • {frigate.duration.replace('Very', 'Very ')} Mission ({frigate.frigates})</p>
        <p className='text-gray-600 dark:text-gray-400 text-xs'>Started {getRelativeTime(frigate.started)} • Last Event: {getRelativeTime(frigate.lastEvent)}</p>
        <span className='text-xs'>
          {frigate.success} Succeeded • {frigate.fail} Failed of {frigate.events} Events
        </span>
      </div>
    </li>
  );
};

function FrigateList ({ frigates }: { frigates: FrigateType[] }) {
  return (
    <div>
      <ul className='flex flex-col'>
        {frigates.map((a, i) => {
          return (<FrigateListItem key={`frigate-${i}`} {...a} />);
        })}
      </ul>
    </div>
  );
}

export default FrigateList;
