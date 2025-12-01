import { ArchiveRestoreIcon, Trash2Icon } from 'lucide-react';
import { useEffect } from 'react';

import { confirmModal } from '../components/ConfirmModal';
import Loader from '../components/Loader';
import { SavestateItem, useSavestatesStore } from '../stores/useSaveStateStore';

interface SaveStateProps extends SavestateItem {
  handleDelete: (filename: string) => Promise<void>;
  handleRestore: (filename: string) => Promise<void>;
}

const SaveState = ({ created, filename, handleDelete, handleRestore }: SaveStateProps) => {
  const d = new Date(created);

  return (
    <li className='flex text-sm items-center justify-between py-3 px-3 hover:bg-gray-800 transition rounded-lg gap-4'>
      <div>
        {d.toLocaleDateString('en-EN')} {d.toLocaleTimeString('at-AT')}
      </div>

      <div className='flex-1 text-sm font-bold'>{filename}</div>

      <div className='flex-1 text-right'>
        <button
          onClick={() => handleRestore(filename)}
          className='text-indigo-400 hover:text-indigo-500 transition cursor-pointer mr-3'
        >
          <ArchiveRestoreIcon size={20} />
        </button>

        <button
          onClick={() => handleDelete(filename)}
          className='text-red-400 hover:text-red-500 transition cursor-pointer'
        >
          <Trash2Icon size={20} />
        </button>
      </div>
    </li>
  );
};

function SaveStatePage () {
  const getAll = useSavestatesStore((s) => s.getAll);
  const list = useSavestatesStore((s) => s.list);
  const loading = useSavestatesStore((s) => s.loading);

  const create = useSavestatesStore((s) => s.create);
  const remove = useSavestatesStore((s) => s.remove);
  const restore = useSavestatesStore((s) => s.restore);

  const operation = useSavestatesStore((s) => s.activeOperation);

  useEffect(() => {
    getAll();
  }, []);

  const handleRestore = async (filename: string) => {
    if (await confirmModal(`Do you really want to restore ${filename}?`)) {
      await restore(filename);
    }
  };

  const handleDelete = async (filename: string) => {
    if (await confirmModal(`Do you really want to delete ${filename}?`)) {
      await remove(filename);
    }
  };

  const handleCreate = async () => {
    if (await confirmModal('Do you really want to create a Savestate?')) {
      await create();
    }
  };

  return (
    <div className='w-11/12 m-auto'>
      {loading && <Loader message={`${operation} ...`} />}

      <div className='flex justify-between'>
        <h2 className='font-bold font-nms text-3xl mb-8'>Save States</h2>
        <button type='button' className='button h-10 p-0 px-5' onClick={handleCreate}>
          Create Savestate
        </button>
      </div>

      <div className='bg-gray-900 text-white rounded-lg shadow-md p-4'>
        <ul>
          {list.length > 0
            ? (
                list.map((log, idx) => (
                  <SaveState
                    key={`savestate-${idx}`}
                    {...log}
                    handleDelete={handleDelete}
                    handleRestore={handleRestore}
                  />
                ))
              )
            : (
              <p className='text-gray-400 text-center py-4'>No Savestates found.</p>
              )}
        </ul>
      </div>
    </div>
  );
}

export default SaveStatePage;
