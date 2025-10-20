import noscreen from 'assets/noscreen.png';

import { Trash2Icon, ClipboardCopy, MessageCircleCode, PencilRulerIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ListState } from '../../ipc/dbIPC';
import { confirmModal } from '../components/ConfirmModal';
import { openCustomModal } from '../components/CustomModal';
import { FormDropdown } from '../components/FormDropdown';
import { FormInput } from '../components/FormInput';
import Glyphs from '../components/Glyphs';
import Pagination from '../components/Pagination';
import { TagList } from '../components/TagList';
import { Nullable } from '../stores/apiInterfaces';
import useListStore from '../stores/useListStore';
import useMetaStore from '../stores/useMetaStore';
import { useAutoRefreshStore } from '../stores/useRefreshStore';
interface EnhancedListState extends ListState {
  onDelete?: (key: number) => Promise<void>;
  onCopy?: (portalCode: string) => void;
  onTagClick?: (tag: string) => void;
  onSelect: (data: ListState) => Promise<void>;
  onEdit: (id: number) => void;
}

interface ScreenshotProps {
  screen: Nullable<string>;
  alt: string;
  onClick: () => void;
}

const GlyphModal: React.FC<ListState> = (list) => {
  const discordCode = list.PortalCode.split('').map((c) => `:portal${c.toLowerCase()}: `)
    .join('')
    .trim();

  return (
    <div className='relative w-full h-full rounded-xl overflow-hidden'>
      <img
        src={list.Screenshot || noscreen}
        alt='Screenshot'
        className='absolute inset-0 w-full h-full object-cover filter brightness-75'
      />

      <div className='absolute top-4 right-4 z-20 flex gap-3'>
        <button
          onClick={() => navigator.clipboard.writeText(discordCode)}
          className='p-2 rounded-full bg-black/40 hover:bg-indigo-700/60 duration-300 backdrop-blur-sm transition cursor-pointer'
          title='Copy Portal Code (Discord)'
        >
          <MessageCircleCode size={20} className='text-white' />
        </button>

        <button
          onClick={() => navigator.clipboard.writeText(list.PortalCode)}
          className='p-2 rounded-full bg-black/40 hover:bg-indigo-700/60 duration-300 backdrop-blur-sm transition cursor-pointer'
          title='Copy Portal Code (Discord)'
        >
          <ClipboardCopy size={20} className='text-white' />
        </button>
      </div>

      <div className='absolute bottom-5 left-1/2 -translate-x-1/2 z-10 bg-black/30 backdrop-blur-sm rounded-xl p-5 flex flex-col items-center w-[760px] shadow-[0_0_15px_rgba(255,255,255,0.15)]'>
        <h2 className='text-2xl text-white font-nms'>{list.GalaxyName}</h2>
        <Glyphs portalCode={list.PortalCode} width='w-15' />
      </div>
    </div>
  );
};
const Screenshot: React.FC<ScreenshotProps> = ({ screen, alt, onClick }) => {
  return screen
    ? (
      <img
        src={screen}
        alt={`${alt} thumbnail`}
        className='rounded-md object-cover h-25 aspect-video border-4 border-indigo-500 hover:border-indigo-400 transition-all duration-200 cursor-pointer'
        onClick={onClick}
      />
      )
    : (
      <img
        src={noscreen}
        alt={`${alt}`}
        className='rounded-md object-cover h-25 aspect-video border-4 border-indigo-500 hover:border-indigo-400 transition-all duration-200 cursor-pointer'
        onClick={onClick}
      />
      );
};

const ListItem: React.FC<EnhancedListState> = (loc) => {
  const handleTagClick = (tag: string) => loc.onTagClick(tag);

  return (
    <div className='flex flex-col justify-between items-start py-4 hover:bg-gray-800 transition rounded-lg px-2'>
      <div className='flex gap-3 w-full'>
        <Screenshot alt={loc.Description} screen={loc.Screenshot} onClick={() => loc.onSelect(loc)} />
        <div className='w-full'>
          <h3 className='text-indigo-400 hover:text-indigo-300 font-bold text-2xl cursor-pointer transition-colors duration-300 font-nms' onClick={() => loc.onSelect(loc)}>
            {loc.Biome && `${loc.Biome} •`} {loc.GalaxyName}
          </h3>
          <Glyphs portalCode={loc.PortalCode} width='w-7' />
          <p className='mt-5'>{loc.Description}</p>
        </div>

        <div className='flex flex-col mt-3 sm:mt-0 justify-between items-end w-180'>
          <TagList tags={loc.Tag} onClick={handleTagClick} />
          <span className='text-gray-400 text-sm flex items-center gap-2'>
            <button
              className='cursor-pointer'
              onClick={() => loc.onEdit?.(loc.id!)}
            > <PencilRulerIcon size='20' className='text-indigo-400 hover:text-indigo-500 transition duration-250 mr-2' />
            </button>
            <button
              className='cursor-pointer'
              onClick={() => loc.onDelete?.(loc.id!)}
            >
              <Trash2Icon size='20' className='text-red-400 hover:text-red-500 transition duration-250' />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

function ListPage () {
  const { getPage, delete: deleteEntry, entries, currentPage, pageSize, totalEntries } =
    useListStore();
  const [search, setSearch] = useState('');
  const [searchGalaxy, setSearchGalaxy] = useState('');
  const [searchBiome, setsearchBiome] = useState('');

  const getGalaxies = useMetaStore((s) => s.getGalaxies);
  const getBiomes = useMetaStore((s) => s.getBiomes);

  const startAutoRefresh = useAutoRefreshStore((s) => s.start);

  const optionGalaxies = useMetaStore((s) => s.optionGalaxies);
  const optionBiomes = useMetaStore((s) => s.optionBiomes);
  const nav = useNavigate();

  useEffect(() => {
    startAutoRefresh();
    getGalaxies(true);
    getBiomes(true);
    getPage(1, pageSize);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getPage(1, pageSize, `${searchBiome} ${searchGalaxy} ${search}`.replace(/^\s+|\s+$|\s+(?=\s)/g, ''));
    }, 300);
    return () => clearTimeout(timeout);
  }, [
    search,
    searchGalaxy,
    searchBiome
  ]);

  const getSearch = () => `${searchBiome} ${searchGalaxy} ${search}`.replace(/^\s+|\s+$|\s+(?=\s)/g, '');

  const handleDelete = async (id: number) => {
    if (await confirmModal('Do you really want to delete this Location?')) {
      await deleteEntry(id);

      const totalAfterDelete = totalEntries - 1;
      const totalPages = Math.max(1, Math.ceil(totalAfterDelete / pageSize));
      const newPage = Math.min(currentPage, totalPages);
      await getPage(newPage, pageSize, getSearch());
    }
  };

  const handlePageChange = async (page: number) => {
    await getPage(page, pageSize, getSearch());
  };

  const handleTagClick = (term: string) => {
    if (!getSearch().includes(term)) {
      setSearch((s) => `${s} ${term.toLocaleLowerCase()}`.trim());
    }
  };

  const handleOnCopy = async (portalCode: string) => {
    await navigator.clipboard.writeText(portalCode);
  };

  const handleonSelect = async (data: ListState) => {
    openCustomModal(<GlyphModal {...data} />, 'w-[95%] h-[95%] relative rounded-xl overflow-hidden flex flex-col items-center justify-center');
  };

  const handleEdit = (id: number) => nav(`/edit/${id}`);

  return (
    <div className='bg-gray-900 text-white rounded-lg shadow-md p-4 w-full'>
      <div className='flex gap-2 mb-4'>
        <FormInput
          id='search'
          label='Search'
          placeholder='Search ...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
          className='w-full'
        />

        <FormDropdown
          label='Biome'
          name='searchBiome'
          options={optionBiomes}
          onChange={(value: string) => setsearchBiome(value)}
        />

        <FormDropdown
          label='Galaxy'
          name='searchGalaxy'
          options={optionGalaxies}
          onChange={(value: string) => setSearchGalaxy(value)}
        />

      </div>
      <div className='divide-y divide-gray-800'>
        {entries.map((loc, idx) => (
          <ListItem key={`location-${loc.id}-${idx}`} {...loc} onDelete={handleDelete} onTagClick={handleTagClick} onCopy={handleOnCopy} onSelect={handleonSelect} onEdit={handleEdit} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalEntries={totalEntries}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ListPage;
