import { useEffect } from 'react';

import { confirmModal } from '../components/ConfirmModal';
import useMissionsStore from '../stores/useMissionsStore';

export default function TestPage () {
  const frigates = useMissionsStore((s) => s.frigates);
  const settlements = useMissionsStore((s) => s.settlements);
  const getMissions = useMissionsStore((s) => s.getMissions);

  const handleDebugSave = async () => {
    await electron.ipcRenderer.invoke('DEBUG_SAVE');
    await confirmModal('Debug Save done');
  };

  useEffect(() => {
    getMissions();
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
