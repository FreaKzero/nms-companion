import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  register: UseFormRegisterReturn;
  disabled?: boolean;
  placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type = 'text',
  register,
  disabled = false,
  placeholder
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id} className='input-text-label'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register}
        className='input-text'
      />
    </div>
  );
};
