import { useEffect } from 'react';

import { confirmModal } from '../components/ConfirmModal';
import useSaveStore from '../stores/useSaveStore';

export default function TestPage () {
  const frigates = useSaveStore((s) => s.missions.frigates);
  const settlements = useSaveStore((s) => s.missions.settlements);
  const getSave = useSaveStore((s) => s.getSave);

  const handleDebugSave = async () => {
    await electron.ipcRenderer.invoke('DEBUG_SAVE');
    await confirmModal('Debug Save done');
  };

  useEffect(() => {
    getSave();
  }, []);

  return (
    <div>
      <textarea rows={15} cols={50} className='border bg-gray-700 mr-5'>
        {JSON.stringify(frigates, null, 2)}
      </textarea>

      <textarea rows={15} cols={50} className='border bg-gray-700'>
        {JSON.stringify(settlements, null, 2)}
      </textarea>
      <br /> <br />

      <button
        className='button'
        onClick={handleDebugSave}
      >
        Debug Save
      </button>

    </div>
  );
}
