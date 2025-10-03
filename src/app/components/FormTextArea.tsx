import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormTextAreaProps {
  label: string;
  id: string;
  rows?: number;
  register: UseFormRegisterReturn;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  id,
  rows = 4,
  register
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id} className='input-text-label'>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        {...register}
        className='input-text'
      />
    </div>
  );
};
