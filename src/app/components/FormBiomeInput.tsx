import { ArrowDownWideNarrow, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const BIOME_DATA = [
  {
    name: 'Lush',
    altname: [
      'Rainy',
      'Verdant',
      'Tropical',
      'Viridescent',
      'Paradise',
      'Temperate',
      'Humid',
      'Overgrown',
      'Flourishing',
      'Grassy',
      'Bountiful'
    ]
  },
  {
    name: 'Barren',
    altname: [
      'Barren',
      'Desert',
      'Rocky',
      'Bleak',
      'Parched',
      'Abandoned',
      'Dusty',
      'Desolate',
      'Wind-swept'
    ]
  },
  {
    name: 'Dead',
    altname: [
      'Terraforming Catastrophe',
      'Dead',
      'Empty',
      'Desolate',
      'Lifeless',
      'Forsaken',
      'Life-Incompatible',
      'Low Atmosphere',
      'Airless',
      'Abandoned'
    ]
  },
  {
    name: 'Scorched',
    altname: [
      'Charred',
      'Arid',
      'Scorched',
      'Hot',
      'Fiery',
      'Boiling',
      'High Temperature',
      'Torrid',
      'Incandescent',
      'Scalding'
    ]
  },
  {
    name: 'Frozen',
    altname: [
      'Frozen',
      'Icebound',
      'Arctic',
      'Glacial',
      'Sub-zero',
      'Icy',
      'Frostbound',
      'Freezing',
      'Hiemal',
      'Hyperborean'
    ]
  },
  {
    name: 'Toxic',
    altname: [
      'Toxic',
      'Poisonous',
      'Noxious',
      'Corrosive',
      'Acidic',
      'Caustic',
      'Acrid',
      'Blighted',
      'Miasmatic',
      'Rotting'
    ]
  },
  {
    name: 'Irradiated',
    altname: [
      'Irradiated',
      'Radioactive',
      'Contaminated',
      'Nuclear',
      'Isotopic',
      'Decaying Nuclear',
      'Gamma-Intensive',
      'High Radio Source',
      'Supercritical',
      'High Energy'
    ]
  },
  {
    name: 'Marsh',
    altname: [
      'Marshy',
      'Swamp',
      'Tropical',
      'Foggy',
      'Misty',
      'Boggy',
      'Endless Morass',
      'Quagmire',
      'Hazy',
      'Cloudy',
      'Vapour',
      'Reeking',
      'Murky',
      'Damp'
    ]
  },
  {
    name: 'Volcanic',
    altname: [
      'Lava',
      'Magma',
      'Erupting',
      'Volcanic',
      'Ash-Shrouded',
      'Ashen',
      'Tectonic',
      'Unstable',
      'Violent',
      'Molten',
      'Flame-Ruptured',
      'Imminent Core Detonation',
      'Obsidian Bead',
      'Basalt'
    ]
  },
  {
    name: 'Mega Exotic',
    altname: [
      'Crimson',
      'Planetary Anomaly',
      'Lost Red',
      'Lost Green',
      'Lost Blue',
      '[REDACTED]',
      'Stellar Corruption Detected',
      'Chromatic Fog',
      'Vile Anomaly',
      'Vermillion Globe',
      'Toxic Anomaly',
      'Frozen Anomaly',
      'Harsh Blue Globe',
      'Scarlet',
      'Doomed Jade',
      'Azure',
      'Blood',
      'Haunted Emeril',
      'Cerulean',
      'Wine Dark',
      'Deathly Green Anomaly',
      'Ultramarine'
    ]
  }
];

interface FormBiomeInputProps {
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const FormBiomeInput: React.FC<FormBiomeInputProps> = ({
  label,
  id,
  register,
  value: externalValue,
  onChange,
  placeholder,
  disabled = false
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [internalValue, setInternalValue] = useState<string>(externalValue ?? '');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalValue(externalValue ?? '');
  }, [externalValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allAltNames = BIOME_DATA.flatMap((b) => b.altname.map((alt) => ({ alt, name: b.name })));
  const filtered = allAltNames.filter((a) => a.alt.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (val: string) => {
    setInternalValue(val);
    onChange?.(val);
    register?.onChange?.({ target: { name: id, value: val } });
    setOpen(false);
    setSearch('');
    setHighlightedIndex(-1);
  };

  const handleInputChange = (val: string) => {
    setSearch(val);
    if (!open) setOpen(true);
    setHighlightedIndex(0);
  };

  const handleClear = () => {
    setInternalValue('');
    onChange?.('');
    register?.onChange?.({ target: { name: id, value: '' } });
    setSearch('');
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0 && filtered[highlightedIndex]) {
      e.preventDefault();
      handleSelect(filtered[highlightedIndex].name);
    } else if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'Backspace' && search === '') {
      // Wenn das Eingabefeld leer ist → handleClear
      e.preventDefault();
      handleClear();
    }
  };

  return (
    <div className='flex flex-col gap-1 relative' ref={dropdownRef}>
      <label htmlFor={id} className='input-text-label'>
        {label}
      </label>

      <input type='hidden' id={id} value={internalValue} {...(register || {})} />

      <div className='relative'>
        <input
          type='text'
          disabled={disabled}
          value={search || internalValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(true)}
          placeholder={placeholder || 'Search Biome...'}
          className='input-text pr-16'
        />

        <button
          type='button'
          onClick={() => setOpen(!open)}
          className='absolute inset-y-0 right-2 text-gray-400 hover:text-gray-200 flex items-center'
        >
          <ArrowDownWideNarrow />
        </button>

        {internalValue && (
          <button
            type='button'
            onClick={handleClear}
            className='absolute inset-y-0 right-9 text-gray-400 hover:text-red-400 flex items-center'
          >
            <X size={18} />
          </button>
        )}

        {open && (
          <div className='absolute z-10 mt-1 w-full bg-gray-900/80 backdrop-blur-md border border-neutral-700 rounded-lg max-h-60 overflow-auto shadow-lg'>
            {filtered.length > 0
              ? (
                  filtered.map((opt, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelect(opt.name)}
                      className={`px-3 py-2 cursor-pointer ${
                    highlightedIndex === i
                      ? 'bg-indigo-600 text-white'
                      : internalValue === opt.name
                        ? 'bg-indigo-700 text-white'
                        : 'hover:bg-indigo-600'
                  }`}
                    >
                      <span className='block text-white'>{opt.name}</span>
                      <span className='block text-xs text-gray-400'>({opt.alt})</span>
                    </div>
                  ))
                )
              : (
                <div className='px-3 py-2 text-sm text-gray-400'>No results found</div>
                )}
          </div>
        )}
      </div>
    </div>
  );
};
