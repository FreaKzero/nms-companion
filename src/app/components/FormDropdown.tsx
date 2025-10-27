import { ArrowDownWideNarrow, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';

export interface Option {
  label: string;
  value: string;
}

interface FormDropdownProps {
  label: string;
  name?: string;
  control?: Control<any>;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  writeable?: boolean;
  required?: string;
  value?: string;
  displayValue?: string;
  onChange?: (value: string) => void;
}

export const FormDropdown: React.FC<FormDropdownProps> = ({
  label,
  name,
  control,
  options,
  placeholder,
  disabled = false,
  writeable = false,
  required,
  value,
  displayValue,
  onChange
}) => {
  const isControlled = value !== undefined && onChange !== undefined;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const DropdownCore: React.FC<{
    value: string;
    onChange: (val: string) => void;
    error?: string;
  }> = ({ value, onChange, error }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(displayValue ?? value ?? '');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    useEffect(() => {
      const selectedOption = options.find((o) => o.value === value);
      setSearch(selectedOption ? selectedOption.label : value ?? '');
    }, [value, options]);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filtered = options.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()));

    const isCustomValue = writeable && value && !options.some((o) => o.value === value);
    const inputValue = search || (isCustomValue ? value : options.find((o) => o.value === value)?.label ?? '');

    const handleSelect = (val: Option | string) => {
      const newValue = typeof val === 'string' ? val : val.value;
      const newLabel = typeof val === 'string' ? val : val.label;
      setSearch(newLabel);
      setOpen(false);
      setHighlightedIndex(-1);
      onChange?.(newValue);
    };

    const handleInputChange = (val: string) => {
      setSearch(val);
      if (!open) setOpen(true);
      if (writeable) onChange?.(val);
      setHighlightedIndex(0);
    };

    const handleClear = () => {
      onChange?.('');
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
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[highlightedIndex]) handleSelect(filtered[highlightedIndex]);
        else if (writeable && search) handleSelect(search);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    return (
      <div className='flex flex-col gap-1 relative' ref={dropdownRef}>
        <label className='input-text-label'>{label}</label>
        <div className='relative'>
          <input
            type='text'
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || 'Select...'}
            disabled={disabled}
            className='input-text pr-16'
            readOnly={!writeable && !open}
          />

          <button
            type='button'
            onClick={() => setOpen(!open)}
            className='absolute inset-y-0 right-2 text-gray-400 hover:text-gray-200 flex items-center'
          >
            <ArrowDownWideNarrow />
          </button>

          {inputValue && (
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
                ? filtered.map((opt, i) => (
                  <div
                    key={opt.value}
                    onClick={() => handleSelect(opt)}
                    className={`px-3 py-2 cursor-pointer ${
                      highlightedIndex === i ? 'bg-indigo-600 text-white' : ''
                    } ${value === opt.value ? 'font-semibold' : ''} hover:bg-indigo-600`}
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
        {error && <p className='text-indigo-500 text-sm mt-1'>{error}</p>}
      </div>
    );
  };

  if (isControlled) return <DropdownCore value={value!} onChange={onChange!} />;

  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        rules={{
          validate: (v) => {
            if (required && (v === undefined || v === null || v === '')) return required;
            return true;
          }
        }}
        render={({ field, fieldState }) => (
          <DropdownCore
            value={field.value ?? ''}
            // eslint-disable-next-line react/jsx-handler-names
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
    );
  }

  return <DropdownCore value={value ?? ''} onChange={() => {}} />;
};
