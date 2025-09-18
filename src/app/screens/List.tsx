import { TrashIcon } from 'lucide-react';
import React, { useEffect } from 'react';

import Glyphs from '../components/ui/Glyphs';
import useListStore, { ListState } from '../stores/useListStore';

interface EnhancedListState extends ListState {
  onDelete: () => void;
}

// <img className='w-full h-32 md:h-36 object-cover' src={props.Screenshot.length ? props.Screenshot : 'http://localhost:3001/assets/noscreen.png'} />;

const EntryItem = ({ ...props }: EnhancedListState) => {
  <span className='px-3 py-1 text-xs font-medium bg-green-900 bg-opacity-50 text-green-200 rounded-full border border-green-800'>{props.id} asdf</span>;

  return (
    <div className='border border-neutral-700 rounded-lg p-4 transition duration-200 bg-gray-900'>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='md:w-48 flex-shrink-0'>
          <div className='relative'>
            <div className='absolute inset-0 opacity-20 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 rounded-xl filter blur-2xl' />
            <div className='relative border border-white border-opacity-20 rounded-xl overflow-hidden' />
          </div>
        </div>
        <div className='flex-1'>
          <div className='flex items-center justify-between'>
            <h3 className='text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 mb-3'>{props.GalaxyName} {props.id}</h3>
            <div className='ml-2 flex shrink-0'>
              <div className='flex items-center text-sm text-white'>
                <Glyphs portalCode={props.PortalCode} width='w-7' />
              </div>
            </div>
          </div>

          <div className='flex flex-wrap gap-2 mb-4'>
            {props.Tag.length && props.Tag}
          </div>

          <div className='flex items-center justify-between'>
            <div className='ml-2 flex shrink-0'>
              <p className='text-neutral-300 leading-relaxed'>{props.Description}</p>
            </div>
            <div className='ml-2 flex shrink-0'>
              <button
                className='p-2 rounded-md bg-red-500 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                onClick={props.onDelete}
              ><TrashIcon />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

function ListPage () {
  const getEntries = useListStore((state) => state.getAll);
  const deleteEntry = useListStore((state) => state.delete);

  const x = useListStore();
  useEffect(() => {
    getEntries();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Do you really want to delete this entry ?')) {
      deleteEntry(id);
    }
  };

  return (
    <div className='mx-auto w-full h-screen p-10'>
      <div className='space-y-6'>
        {x.entries.map((a) => {
          return (
            <EntryItem
              key={a.id}
              {...a}
              onDelete={() => handleDelete(a.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ListPage;
