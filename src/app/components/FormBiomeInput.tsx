'use client';

import { ArrowDownWideNarrow, X } from 'lucide-react';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Controller, Control } from 'react-hook-form';

import BIOME_DATA from '../mappings/biomes.json';

interface BiomeOption {
  name: string;
  alt: string;
}

interface FormBiomeInputProps {
  label: string;
  name?: string;
  control?: Control<any>;
  placeholder?: string;
  disabled?: boolean;
  required?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const FormBiomeInput: React.FC<FormBiomeInputProps> = ({
  label,
  name,
  control,
  placeholder = 'Search Biome',
  disabled = false,
  required,
  value: controlledValue,
  onChange: controlledOnChange
}) => {
  const isControlled = controlledValue !== undefined && controlledOnChange !== undefined;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const BiomeInputCore: React.FC<{
    value: string;
    onChange: (val: string) => void;
    error?: string;
  }> = ({ value, onChange, error }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(value);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    useEffect(() => {
      setSearch(value);
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setOpen(false);
          setHighlightedIndex(-1);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const allOptions: BiomeOption[] = useMemo(() => {
      return BIOME_DATA.flatMap((b) => b.altname.map((alt) => ({ name: b.name, alt })));
    }, []);

    const filteredOptions = useMemo(() => {
      if (!search) return allOptions;
      const lower = search.toLowerCase();
      return allOptions.filter((opt) => opt.alt.toLowerCase().includes(lower));
    }, [search, allOptions]);

    const handleSelect = useCallback((name: string, alt: string) => {
      onChange(name);
      setSearch(alt);
      setOpen(false);
      setHighlightedIndex(-1);
    }, [onChange]);

    const handleInputChange = useCallback((val: string) => {
      setSearch(val);
      setOpen(true);
      setHighlightedIndex(0);
    }, []);

    const handleClear = useCallback(() => {
      onChange('');
      setSearch('');
      setHighlightedIndex(-1);
    }, [onChange]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        setOpen(true);
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            e.preventDefault();
            const opt = filteredOptions[highlightedIndex];
            handleSelect(opt.name, opt.alt);
          }
          break;
        case 'Escape':
          setOpen(false);
          setHighlightedIndex(-1);
          break;
        case 'Backspace':
          if (search === '') {
            e.preventDefault();
            handleClear();
          }
          break;
      }
    }, [
      open,
      highlightedIndex,
      filteredOptions,
      handleSelect,
      handleClear,
      search
    ]);

    return (
      <div className='flex flex-col gap-1 relative' ref={dropdownRef}>
        <label className='input-text-label'>{label}</label>

        <div className='relative'>
          <input
            type='text'
            disabled={disabled}
            value={search}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className='input-text pr-16'
          />

          <button
            type='button'
            onClick={() => {
              if (search) handleClear();
              else setOpen((o) => !o);
            }}
            className='absolute inset-y-0 right-2 text-gray-400 hover:text-gray-200 flex items-center cursor-pointer'
          >
            <ArrowDownWideNarrow />
          </button>

          {value && (
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
              {filteredOptions.length > 0
                ? (
                    filteredOptions.map((opt, i) => (
                      <div
                        key={`${opt.name}-${opt.alt}`}
                        onClick={() => handleSelect(opt.name, opt.alt)}
                        className={`px-3 py-2 cursor-pointer transition-colors ${
                      highlightedIndex === i
                        ? 'bg-indigo-600 text-white'
                        : value === opt.name
                        ? 'bg-indigo-700 text-white'
                        : 'hover:bg-indigo-600'
                    }`}
                      >
                        <span className='block text-white font-medium'>{opt.name}</span>
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

        {error && <p className='text-indigo-500 text-sm mt-1'>{error}</p>}
      </div>
    );
  };

  if (isControlled) {
    return <BiomeInputCore value={controlledValue!} onChange={controlledOnChange!} />;
  }

  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        rules={required ? { required } : undefined}
        render={({ field, fieldState }) => (
          <BiomeInputCore
            value={field.value || ''}
            // eslint-disable-next-line react/jsx-handler-names
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
    );
  }

  return <BiomeInputCore value='' onChange={() => {}} />;
};
