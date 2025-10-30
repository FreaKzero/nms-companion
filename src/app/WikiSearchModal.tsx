import { useState, useCallback } from 'react';

import { openCustomModal } from './components/CustomModal';
import { FormInput } from './components/FormInput';

let isInitialized = false;
let isOpen = false;

const Custom: React.FC = () => {
  const [search, setSearch] = useState('');

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      electron.ipcRenderer.invoke('OPEN_URL', `https://nomanssky.fandom.com/wiki/Special:Search?scope=internal&navigationSearch=true&query=${encodeURI(search)}`);
    }
  }, [search]);

  return (
    <div className='text-left'>
      <FormInput
        id='search'
        label='Search NMS Wiki'
        placeholder='Search ...'
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        onClear={() => setSearch('')}
        onKeyDown={handleKeyDown}
        className='w-full'
        autoFocus
      />
    </div>
  );
};

export function registerWikiSearch () {
  if (isInitialized) return;
  isInitialized = true;

  const handleShortcut = (e: KeyboardEvent) => {
    if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') && !isOpen) {
      e.preventDefault();
      openCustomModal(<Custom />, '', () => { isOpen = false; });
      isOpen = true;
    }
  };

  window.addEventListener('keydown', handleShortcut);
}
