import { ClipboardIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Controller, Control } from 'react-hook-form';

interface GlyphInputControlProps {
  name: string;
  control: Control<any>;
  label: string;
  portalCode?: string;
  className?: string;
  onClickPaste?: () => void;
}

export const FormGlyphInput: React.FC<GlyphInputControlProps> = ({
  name,
  control,
  label,
  portalCode = '',
  className = '',
  onClickPaste
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={name} className='input-text-label'>
        {label}
      </label>

      <div className='flex items-center gap-2'>

        {onClickPaste && (
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onClickPaste();
            }}
            className='flex h-10 items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold uppercase text-white hover:bg-indigo-500 active:bg-indigo-700 transition-colors'
          >
            <ClipboardIcon />
          </button>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className='w-full'>
              <input
                type='text' value={field.value || portalCode} onChange={(e) => field.onChange(e)}
                className={`font-glyph h-10 relative flex w-full items-center rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500 ${className}`}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};
