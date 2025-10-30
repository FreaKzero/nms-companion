/* eslint-disable @stylistic/jsx-closing-tag-location */
import { openCustomModal } from './components/CustomModal';
import { FormBiomeInput } from './components/FormBiomeInput';

let isInitialized = false;
let isOpen = false;

export function registerBiomeSearch () {
  if (isInitialized) return;
  isInitialized = true;

  const handleShortcut = (e: KeyboardEvent) => {
    if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') && !isOpen) {
      e.preventDefault();
      openCustomModal(<div className='text-left'>
        <FormBiomeInput
          label='Biome Lookup'
          name='Biome'
          autoFocus
        />
      </div>, '', () => { isOpen = false; });
      isOpen = true;
    }
  };

  window.addEventListener('keydown', handleShortcut);
}
