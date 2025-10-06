import { confirmModal } from '../components/ConfirmModal';

export default function TestPage () {
  const handleDebugSave = async () => {
    await electron.ipcRenderer.invoke('DEBUG_SAVE');
    await confirmModal('Debug Save done');
  };

  return (
    <div>
      <button
        className='button'
        onClick={handleDebugSave}
      >
        Debug Save
      </button>

    </div>
  );
}
