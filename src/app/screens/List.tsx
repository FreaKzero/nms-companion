import { CameraIcon, TrashIcon } from 'lucide-react';
import React, { useEffect } from 'react';

import Glyphs from '../components/ui/Glyphs';
import { Nullable } from '../stores/apiInterfaces';
import useListStore, { ListState } from '../stores/useListStore';

interface EnhancedListState extends ListState {
  onDelete?: (key: string) => Promise<void>;
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
    : (<div className='rounded-md m-auto h-25 aspect-video border-4 grid border-gray-500 place-items-center'><CameraIcon size='60' className='stroke-gray-500' /></div>);
};

const ListItem: React.FC<EnhancedListState> = (loc) => {
  return (
    <div
      className='flex flex-col justify-between items-start py-4 hover:bg-gray-800 transition rounded-lg px-2'
    >
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
          <span className='text-green-400 text-sm font-medium'>
            {loc.Tag}
          </span>
          <span className='text-gray-400 text-sm flex items-center gap-1'>
            <button className='button' onClick={() => loc.onDelete(loc.id)}><TrashIcon size='20' /></button>
          </span>
        </div>

      </div>

    </div>
  );
};

function ListPage () {
  const getEntries = useListStore((state) => state.getAll);
  const deleteEntry = useListStore((state) => state.delete);
  const locations = useListStore((state) => state.entries);

  useEffect(() => {
    getEntries();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Do you really want to delete this entry ?')) {
      await deleteEntry(id);
    }
  };

  return (
    <div className='bg-gray-900 text-white rounded-lg shadow-md p-4 w-full'>
      <div className='divide-y divide-gray-800'>
        {locations.map((loc) => (
          <ListItem key={loc.id} {...loc} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default ListPage;
