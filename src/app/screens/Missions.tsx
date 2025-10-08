import { RefreshCcwDot } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const error = useMissionsStore((s) => s.error);
  const nav = useNavigate();

  useEffect(() => {
    if (error) {
      nav('/settings');
    }
  }, [error]);

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

  const sett = settlements.filter((settle) => {
    return (settle.buildActive === true && settle.buildClass !== 'None') || settle.needsJudgement === true;
  });

  return (
    <div>
      {loading && <Loader message='Loading Missions ...' />}
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
            <h2 className='text-2xl text-white ml-5 font-nms'>Frigates {frigates.length ? `• ${frigates.length} on Mission` : ''}</h2>
          </div>
          <div className='border-b border-neutral-700' />
          <div className='p-5'>
            {frigates.length ? <FrigateList frigates={frigates} /> : <h2 className='text-2xl text-center font-nms pt-1 text-uppercase'>No active Frigate Missions</h2>}
          </div>
        </div>

        <div className='w-full bg-gray-900 border border-neutral-700 rounded-xl overflow-hidden'>
          <div className='bg-gray-700 p-2'>
            <h2 className='text-2xl text-white ml-5 font-nms'>Settlements {sett.length ? `• ${sett.length} need Attention` : ''}</h2>
          </div>
          <div className='border-b border-neutral-700' />
          <div className='p-5'>
            {sett.length ? <SettlementsList settlements={sett} /> : <h2 className='text-2xl text-center font-nms pt-1'>Settlements need no Attention</h2>}
          </div>
        </div>
      </div>

    </div>
  );
}
