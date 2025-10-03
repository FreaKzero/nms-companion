import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface FormSelectOption {
  label: string;
  value: string | number;
}

interface FormSelectProps {
  label: string;
  id: string;
  options: (string | FormSelectOption)[];
  register: UseFormRegisterReturn;
  disabled?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  id,
  options,
  register,
  disabled = false
}) => {
  const normalize = (opt: string | FormSelectOption, i: number): FormSelectOption => (typeof opt === 'string'
    ? { label: `${opt} (${i})`, value: i }
    : opt);

  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id} className='input-text-label'>
        {label}
      </label>
      <select id={id} disabled={disabled} {...register} className='input-text'>
        {options.map((opt, i) => {
          const o = normalize(opt, i);
          return (
            <option key={`${id}-opt-${i}`} value={o.value} className='bg-gray-600'>
              {o.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
