import { create } from 'zustand';

import { Option } from '../components/FormDropdown';

interface iTag {
  Tag: string;
}

interface iGalaxy {
  GalaxyName: string;
}
interface MetaStoreState {
  loading: boolean;
  error: boolean;
  tags: string[];
  galaxies: string[];
  optionTags: Option[];
  optionGalaxies: Option[];
  getTags: () => Promise<void>;
  getGalaxies: (withAllOpt: boolean) => Promise<void>;
}

const defState = {
  loading: true,
  error: false,
  tags: [] as string[],
  galaxies: [] as string[],
  optionTags: [] as Option[],
  optionGalaxies: [] as Option[]
};

const useMetaStore = create<MetaStoreState>((set) => ({
  ...defState,
  getTags: async () => {
    set({ ...defState, loading: true });
    try {
      const tags: iTag[] = await electron.ipcRenderer.invoke('DB-TAGS');
      const optionTags = tags.map((i) => ({ label: i.Tag, value: i.Tag }));

      set({ optionTags, tags: tags.map((i) => i.Tag), loading: false, error: false });
    } catch (_err) {
      set({ ...defState, loading: false, error: true });
    }
  },
  getGalaxies: async (withAllOpt: boolean) => {
    set({ ...defState, loading: true });
    try {
      const galaxies: iGalaxy[] = await electron.ipcRenderer.invoke('DB-GALAXIES');
      let optionGalaxies = galaxies.map((i) => ({ label: i.GalaxyName, value: i.GalaxyName }));

      if (withAllOpt) {
        optionGalaxies = [{ label: 'All', value: '' }, ...optionGalaxies];
      }

      set({ optionGalaxies, galaxies: galaxies.map((i) => i.GalaxyName), loading: false, error: false });
    } catch (_err) {
      set({ ...defState, loading: false, error: true });
    }
  }
}));

export default useMetaStore;
