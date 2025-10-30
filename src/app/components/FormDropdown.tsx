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
    useEffect(() => {
      const foundOption = options.find((opt) => opt.value === String(value));
      setSearch(foundOption ? foundOption.label : (value ? String(value) : ''));
    }, [value, options]);

    const filteredOptions = options.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()));

    const isCustomValue = writeable && value && !options.some((opt) => opt.value === value);
    const inputValue = search || (isCustomValue ? String(value) : '');

    const handleInputChange = (newSearch: string) => {
      setSearch(newSearch);
      setOpen(true);
      setHighlightedIndex(0);
      if (writeable) {
        setValue(newSearch);
        onChange?.(newSearch);
      }
    };

    const handleSelect = (selectedValue: string | number, selectedLabel: string) => {
      setValue(selectedValue);
      onChange?.(selectedValue);
      setSearch(selectedLabel);
      setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const highlightedOption = filteredOptions[highlightedIndex];
        if (highlightedOption) {
          handleSelect(highlightedOption.value, highlightedOption.label);
        } else if (writeable && search) {
          handleSelect(search, search);
        }
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const handleClear = () => {
      setValue('');
      setSearch('');
      onChange?.('');
      setHighlightedIndex(0);
      setOpen(false);
    };

    return (
      <div className='flex flex-col gap-1 relative' ref={dropdownRef} role='presentation'>
        <label htmlFor={name} className='input-text-label'>{label}</label>
        <div className='relative'>
          <input
            id={name}
            type='text'
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => !disabled && setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className='input-text pr-10'
            readOnly={!writeable && !open}
            role='combobox'
            aria-expanded={open}
            aria-controls={`${name}-list`}
          />
          {inputValue && (
            <button
              type='button'
              onClick={handleClear}
              className='absolute inset-y-0 right-9 text-gray-400 hover:text-gray-200 flex items-center cursor-pointer'
              aria-label='Clear selection'
            >
              <X size={18} />
            </button>
          )}
          <button
            type='button'
            onClick={() => {
              handleClear();
              setOpen((prev) => !prev);
            }}
            className='absolute inset-y-0 right-2 text-gray-400 hover:text-gray-200 flex items-center cursor-pointer'
            disabled={disabled}
            aria-label='Toggle dropdown'
          >
            <ArrowDownWideNarrow />
          </button>
          {open && (
            <div
              id={`${name}-list`}
              className='absolute z-10 mt-1 w-full bg-gray-900/80 backdrop-blur-md border border-neutral-700 rounded-lg max-h-60 overflow-auto shadow-lg'
              role='listbox'
            >
              {filteredOptions.length > 0
                ? (
                    filteredOptions.map((opt, index) => (
                      <div
                        key={opt.value}
                        onClick={() => handleSelect(opt.value, opt.label)}
                        className={`px-3 py-2 cursor-pointer hover:bg-indigo-600 ${
                      highlightedIndex === index ? 'bg-indigo-700 text-white' : ''
                    } ${value === opt.value ? 'font-semibold' : ''}`}
                        role='option'
                        aria-selected={value === opt.value}
                      >
                        {opt.label}
                      </div>
                    ))
                  )
                : writeable && search
                  ? (
                    <div
                      className='px-3 py-2 cursor-pointer hover:bg-indigo-600 text-white'
                      onClick={() => handleSelect(search, search)}
                      role='option'
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
            if (required && (v == null || v === '')) return required;
            return true;
          }
        }}
        render={({ field, fieldState }) => renderDropdown(field.value ?? '', field.onChange, fieldState.error)}
      />
    );
  }

  const [internalValue, setInternalValue] = useState<string | number>('');
  return renderDropdown(internalValue, setInternalValue);
};
