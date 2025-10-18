import { ArrowDownWideNarrow, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';

export interface Option {
  label: string;
  value: string | number;
}

interface FormDropdownProps {
  label: string;
  name: string;
  control?: Control<any>;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  writeable?: boolean;
  required?: string;
  onChange?: (value: string | number) => void;
}

export const FormDropdown: React.FC<FormDropdownProps> = ({
  label,
  name,
  control,
  options,
  placeholder = 'Select...',
  disabled = false,
  writeable = false,
  required,
  onChange
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderDropdown = (
    value: string | number,
    setValue: (v: string | number) => void,
    error?: any
  ) => {
    const filtered = options.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()));

    const isCustomValue = writeable && value && !options.some((o) => o.value === value);
    const displayLabel = isCustomValue
      ? String(value)
      : options.find((o) => o.value === value)?.label ?? '';
    const inputValue = search || displayLabel;

    const handleInputChange = (val: string) => {
      setSearch(val);
      setOpen(true);
      if (writeable) {
        setValue(val);
        onChange?.(val);
      }
      setHighlightedIndex(0);
    };

    const handleSelect = (opt: Option | string) => {
      if (typeof opt === 'string') {
        setValue(opt);
        onChange?.(opt);
        setSearch(opt);
      } else {
        setValue(opt.value);
        onChange?.(opt.value);
        setSearch(opt.label);
      }
      setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[highlightedIndex]) handleSelect(filtered[highlightedIndex]);
        else if (writeable && search) handleSelect(search);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const handleClear = () => {
      setValue('');
      setSearch('');
      onChange?.('');
      setHighlightedIndex(0);
    };

    return (
      <div className='flex flex-col gap-1 relative' ref={dropdownRef}>
        <label htmlFor={name} className='input-text-label'>{label}</label>
        <div className='relative'>
          <input
            type='text'
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className='input-text pr-10'
            readOnly={!writeable && !open}
          />
          {inputValue && (
            <button
              type='button'
              onClick={handleClear}
              className='absolute inset-y-0 right-9 text-gray-400 hover:text-gray-200 flex items-center cursor-pointer'

            >
              <X size={18} />
            </button>
          )}
          <button
            type='button'
            onClick={() => setOpen(!open)}
            className='absolute inset-y-0 right-2 text-gray-400 hover:text-gray-200 flex items-center'
          >
            <ArrowDownWideNarrow />
          </button>
          {open && (
            <div className='absolute z-10 mt-1 w-full bg-gray-900/80 backdrop-blur-md border border-neutral-700 rounded-lg max-h-60 overflow-auto shadow-lg'>
              {filtered.length > 0
                ? filtered.map((opt, index) => (
                  <div
                    key={opt.value}
                    onClick={() => handleSelect(opt)}
                    className={`px-3 py-2 cursor-pointer hover:bg-indigo-600 ${
                        highlightedIndex === index ? 'bg-indigo-700 text-white' : ''
                      } ${value === opt.value ? 'font-semibold' : ''}`}
                  >
                    {opt.label}
                  </div>
                ))
                : writeable && search
                  ? (
                    <div
                      className='px-3 py-2 cursor-pointer hover:bg-indigo-600 text-white'
                      onClick={() => handleSelect(search)}
                    >
                      Add new: {search}
                    </div>
                    )
                  : (
                    <div className='px-3 py-2 text-sm text-gray-400'>No results found</div>
                    )}
            </div>
          )}
        </div>
        {error && <p className='text-indigo-500 text-sm mt-1'>{error.message}</p>}
      </div>
    );
  };

  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        rules={{
          validate: (v) => {
            if (required && (!v || !String(v).trim())) return required;
            return true;
          }
        }}
        render={({ field, fieldState }) => renderDropdown(field.value ?? '', field.onChange, fieldState?.error)}
      />
    );
  }

  const [internalValue, setInternalValue] = useState<string | number>('');
  return renderDropdown(internalValue, setInternalValue);
};
