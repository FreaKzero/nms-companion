import { Discoveries } from '@/ipc/discoveriesIPC';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormInput } from '../components/FormInput';
import Loader from '../components/Loader';
import useDiscoveriesStore from '../stores/useDiscoveriesStore';
import { useAutoRefreshStore } from '../stores/useRefreshStore';

interface EnhancedDiscoveries extends Discoveries {
  onSelect: (galaxy: string) => void;
}

const Fish: React.FC<EnhancedDiscoveries> = ({ GalaxyIndex, GalaxyName, DiscoveryDate, PortalCount, onSelect }) => {
  const hasPortals = PortalCount > 0;

  return (
    <li className='flex items-center justify-between py-3 px-3 hover:bg-gray-800 transition rounded-lg'>
      <div className='text-right w-[50px] '>
        {GalaxyIndex}
      </div>

      <div className='font-semibold text-sm text-left w-[200px]'>
        {hasPortals
          ? <span className='text-indigo-400 hover:text-indigo-300 cursor-pointer transition duration-200' onClick={() => onSelect(GalaxyName)}>{GalaxyName}</span>
          : <span className='cursor-default'>{GalaxyName}</span>}
      </div>

      <div className='text-gray-300 text-sm min-w-[500px] text-right'>
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

  return (
    <div>
      {loading && <Loader message='Loading Discoveries ...' />}
      <div className='w-11/12 m-auto'>
        <div className='flex justify-between'>
          <h2 className='font-bold font-nms text-3xl mb-8'>Discovered Galaxies</h2>
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
                  entries.map((fish, idx) => <Fish key={`fish-${idx}`} {...fish} onSelect={handleOnSelect} />)
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
