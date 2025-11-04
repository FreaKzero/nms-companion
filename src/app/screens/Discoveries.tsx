import { LocateFixed } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormInput } from '../components/FormInput';
import IconButton from '../components/IconButton';
import Loader from '../components/Loader';
import useDiscoveriesStore, { EnhancedDiscoveries } from '../stores/useDiscoveriesStore';
import { useAutoRefreshStore } from '../stores/useRefreshStore';
import useSaveStore from '../stores/useSaveStore';

interface ConnectedDiscoveries extends EnhancedDiscoveries {
  onSelect: (galaxy: string) => void;
}

const Galaxy: React.FC<ConnectedDiscoveries> = ({ GalaxyIndex, GalaxyName, DiscoveryDate, PortalCount, BaseCount, onSelect }) => {
  const hasPortals = PortalCount > 0;

  return (
    <li className='flex items-center justify-between py-3 px-3 hover:bg-gray-800 transition rounded-lg'>
      <div className='text-right w-[28px] '>
        {GalaxyIndex}
      </div>

      <div className='font-semibold text-sm text-left w-[200px]'>
        {hasPortals
          ? <span className='text-indigo-400 hover:text-indigo-300 cursor-pointer transition duration-200' onClick={() => onSelect(GalaxyName)}>{GalaxyName}</span>
          : <span className='cursor-default'>{GalaxyName}</span>}
      </div>

      <div className='text-gray-300 text-sm min-w-[200px] text-right'>
        <div className='relative inline-block'>
          <span>{BaseCount} Bases</span>
        </div>
      </div>

      <div className='text-gray-300 text-sm min-w-[100px] text-right'>
        <div className='relative inline-block'>
          <span>{PortalCount} Portals</span>
        </div>
      </div>

      <div className='text-gray-300 text-sm text-right min-w-[100px]'>
        <span>{new Date(DiscoveryDate).toLocaleDateString('en-EN')}</span>
      </div>
    </li>
  );
};

export default function DiscoveriesPage () {
  const [search, setSearch] = useState('');

  const getAll = useDiscoveriesStore((s) => s.getAll);
  const entries = useDiscoveriesStore((s) => s.entries);
  const loading = useDiscoveriesStore((s) => s.loading);
  const startAutoRefresh = useAutoRefreshStore((s) => s.start);
  const nav = useNavigate();
  const getPosition = useSaveStore((s) => s.getSave);

  useEffect(() => {
    getAll();
    startAutoRefresh();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.trim() !== '') {
        getAll(search);
      } else {
        getAll();
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [
    search,
    getAll
  ]);

  const handleOnSelect = (galaxy: string) => {
    nav(`/locations?search=${encodeURI(galaxy)}`);
  };

  const handleGetPosition = async () => {
    await getPosition();
  };

  return (
    <div>
      {loading && <Loader message='Loading Discoveries ...' />}
      <div className='w-11/12 m-auto'>
        <div className='flex justify-between'>
          <h2 className='font-bold font-nms text-3xl mb-8'>Discovered Galaxies</h2>
          <div>
            <h2 className='font-bold font-nms text-2xl mb-8 inline-block self-baseline-last text-gray-400'>{entries.length} Galaxies Discovered</h2>
            <IconButton Icon={LocateFixed} label='Get current Position' onClick={handleGetPosition} className='inline-block ml-5' />
          </div>
        </div>
        <div className='bg-gray-900 text-white rounded-lg shadow-md p-4'>
          <div className='flex gap-4 mb-4'>
            <FormInput
              id='searchGalaxy'
              label='Search Galaxy'
              placeholder='Enter Galaxy name...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full'
              onClear={() => setSearch('')}
            />

          </div>
          <ul>
            {entries.length > 0
              ? (
                  entries.map((galaxy, idx) => <Galaxy key={`galaxy-${idx}`} {...galaxy} onSelect={handleOnSelect} />)
                )
              : (
                <p className='text-gray-400 text-center py-4'>No Galaxy found.</p>
                )}
          </ul>
        </div>
      </div>
    </div>
  );
}
