import React, { useState } from 'react';
import { Controller, Control } from 'react-hook-form';

interface FilePickerProps {
  label: string;
  name: string;
  control: Control<any>;
  disabled?: boolean;
  placeholder?: string;
  onFileSelect?: (fileOrPath: File | string | null) => void;
  onlyPath?: boolean;
}

export const FormFilePicker: React.FC<FilePickerProps> = ({
  label,
  name,
  control,
  disabled = false,
  placeholder = 'Select a file...',
  onFileSelect,
  onlyPath = false
}) => {
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (
    file: File | null,
    onChange: (value: any) => void
  ) => {
    if (!file) {
      setFileName('');
      onChange(null);
      if (onFileSelect) onFileSelect(null);
      return;
    }
    const electronPath = electron.webUtils.getPathForFile(file);
    const valueToStore = onlyPath ? electronPath || '' : file;
    setFileName(file.name);
    onChange(valueToStore);

    if (onFileSelect) onFileSelect(valueToStore);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className='flex flex-col gap-1'>
          <label className='input-text-label'>{label}</label>

          <div className='flex items-center border rounded-md overflow-hidden'>

            <input
              type='text'
              value={field.value || fileName}
              placeholder={placeholder}
              readOnly
              disabled={disabled}
              className='flex-1 px-3 py-2 input-text'
            />

            <label
              className='px-4 py-2 cursor-pointer text-white transition bg-gradient-to-t from-indigo-900 to-indigo-700 text-center font-semibold text-white shadow-xs hover:bg-gradient-to-t hover:from-indigo-800 hover:to-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
            >
              Browse
              <input
                type='file'
                className='hidden'
                disabled={disabled}
                onChange={(e) => handleFileSelect(e.target.files?.[0] || null, field.onChange)}
              />
            </label>
          </div>
        </div>
      )}
    />
  );
};
