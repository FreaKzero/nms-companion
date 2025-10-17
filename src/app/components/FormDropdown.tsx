import { ArrowDownWideNarrow } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Option {
  label: string;
  value: string | number;
}

interface FormDropdownProps {
  label: string;
  id: string;
  options: Option[];
  register?: UseFormRegisterReturn;
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const FormDropdown: React.FC<FormDropdownProps> = ({
  label,
  id,
  options,
  register,
  value: externalValue,
  onChange,
  placeholder,
  disabled = false
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [internalValue, setInternalValue] = useState<string | number | undefined>(externalValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalValue !== undefined) setInternalValue(externalValue);
  }, [externalValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = options.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (val: string | number) => {
    setInternalValue(val);
    onChange?.(val);
    if (register && register.onChange) {
      register.onChange({ target: { name: id, value: val } });
    }
    setOpen(false);
    setSearch('');
  };

  const displayLabel = options.find((o) => o.value === internalValue)?.label || '';

  return (
    <div className='flex flex-col gap-1 relative' ref={dropdownRef}>
      <label htmlFor={id} className='input-text-label'>
        {label}
      </label>

      <input
        type='hidden'
        id={id}
        value={internalValue ?? ''}
        {...(register || {})}
      />

      <div className='relative'>
        <input
          type='text'
          disabled={disabled}
          value={open ? search : displayLabel}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder || 'Select...'}
          className='input-text pr-8'
          readOnly={!open}
        />

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
              ? filtered.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`px-3 py-2 cursor-pointer hover:bg-indigo-600 ${
                      internalValue === opt.value ? 'bg-indigo-700 text-white' : ''
                    }`}
                >
                  {opt.label}
                </div>
              ))
              : (
                <div className='px-3 py-2 text-sm text-gray-400'>No results found</div>
                )}
          </div>
        )}
      </div>
    </div>
  );
};
