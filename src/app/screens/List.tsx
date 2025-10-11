import { CameraIcon, Trash2Icon, ClipboardCopy, MessageCircleCode } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { confirmModal } from '../components/ConfirmModal';
import { openCustomModal } from '../components/CustomModal';
import { FormInput } from '../components/FormInput';
import Glyphs from '../components/Glyphs';
import Pagination from '../components/Pagination';
import { TagList } from '../components/TagList';
import { Nullable } from '../stores/apiInterfaces';
import useListStore, { ListState } from '../stores/useListStore';

interface EnhancedListState extends ListState {
  onDelete?: (key: number) => Promise<void>;
  onCopy?: (portalCode: string) => void;
  onTagClick?: (tag: string) => void;
  onSelect: (data: ListState) => Promise<void>;
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
        src={list.Screenshot}
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
      <div className='rounded-md m-auto h-25 aspect-video border-4 grid border-indigo-500 place-items-center'>
        <CameraIcon size='60' className='stroke-indigo-500' />
      </div>
      );
};

const ListItem: React.FC<EnhancedListState> = (loc) => {
  const handleTagClick = (tag: string) => loc.onTagClick(tag);

  return (
    <div className='flex flex-col justify-between items-start py-4 hover:bg-gray-800 transition rounded-lg px-2'>
      <div className='flex gap-3 w-full'>
        <Screenshot alt={loc.Description} screen={loc.Screenshot} onClick={() => loc.onSelect(loc)} />
        <div className='w-full'>
          <h3 className='text-indigo-400 hover:text-indigo-300 font-bold text-2xl cursor-pointer transition-colors duration-300 font-nms' onClick={() => handleTagClick(loc.GalaxyName)}>
            {loc.GalaxyName}
          </h3>
          <Glyphs portalCode={loc.PortalCode} width='w-7' />
          <p className='mt-5'>{loc.Description}</p>
        </div>

        <div className='flex flex-col mt-3 sm:mt-0 justify-between items-end w-180'>
          <TagList tags={loc.Tag} onClick={handleTagClick} />
          <span className='text-gray-400 text-sm flex items-center gap-2'>
            <button
              className='button bg-red-500 hover:bg-red-400'
              onClick={() => loc.onDelete?.(loc.id!)}
            >
              <Trash2Icon size='20' />
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

  useEffect(() => {
    getPage(1, pageSize);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getPage(1, pageSize, search);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleDelete = async (id: number) => {
    if (await confirmModal('Do you really want to delete this Location?')) {
      await deleteEntry(id);

      const totalAfterDelete = totalEntries - 1;
      const totalPages = Math.max(1, Math.ceil(totalAfterDelete / pageSize));
      const newPage = Math.min(currentPage, totalPages);
      await getPage(newPage, pageSize);
    }
  };

  const handlePageChange = async (page: number) => {
    await getPage(page, pageSize);
  };

  const handleTagClick = (term: string) => {
    if (!search.includes(term)) {
      setSearch((s) => `${s} ${term}`.trim());
    }
  };

  const handleOnCopy = async (portalCode: string) => {
    await navigator.clipboard.writeText(portalCode);
  };

  const handleonSelect = async (data: ListState) => {
    openCustomModal(<GlyphModal {...data} />, 'w-[95%] h-[95%] relative rounded-xl overflow-hidden flex flex-col items-center justify-center');
  };

  return (
    <div className='bg-gray-900 text-white rounded-lg shadow-md p-4 w-full'>
      <div className='mb-4'>
        <FormInput
          id='search'
          label='Search'
          placeholder='Search by Tag, Galaxy Name and Description...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />
      </div>
      <div className='divide-y divide-gray-800'>
        {entries.map((loc, idx) => (
          <ListItem key={`location-${loc.id}-${idx}`} {...loc} onDelete={handleDelete} onTagClick={handleTagClick} onCopy={handleOnCopy} onSelect={handleonSelect} />
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
