import { ClipboardIcon } from 'lucide-react';
import React, { forwardRef } from 'react';
import { Controller, Control } from 'react-hook-form';

import IconButton from './IconButton';

interface GlyphInputControlProps {
  name: string;
  control: Control<any>;
  label: string;
  portalCode?: string;
  className?: string;
  onClickPaste?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
}

export const FormGlyphInput = forwardRef<HTMLInputElement, GlyphInputControlProps>((
  {
    name,
    control,
    label,
    portalCode = '',
    className = '',
    onClickPaste,
    onFocus,
    onBlur,
    disabled = false
  },
  ref
) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: string) => void; value?: string }
  ) => {
    const value = e.target.value.toUpperCase().slice(0, 12);
    const isValid = value === '' || (/^[0-9A-F]+$/).test(value);
    if (isValid) {
      field.onChange(value);
    }
  };

  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={name} className='input-text-label'>
        {label}
      </label>

      <div className='flex items-center gap-2'>
        {onClickPaste && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onClickPaste();
            }}
            label='Paste Portalcode'
            Icon={ClipboardIcon}
          />
        )}

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              id={name}
              type='text'
              disabled={disabled}
              value={field.value || portalCode}
              onChange={(e) => handleChange(e, field)}
              onFocus={onFocus}
              onBlur={onBlur}
              ref={ref}
              className={`font-glyph h-10 w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500 ${className}`}
            />
          )}
        />
      </div>
    </div>
  );
});
