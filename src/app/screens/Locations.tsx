import noscreen from 'assets/noscreen.png';

import { Trash2Icon, Pencil, OmegaIcon, Share2Icon } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ListState } from '../../ipc/locationIPC';
import { confirmModal } from '../components/ConfirmModal';
import { openCustomModal } from '../components/CustomModal';
import { FormDropdown } from '../components/FormDropdown';
import { FormInput } from '../components/FormInput';
import Glyphs from '../components/Glyphs';
import Pagination from '../components/Pagination';
import { TagList } from '../components/TagList';
import { Nullable } from '../stores/apiInterfaces';
import useListStore from '../stores/useLocationStore';
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

const GlyphModal: React.FC<ListState> = (props) => {
  const { GalaxyName, Description, Screenshot, PortalCode } = props;

  const handlePortalCopy = async () => {
    await navigator.clipboard.writeText(`https://nmsportals.github.io/#${props.PortalCode}`);
  };
  const handleShare = () => {
    navigator.clipboard.writeText(`${GalaxyName} - ${Description}`);
    electron.ipcRenderer.invoke('SHOW_FILE', Screenshot);
  };

  return (
    <div className='relative w-full h-full rounded-xl overflow-hidden'>
      <img
        src={Screenshot || noscreen}
        alt='Screenshot'
        className='absolute inset-0 w-full h-full object-cover filter brightness-75'
        onError={(e) => (e.currentTarget.src = noscreen)}
      />

      <div className='absolute top-4 right-4 z-20 flex gap-3'>

        <button
          onClick={handlePortalCopy}
          className='p-2 rounded-full bg-black/40 hover:bg-indigo-700/60 duration-300 backdrop-blur-sm transition cursor-pointer'
          title='Copy Portal Code (URL)'
        >
          <OmegaIcon size={20} className='text-white' />
        </button>

        <button
          onClick={handleShare}
          className='p-2 rounded-full bg-black/40 hover:bg-indigo-700/60 duration-300 backdrop-blur-sm transition cursor-pointer'
          title='Share (Copies Description)'
        >
          <Share2Icon size={20} className='text-white' />
        </button>

      </div>

      <div className='absolute bottom-5 left-1/2 -translate-x-1/2 z-10 bg-black/30 backdrop-blur-sm rounded-xl p-5 flex flex-col items-center w-[760px] shadow-[0_0_15px_rgba(255,255,255,0.15)]'>
        <h2 className='text-2xl text-white font-nms'>{GalaxyName}</h2>
        <Glyphs portalCode={PortalCode} width='w-15' />
      </div>
    </div>
  );
};

const Screenshot: React.FC<ScreenshotProps> = ({ screen, alt, onClick }) => {
  const src = screen || noscreen;

  return (
    <img
      src={src}
      alt={`${alt} thumbnail`}
      className='rounded-md object-cover h-25 aspect-video border-4 border-indigo-500 hover:border-indigo-400 transition-all duration-200 cursor-pointer'
      onClick={onClick}
      onError={(e) => (e.currentTarget.src = noscreen)}
    />
  );
};
const ListItem: React.FC<EnhancedListState> = (loc) => {
  const handleTagClick = (tag: string) => loc.onTagClick?.(tag);

  return (
    <div className='flex gap-4 py-4 hover:bg-gray-800 transition rounded-lg px-2'>
      <Screenshot alt={loc.Description} screen={loc.Screenshot} onClick={() => loc.onSelect(loc)} />

      <div className='flex-1 min-w-0 flex flex-col justify-between'>
        <div className='flex items-start justify-between gap-4'>
          <h3
            className='text-indigo-400 hover:text-indigo-300 font-bold text-2xl cursor-pointer transition-colors duration-300 font-nms flex-shrink-0'
            onClick={() => loc.onSelect(loc)}
          >
            {loc.Biome && `${loc.Biome} • `}{loc.GalaxyName}
          </h3>

          <div className='flex-1 min-w-0 flex justify-end mt-1'>
            <TagList tags={loc.Tag} onClick={handleTagClick} />
          </div>
        </div>

        <div className='mt-2'>
          <Glyphs portalCode={loc.PortalCode} width='w-8' />
        </div>

        <div className='flex items-end justify-between gap-3 mt-3'>
          <p className='text-gray-300 line-clamp-2 flex-1'>
            {loc.Description}
          </p>

          <div className='flex gap-3 self-end'>
            <button
              onClick={() => loc.onEdit(loc.id!)}
              className='text-indigo-400 hover:text-indigo-500 transition cursor-pointer'
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={() => loc.onDelete?.(loc.id!)}
              className='text-red-400 hover:text-red-500 transition cursor-pointer'
            >
              <Trash2Icon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function ListPage () {
  const {
    getPage,
    delete: deleteEntry,
    entries,
    currentPage,
    pageSize,
    totalEntries
  } = useListStore();

  const [search, setSearch] = useState('');
  const [searchGalaxy, setSearchGalaxy] = useState('');
  const [searchBiome, setSearchBiome] = useState('');

  const getGalaxies = useMetaStore((s) => s.getGalaxies);
  const getBiomes = useMetaStore((s) => s.getBiomes);
  const optionGalaxies = useMetaStore((s) => s.optionGalaxies);
  const optionBiomes = useMetaStore((s) => s.optionBiomes);

  const startAutoRefresh = useAutoRefreshStore((s) => s.start);
  const nav = useNavigate();

  const searchQuery = useMemo(() => {
    return `${searchBiome} ${searchGalaxy} ${search}`
      .trim()
      .replace(/\s+/g, ' ');
  }, [
    searchBiome,
    searchGalaxy,
    search
  ]);

  useEffect(() => {
    startAutoRefresh();
    getGalaxies(true);
    getBiomes(true);
    getPage(1, pageSize);
  }, [
    startAutoRefresh,
    getGalaxies,
    getBiomes,
    getPage,
    pageSize
  ]);

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      getPage(1, pageSize, searchQuery);
    }, 300);
    return () => clearTimeout(timeout);
  }, [
    searchQuery,
    pageSize,
    getPage
  ]);

  const handleDelete = async (id: number) => {
    if (await confirmModal('Do you really want to delete this Location?')) {
      await deleteEntry(id);

      const totalAfterDelete = totalEntries - 1;
      const totalPages = Math.max(1, Math.ceil(totalAfterDelete / pageSize));
      const newPage = currentPage > totalPages ? totalPages : currentPage;

      await getPage(newPage, pageSize, searchQuery);
    }
  };

  const handlePageChange = async (page: number) => {
    await getPage(page, pageSize, searchQuery);
  };

  const handleTagClick = (term: string) => {
    const lowerTerm = term.toLowerCase();
    if (!searchQuery.toLowerCase().includes(lowerTerm)) {
      setSearch((s) => `${s} ${lowerTerm}`.trim());
    }
  };

  const handleOnCopy = async (portalCode: string) => {
    await navigator.clipboard.writeText(portalCode);
  };

  const handleOnSelect = async (data: ListState) => {
    openCustomModal(
      <GlyphModal {...data} />,
      'w-[95%] h-[95%] relative rounded-xl overflow-hidden flex flex-col items-center justify-center'
    );
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
          onChange={(value: string) => setSearchBiome(value)}
        />

        <FormDropdown
          label='Galaxy'
          name='searchGalaxy'
          options={optionGalaxies}
          onChange={(value: string) => setSearchGalaxy(value)}
        />
      </div>

      <div className='divide-y divide-gray-800'>
        {entries.map((loc) => (
          <ListItem
            key={loc.id}
            {...loc}
            onDelete={handleDelete}
            onTagClick={handleTagClick}
            onCopy={handleOnCopy}
            onSelect={handleOnSelect}
            onEdit={handleEdit}
          />
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
