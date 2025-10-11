import { useEffect } from 'react';

import Card from '../components/Card';
import FrigateList from '../components/FrigatesList';
import Loader from '../components/Loader';
import SettlementsList from '../components/SettlementList';
import useMissionsStore from '../stores/useMissionsStore';

export default function MissionsPage () {
  const frigates = useMissionsStore((s) => s.frigates);
  const settlements = useMissionsStore((s) => s.settlements);
  const loading = useMissionsStore((s) => s.loading);
  const getMissions = useMissionsStore((s) => s.getMissions);

  useEffect(() => {
    getMissions();
  }, []);

  const sett = settlements.filter((settle) => settle.buildActive === true ||
    settle.buildClass !== 'None' ||
    settle.needsJudgement === true ||
    settle.produce > 0);

  return (
    <div>
      {loading && <Loader message='Loading Missions ...' />}
      <div className='mt-3 flex flex-1 gap-5'>
        <Card
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
          title={`Settlements ${
            sett.length ? `• ${sett.length} need Attention` : ''
          }`}
        >
          {sett.length
            ? (
              <SettlementsList settlements={sett} />
              )
            : (
              <h2 className='text-2xl text-center font-nms pt-1'>
                Settlements need no Attention
              </h2>
              )}
        </Card>
      </div>
    </div>
  );
}
