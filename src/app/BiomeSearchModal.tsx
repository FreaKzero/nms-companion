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

  electron.ipcRenderer.on('MENU_BIOME', () => {
    if (!isOpen) {
      openCustomModal(<Custom />, '', () => { isOpen = false; });
      isOpen = true;
    }
  });
}
