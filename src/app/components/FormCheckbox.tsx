import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormCheckboxProps {
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  id,
  register,
  checked,
  onChange,
  disabled = false,
  className,
  labelClassName
}) => {
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <label htmlFor={id} className='relative flex items-center cursor-pointer'>
        <input
          id={id}
          type='checkbox'
          disabled={disabled}
          {...(register || {})}
          checked={checked}
          onChange={onChange}
          className='absolute w-5 h-5 opacity-0 cursor-pointer peer'
        />
        <div
          className={`
            w-5 h-5 rounded-md 
            bg-white/5 border border-white/10 
            flex items-center justify-center
            peer-checked:bg-indigo-500 
            peer-checked:border-indigo-500 
            peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-indigo-500
            transition
          `}
        >
          {checked && (
            <svg className='w-3 h-3 text-white' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3'>
              <path d='M5 13l4 4L19 7' />
            </svg>
          )}
        </div>
        <span className={`ml-2 input-text-label select-none ${labelClassName}`}>{label}</span>
      </label>
    </div>
  );
};
