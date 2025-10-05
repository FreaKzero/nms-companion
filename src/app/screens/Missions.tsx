import { useEffect } from 'react';

import FrigateList from '../components/FrigatesList';
import SettlementsList from '../components/SettlementList';
import useMissionsStore from '../stores/useMissionsStore';

export default function MissionsPage () {
  const getMissions = useMissionsStore((s) => s.getMissions);
  const frigates = useMissionsStore((s) => s.frigates);
  const settlements = useMissionsStore((s) => s.settlements);

  useEffect(() => {
    getMissions();
  }, []);

  return (
    <div>
      <button className='button' onClick={getMissions}>Refresh Missions</button>
      <div className='mt-3 flex flex-1'>
        <div className='w-full bg-gray-900 mr-5 p-5 border border-neutral-700 rounded-xl'>
          <h2 className='text-2xl mb-2 pl-2'>Frigates</h2>
          <FrigateList frigates={frigates} />
        </div>
        <div className='w-full bg-gray-900 p-5 border border-neutral-700 rounded-xl'>
          <h2 className='text-2xl mb-2 pl-2'>Settlements</h2>
          <SettlementsList settlements={settlements} />
        </div>
      </div>
    </div>
  );
}
