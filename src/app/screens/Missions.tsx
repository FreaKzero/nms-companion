import { useEffect } from 'react';

import Card from '../components/Card';
import CommunityProgressBar from '../components/CommunityProgress';
import FrigateList from '../components/FrigatesList';
import Loader from '../components/Loader';
import SettlementsList from '../components/SettlementList';
import { TimerMission } from '../components/TimerMission';
import useMetaStore from '../stores/useMetaStore';
import useMissionsStore from '../stores/useMissionsStore';
import { useAutoRefreshStore } from '../stores/useRefreshStore';

export default function MissionsPage () {
  const frigates = useMissionsStore((s) => s.frigates);
  const settlements = useMissionsStore((s) => s.settlements);
  const loading = useMissionsStore((s) => s.loading);
  const getMissions = useMissionsStore((s) => s.getMissions);
  const startAutoRefresh = useAutoRefreshStore((s) => s.start);
  const getCommunityMission = useMetaStore((s) => s.getCommunityMission);
  const communityMission = useMetaStore((s) => s.communityMission);

  useEffect(() => {
    getCommunityMission();
    startAutoRefresh();
    getMissions();
  }, []);

  return (
    <div>
      {loading && <Loader message='Loading Missions ...' />}
      <div className='mt-3 flex flex-1 gap-5'>
        <Card
          className='max-h-[331px] overflow-y-scroll p-5'
          title={`Frigates ${
            frigates.length ? `• ${frigates.length} on Mission` : ''
          }`}
        >
          {frigates.length
            ? (
              <FrigateList frigates={frigates} />
              )
            : (
              <h2 className='text-2xl text-center font-nms pt-1'>
                No active Frigate Missions
              </h2>
              )}
        </Card>

        <Card
          className='max-h-[331px] overflow-y-scroll p-5'
          title={`Settlements ${
            settlements.length ? `• ${settlements.length} need Attention` : ''
          }`}
        >
          {settlements.length
            ? (
              <SettlementsList settlements={settlements} />
              )
            : (
              <h2 className='text-2xl text-center font-nms pt-1'>
                Settlements need no Attention
              </h2>
              )}
        </Card>
      </div>

      <CommunityProgressBar percentage={communityMission.percentage} totalTiers={communityMission.totalTiers} currentTier={communityMission.currentTier} />

      <div className='grid lg:grid-cols-3 gap-5'>
        <TimerMission storageKey='timer1' />
        <TimerMission storageKey='timer2' />
        <TimerMission storageKey='timer3' />
        <TimerMission storageKey='timer4' />
        <TimerMission storageKey='timer5' />
        <TimerMission storageKey='timer6' />

      </div>

    </div>
  );
}
