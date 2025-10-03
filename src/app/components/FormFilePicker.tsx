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
              className='flex-1 px-3 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none'
            />

            <label
              className='px-4 py-2 cursor-pointer bg-indigo-600 text-white hover:bg-indigo-500 transition-colors'
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
