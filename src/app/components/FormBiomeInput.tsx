import { ArrowDownWideNarrow, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';

import BIOME_DATA from '../mappings/biomes.json';

// https://www.reddit.com/r/NoMansSkyTheGame/comments/1im3zuk/biome_list_for_whoever_wants_it/
interface FormBiomeInputProps {
  label: string;
  name: string;
  control: Control<any>;
  placeholder?: string;
  disabled?: boolean;
  required?: string;
}

export const FormBiomeInput: React.FC<FormBiomeInputProps> = ({
  label,
  name,
  control,
  placeholder,
  disabled = false,
  required
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required } : undefined}
      render={({ field, fieldState }) => {
        const [open, setOpen] = useState(false);
        const [search, setSearch] = useState('');
        const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

        useEffect(() => {
          setSearch(field.value ?? '');
        }, [field.value]);

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
          field.onChange(val);
          setSearch(val);
          setOpen(false);
          setHighlightedIndex(-1);
        };

        const handleInputChange = (val: string) => {
          setSearch(val);
          if (!open) setOpen(true);
          setHighlightedIndex(0);
        };

        const handleClear = () => {
          field.onChange('');
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
            setHighlightedIndex((prev) => Math.max(prev - 0, 0));
          } else if (e.key === 'Enter' && highlightedIndex >= 0 && filtered[highlightedIndex]) {
            e.preventDefault();
            handleSelect(filtered[highlightedIndex].name);
          } else if (e.key === 'Escape') {
            setOpen(false);
          } else if (e.key === 'Backspace' && search === '') {
            e.preventDefault();
            handleClear();
          }
        };

        return (
          <div className='flex flex-col gap-1 relative' ref={dropdownRef}>
            <label htmlFor={name} className='input-text-label'>{label}</label>

            <input type='hidden' id={name} {...field} />

            <div className='relative'>
              <input
                type='text'
                disabled={disabled}
                value={search}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setOpen(true)}
                placeholder={placeholder || 'Search Biome'}
                className='input-text pr-16'
              />

              <button
                type='button'
                onClick={() => setOpen(!open)}
                className='absolute inset-y-0 right-2 text-gray-400 hover:text-gray-200 flex items-center'
              >
                <ArrowDownWideNarrow />
              </button>

              {field.value && (
                <button
                  type='button'
                  onClick={handleClear}
                  className='absolute inset-y-0 right-9 text-gray-400 hover:text-gray-200 flex items-center cursor-pointer'
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
                            : field.value === opt.name
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
            {fieldState.error && (
              <p className='text-indigo-500 text-sm mt-1'>{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};
