import { FishType } from '@/ipc/fishtrackerIPC';
import units from 'assets/units.png';

import { useEffect, useState } from 'react';

import { FormCheckbox } from '../components/FormCheckbox';
import { FormDropdown } from '../components/FormDropdown';
import { FormInput } from '../components/FormInput';
import useFishStore from '../stores/useFishStore';
import { useAutoRefreshStore } from '../stores/useRefreshStore';

interface TempBiomeRecord {
  biome: string;
  done: number;
}

interface FishProps extends FishType {
  toggleDone: (id: number) => void;
  onTagClick: (biome: string) => void;
}

// @TODO research depths for Ocean and Gasgiant Biomes
const getDepth = (size: string) => {
  switch (size) {
    case 'Small':
      return 25;
    case 'Medium':
      return 50;
    case 'Large':
      return 70;
    case 'Colossal':
      return 80;
    default:
      return 0;
      break;
  }
};
const Fish: React.FC<FishProps> = ({ id, fish, biome, onlyNight, onlyDay, onlyExpedition, done, value, size, toggleDone, onTagClick }) => {
  const addClass = done ? 'line-through text-gray-500' : '';
  return (
    <div className='flex items-center justify-between py-3 px-3 hover:bg-gray-800 transition rounded-lg'>
      <div className='flex items-center gap-3 w-[250px] shrink-0'>
        <FormCheckbox
          id={`fishDone-${id}`}
          label={fish}
          checked={done}
          onChange={() => toggleDone(id)}
          labelClassName={done ? addClass : ''}
        />
      </div>

      <div className={`flex-1 font-semibold text-indigo-400 hover:text-indigo-300 text-sm text-left min-w-[80px] cursor-pointer transition duration-200 ${addClass}`} onClick={() => onTagClick(biome)}>
        {biome}
      </div>

      <div className={`text-gray-300 text-sm text-left min-w-[180px] ${addClass}`}>
        <div className='relative group inline-block cursor-help'>
          <span>{size}</span>
          <span
            className='
            absolute left-1/2 -translate-x-1/2 -top-6
            bg-gray-700 text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap
            opacity-0 group-hover:opacity-100 group-hover:-translate-y-1
            pointer-events-none transition-all duration-150
            shadow-md
          '
          >
            Fish in atleast {getDepth(size)}u depth
          </span>
        </div>

      </div>
      <div className={`text-gray-300 text-sm text-right min-w-[100px] ${addClass}`}>
        {value}
      </div>
      <img src={units} className='w-5 ml-1' />

      <div className='flex items-center gap-3 text-xs text-gray-400 w-[160px] justify-end '>
        {onlyDay && <span className='inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase text-yellow-300 border-yellow-400 bg-amber-800'>Day Only</span>}
        {onlyNight && <span className='inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase text-indigo-300 border-indigo-400 bg-indigo-900/50'>Night Only</span>}
        {onlyExpedition && <span className='inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase text-gray-300 border-gray-400 bg-gray-900'>Expedition</span>}
      </div>
    </div>
  );
};

function FishTrackerPage () {
  const startAutoRefresh = useAutoRefreshStore((s) => s.start);
  const getFishes = useFishStore((s) => s.getFishes);
  const fishes = useFishStore((s) => s.fishes);
  const toggleDone = useFishStore((s) => s.toggleDone);

  const [searchText, setSearchText] = useState('');
  const [searchBiome, setSearchBiome] = useState('');

  const biomeOptions = Object.values(fishes.reduce((acc, fish) => {
    if (!acc[fish.biome]) acc[fish.biome] = { biome: fish.biome, done: 0 };
    if (fish.done) acc[fish.biome].done++;
    return acc;
  }, {} as Record<string, TempBiomeRecord>)).map((b) => ({ label: `${b.biome} ${b.done}/4`, value: b.biome }));

  useEffect(() => {
    getFishes();
    startAutoRefresh();
  }, []);

  const handleTagClick = (biome: string) => setSearchBiome(biome);

  const handleOnChangeBiome = (value: string) => {
    setSearchText('');
    setSearchBiome(value);
  };
  const fishDone = fishes.filter((a) => a.done === true).length;

  const filteredFishes = fishes.filter((fish) => {
    const matchesText = fish.fish.toLowerCase().includes(searchText.toLowerCase());
    const matchesBiome = searchBiome ? fish.biome === searchBiome : true;
    return matchesText && matchesBiome;
  }).sort((a, b) => Number(a.done) - Number(b.done));

  return (
    <div className='w-11/12 m-auto'>
      <div className='flex justify-between'>
        <h2 className='font-bold font-nms text-3xl mb-8'>Legendary Fish Tracker</h2>
        <h2 className='font-bold font-nms text-3xl mb-8'>{fishDone} of {fishes.length} catched</h2>
      </div>
      <div className='bg-gray-900 text-white rounded-lg shadow-md p-4'>
        <div className='flex gap-4 mb-4'>
          <FormInput
            id='searchFish'
            label='Search Fish'
            placeholder='Enter fish name...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='flex-1'
            onClear={() => setSearchText('')}
          />
          <FormDropdown
            displayValue={searchBiome}
            label='Biome'
            name='searchBiome'
            options={biomeOptions}
            onChange={(value: string) => handleOnChangeBiome(value)}
          />
        </div>

        {filteredFishes.length > 0
          ? (
              filteredFishes.map((fish, idx) => <Fish key={`fish-${idx}`} {...fish} toggleDone={toggleDone} onTagClick={handleTagClick} />)
            )
          : (
            <p className='text-gray-400 text-center py-4'>No fish found.</p>
            )}
      </div>
    </div>
  );
}

export default FishTrackerPage;
