import { openCustomModal } from './components/CustomModal';
import { FormBiomeInput } from './components/FormBiomeInput';

let isInitialized = false;
let isOpen = false;

const Custom: React.FC = () => {
  return (
    <div className='text-left'>
      <FormBiomeInput
        label='Biome Lookup'
        name='Biome'
        autoFocus
      />
    </div>
  );
};

export function registerBiomeSearch () {
  if (isInitialized) return;
  isInitialized = true;

  const handleShortcut = (e: KeyboardEvent) => {
    if (((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') && !isOpen) {
      e.preventDefault();
      openCustomModal(<Custom />, '', () => { isOpen = false; });
      isOpen = true;
    }
  };

  window.addEventListener('keydown', handleShortcut);
  electron.ipcRenderer.on('MENU_BIOME', () => {
    openCustomModal(<Custom />, '', () => { isOpen = false; });
    isOpen = true;
  });
}
