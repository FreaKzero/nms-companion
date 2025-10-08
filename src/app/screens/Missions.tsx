import { RefreshCcwDot } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FrigateList from '../components/FrigatesList';
import Loader from '../components/Loader';
import SettlementsList from '../components/SettlementList';
import Timer from '../components/Timer';
import useMissionsStore from '../stores/useMissionsStore';

export default function MissionsPage () {
  const frigates = useMissionsStore((s) => s.frigates);
  const settlements = useMissionsStore((s) => s.settlements);
  const loading = useMissionsStore((s) => s.loading);

  const sett = settlements.filter((settle) => {
    return settle.buildActive === true || settle.buildClass !== 'None' || settle.needsJudgement === true;
  });

  return (
    <div>
      {loading && <Loader message='Loading Missions ...' />}
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
