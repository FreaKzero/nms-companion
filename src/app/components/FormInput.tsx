import { X } from 'lucide-react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  register?: UseFormRegisterReturn;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type = 'text',
  register,
  value,
  onChange,
  disabled = false,
  placeholder,
  onClear,
  className
}) => {
  return (
    <div className={`flex flex-col gap-1 relative ${className}`}>
      <label htmlFor={id} className='input-text-label'>
        {label}
      </label>
      <div className='relative w-full'>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...(register || {})}
          value={value}
          onChange={onChange}
          className='input-text pr-8'
        />
        {onClear && value && value.length > 0 && (
          <button
            type='button'
            onClick={onClear}
            className='absolute inset-y-0 right-3 text-gray-400 hover:text-gray-200 flex items-center cursor-pointer'
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};
