import { ClipboardIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Controller, Control } from 'react-hook-form';

import Glyphs from './Glyphs';

interface GlyphInputControlProps {
  name: string;
  control: Control<any>;
  label: string;
  portalCode?: string;
  width?: string;
  className?: string;
  onClear?: () => void;
  onClickPaste?: () => void; // neuer Prop
}

export const FormGlyphInput: React.FC<GlyphInputControlProps> = ({
  name,
  control,
  label,
  portalCode = '',
  width = 'w-5',
  className = '',
  onClear,
  onClickPaste
}) => {
  const [inputMode, setInputMode] = useState(false);

  const handleChangeInput = () => setInputMode(!inputMode);

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
            <div
              className={`h-10 relative flex w-full items-center rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500 ${className}`}
              onClick={handleChangeInput}
            >
              <Glyphs portalCode={field.value || portalCode} width={width} />

              {onClear && (field.value || portalCode)?.length > 0 && (
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    field.onChange('');
                    onClear();
                  }}
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer'
                >
                  ×
                </button>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};
