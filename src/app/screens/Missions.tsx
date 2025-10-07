import { RefreshCcwDot } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import FrigateList from '../components/FrigatesList';
import Loader from '../components/Loader';
import SettlementsList from '../components/SettlementList';
import Timer from '../components/Timer';
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
    getMissions();
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
        <div className='group w-10'>
          <button
            className={`button ${autoRefresh ? 'bg-green-600' : ''}`}
            onClick={toggleAutoRefresh}
          >
            {autoRefresh
              ? (
                <RefreshCcwDot className='w-6 h-6 animate-spin-pause' />
                )
              : (
                <RefreshCcwDot className='w-6 h-6' />
                )}

          </button>
          <Timer active={autoRefresh} />

          <span className='scale-0 absolute group-hover:scale-100 transition-all duration-100 text-white bg-gray-900 p-2 rounded-md shadow-md text-xs mt-1 ml-2'>
            Autorefresh (all 2 Minutes)
          </span>
        </div>

        <div className='mt-3 flex flex-1 gap-5'>
          <div className='w-full bg-gray-900 border border-neutral-700 rounded-xl overflow-hidden'>
            <div className='bg-gray-700 p-2'>
              <h2 className='text-2xl text-white ml-5'>Frigates</h2>
            </div>
            <div className='border-b border-neutral-700' />
            <div className='p-5'>
              <FrigateList frigates={frigates} />
            </div>
          </div>

          <div className='w-full bg-gray-900 border border-neutral-700 rounded-xl overflow-hidden'>
            <div className='bg-gray-700 p-2'>
              <h2 className='text-2xl text-white ml-5'>Settlements</h2>
            </div>
            <div className='border-b border-neutral-700' />
            <div className='p-5'>
              <SettlementsList settlements={settlements} />
            </div>
          </div>
        </div>

      </div>
      );
}
