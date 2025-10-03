import React from 'react';
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
}

export const FormGlyphInput: React.FC<GlyphInputControlProps> = ({
  name,
  control,
  label,
  portalCode = '',
  width = 'w-5',
  className = '',
  onClear
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={name} className='input-text-label'>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            className={`relative h-10 mb-5 block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 flex items-center ${className}`}
          >
            <Glyphs portalCode={field.value || portalCode} width={width} />

            {onClear && (field.value || portalCode) && (field.value || portalCode).length > 0 && (
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  field.onChange('');
                  onClear();
                }}
                className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200  cursor-pointer'
              >
                ×
              </button>
            )}
          </div>
        )}
      />
    </div>
  );
};
