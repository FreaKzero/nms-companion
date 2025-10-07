import { useEffect, useRef, useState } from 'react';

import FrigateList from '../components/FrigatesList';
import Loader from '../components/Loader';
import SettlementsList from '../components/SettlementList';
import useMissionsStore from '../stores/useMissionsStore';

export default function MissionsPage () {
  const getMissions = useMissionsStore((s) => s.getMissions);
  const frigates = useMissionsStore((s) => s.frigates);
  const settlements = useMissionsStore((s) => s.settlements);
  const loading = useMissionsStore((s) => s.loading);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    getMissions();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const toggleAutoRefresh = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setAutoRefresh(false);
    } else {
      intervalRef.current = setInterval(() => getMissions(), 2 * 60 * 1000);
      setAutoRefresh(true);
    }
  };

  return loading
    ? (
      <Loader />
      )
    : (
      <div>
        {!autoRefresh && <button className='button' onClick={getMissions}>Refresh Missions</button>}

        <button
          className={`button ml-5 ${autoRefresh ? 'bg-green-600' : ''}`}
          onClick={toggleAutoRefresh}
        >
          {autoRefresh ? 'AUTOREFRESH ACTIVE' : 'AUTOREFRESH'}
        </button>

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
