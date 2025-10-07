import { CameraIcon, ClipboardIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { confirmModal } from '../components/ConfirmModal';
import { FormInput } from '../components/FormInput';
import { openGlyphOverlay } from '../components/GlyphOverlay';
import Glyphs from '../components/Glyphs';
import Pagination from '../components/Pagination';
import { TagList } from '../components/TagList';
import { Nullable } from '../stores/apiInterfaces';
import useListStore, { ListState } from '../stores/useListStore';

interface EnhancedListState extends ListState {
  onDelete?: (key: number) => Promise<void>;
  onCopy?: (portalCode: string) => void;
  onTagClick?: (tag: string) => void;
  onSelect: (portalCode: string, galaxy: string) => Promise<void>;
}

interface ScreenshotProps {
  screen: Nullable<string>;
  alt: string;
}

const Screenshot: React.FC<ScreenshotProps> = ({ screen, alt }) => {
  return screen
    ? (
      <img
        src={screen}
        alt={`${alt} thumbnail`}
        className='rounded-md object-cover h-25 aspect-video border-4 border-gray-500'
      />
      )
    : (
      <div className='rounded-md m-auto h-25 aspect-video border-4 grid border-gray-500 place-items-center'>
        <CameraIcon size='60' className='stroke-gray-500' />
      </div>
      );
};

const ListItem: React.FC<EnhancedListState> = (loc) => {
  const handleTagClick = (tag: string) => loc.onTagClick(tag);

  return (
    <div className='flex flex-col justify-between items-start py-4 hover:bg-gray-800 transition rounded-lg px-2'>
      <div className='flex gap-3 w-full'>
        <Screenshot alt={loc.Description} screen={loc.Screenshot} />
        <div className='w-full'>
          <h3 className='text-blue-400 font-bold text-xl'>
            {loc.GalaxyName}
          </h3>
          <Glyphs portalCode={loc.PortalCode} width='w-7' />
          <p className='mt-5'>{loc.Description}</p>
        </div>

        <div className='flex flex-col mt-3 sm:mt-0 justify-between items-end'>
          <TagList tags={loc.Tag} onClick={() => handleTagClick(loc.Tag)} />
          <span className='text-gray-400 text-sm flex items-center gap-2'>
            <button
              className='button'
              onClick={() => loc.onSelect(loc.PortalCode, loc.GalaxyName)}
            >
              <SearchIcon size='20' />
            </button>

            <button
              className='button'
              onClick={() => loc.onCopy?.(loc.PortalCode!)}
            >
              <ClipboardIcon size='20' />
            </button>
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

  const handleTagClick = (tag: string) => setSearch(tag);

  const handleOnCopy = async (portalCode: string) => {
    await navigator.clipboard.writeText(portalCode);
  };

  const handleonSelect = async (portcalCode: string, galaxyName: string) => {
    openGlyphOverlay(portcalCode, galaxyName);
  };

  return (
    <div className='bg-gray-900 text-white rounded-lg shadow-md p-4 w-full'>
      <div className='mb-4'>
        <FormInput
          id='search'
          label='Search'
          placeholder='Search by Tag, Title or Description...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />
      </div>
      <div className='divide-y divide-gray-800'>
        {entries.map((loc) => (
          <ListItem key={`location-${loc.id}`} {...loc} onDelete={handleDelete} onTagClick={handleTagClick} onCopy={handleOnCopy} onSelect={handleonSelect} />
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
