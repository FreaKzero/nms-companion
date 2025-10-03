import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormHiddenProps {
  id: string;
  register: UseFormRegisterReturn;
}

export const FormHidden: React.FC<FormHiddenProps> = ({ id, register }) => {
  return <input type='hidden' id={id} {...register} />;
};
