import { create } from 'zustand';

import { Option } from '../components/FormDropdown';

interface iTag {
  Tag: string;
}

interface iGalaxy {
  GalaxyName: string;
}

interface iBiome {
  Biome: string;
}

interface MetaStoreState {
  loading: boolean;
  error: boolean;
  tags: string[];
  galaxies: string[];
  biomes: string[];
  optionTags: Option[];
  optionGalaxies: Option[];
  optionBiomes: Option[];
  getTags: () => Promise<void>;
  getGalaxies: (withAllOpt: boolean) => Promise<void>;
  getBiomes: (withAllOpt: boolean) => Promise<void>;
}

const defState = {
  loading: true,
  error: false,
  tags: [] as string[],
  galaxies: [] as string[],
  biomes: [] as string[],
  optionTags: [] as Option[],
  optionGalaxies: [] as Option[],
  optionBiomes: [] as Option[]
};

const useMetaStore = create<MetaStoreState>((set) => ({
  ...defState,
  getTags: async () => {
    set({ ...defState, loading: true });
    try {
      const tags: iTag[] = await electron.ipcRenderer.invoke('db.list.getTags');
      const optionTags = tags.map((i) => ({ label: i.Tag, value: i.Tag }));

      set({ optionTags, tags: tags.map((i) => i.Tag), loading: false, error: false });
    } catch (_err) {
      set({ ...defState, loading: false, error: true });
    }
  },
  getGalaxies: async (withAllOpt: boolean) => {
    set({ ...defState, loading: true });
    try {
      const galaxies: iGalaxy[] = await electron.ipcRenderer.invoke('db.list.getGalaxies');
      let optionGalaxies = galaxies.map((i) => ({ label: i.GalaxyName, value: i.GalaxyName }));

      if (withAllOpt) {
        optionGalaxies = [{ label: 'All', value: '' }, ...optionGalaxies];
      }

      set({ optionGalaxies, galaxies: galaxies.map((i) => i.GalaxyName), loading: false, error: false });
    } catch (_err) {
      set({ ...defState, loading: false, error: true });
    }
  },
  getBiomes: async (withAllOpt: boolean) => {
    set({ ...defState, loading: true });
    try {
      const biomes: iBiome[] = await electron.ipcRenderer.invoke('db.list.getBiomes');
      let optionBiomes = biomes.map((i) => ({ label: i.Biome, value: i.Biome }));

      if (withAllOpt) {
        optionBiomes = [{ label: 'All', value: '' }, ...optionBiomes];
      }

      set({ optionBiomes, galaxies: biomes.map((i) => i.Biome), loading: false, error: false });
    } catch (_err) {
      set({ ...defState, loading: false, error: true });
    }
  }
}));

export default useMetaStore;
