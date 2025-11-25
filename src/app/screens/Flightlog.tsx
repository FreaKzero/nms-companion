import { useEffect } from 'react';

import { confirmModal } from '../components/ConfirmModal';
import Glyphs from '../components/Glyphs';
import useFlightlogStore, { FlightLogItem } from '../stores/useFlightlogStore';

// fix loadall => getall
// create entry from click
interface LogProps extends FlightLogItem {
}

const Log: React.FC<LogProps> = ({ GalaxyName, PortalCode, Created, Summary }) => {
  const d = new Date(Created);
  return (
    <li className='flex items-center justify-between py-3 px-3 hover:bg-gray-800 transition rounded-lg gap-4'>
      <div className='text-gray-300 text-sm'>
        {d.toLocaleDateString('en-EN')} {d.toLocaleTimeString('at-AT')}
      </div>
      <div className='flex-1 text-sm font-bold'>
        {GalaxyName} {Summary}
      </div>

      <div className='flex-1 text-right'>
        <Glyphs portalCode={PortalCode} width='w-7' />
      </div>

    </li>
  );
};

function FlightlogPage () {
  const getAll = useFlightlogStore((s) => s.loadAll);
  const truncate = useFlightlogStore((s) => s.truncate);
  const logs = useFlightlogStore((s) => s.items);

  useEffect(() => {
    getAll();
  }, []);

  const handleTruncate = () => {
    const res = confirmModal('Do you really to remove all Logs ?');
    if (res) {
      truncate();
    }
  };

  return (
    <div className='w-11/12 m-auto'>
      <div className='flex justify-between'>
        <h2 className='font-bold font-nms text-3xl mb-8'>Flightlog</h2>
        <button type='button' className='buttonred h-10 p-0 px-5' onClick={handleTruncate}>
          Truncate Log
        </button>
      </div>
      <div className='bg-gray-900 text-white rounded-lg shadow-md p-4'>
        <ul>
          {logs.length > 0
            ? (
                logs.map((log, idx) => <Log key={`log-${idx}`} {...log} />)
              )
            : (
              <p className='text-gray-400 text-center py-4'>No flightlogs found.</p>
              )}
        </ul>
      </div>
    </div>
  );
}

export default FlightlogPage;
