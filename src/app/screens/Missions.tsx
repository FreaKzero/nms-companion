import { useEffect } from 'react';

import Card from '../components/Card';
import CommunityProgressBar from '../components/CommunityProgress';
import FrigateList from '../components/FrigatesList';
import Loader from '../components/Loader';
import SettlementsList from '../components/SettlementList';
import { TimerList } from '../components/TimerList';
import useMetaStore from '../stores/useMetaStore';
import { useAutoRefreshStore } from '../stores/useRefreshStore';
import useSaveStore from '../stores/useSaveStore';

export default function MissionsPage () {
  const frigates = useSaveStore((s) => s.missions.frigates);
  const settlements = useSaveStore((s) => s.missions.settlements);
  const loading = useSaveStore((s) => s.loading);

  const startAutoRefresh = useAutoRefreshStore((s) => s.start);
  const communityMission = useMetaStore((s) => s.communityMission);

  useEffect(() => {
    startAutoRefresh();
  }, []);

  return (
    <div>
      {loading && <Loader message='Loading Missions ...' />}
      <CommunityProgressBar percentage={communityMission.percentage} totalTiers={communityMission.totalTiers} currentTier={communityMission.currentTier} loading={loading} />
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

      <TimerList />

    </div>
  );
}
