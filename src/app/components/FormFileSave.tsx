import React, { useState } from 'react';
import { Controller, Control } from 'react-hook-form';

interface FileSaveProps {
  label: string;
  name: string;
  control: Control<any>;
  disabled?: boolean;
  placeholder?: string;
  onPathSelect?: (path: string | null) => void;
}

export const FormFileSave: React.FC<FileSaveProps> = ({
  label,
  name,
  control,
  disabled = false,
  placeholder = 'Select save location...',
  onPathSelect
}) => {
  const [filePath, setFilePath] = useState('');

  const handleBrowse = async (onChange: (value: string) => void) => {
    if (disabled) return;
    const selectedPath: string | null = await electron.ipcRenderer.invoke('SAVE_FILE_DIALOG');
    if (selectedPath) {
      setFilePath(selectedPath);
      onChange(selectedPath);
      if (onPathSelect) onPathSelect(selectedPath);
    }
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
              value={field.value || filePath}
              placeholder={placeholder}
              readOnly
              disabled={disabled}
              className='flex-1 px-3 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none'
            />

            <button
              type='button'
              disabled={disabled}
              className='px-4 py-2 cursor-pointer bg-indigo-600 text-white hover:bg-indigo-500 transition-colors'
              onClick={() => handleBrowse(field.onChange)}
            >
              Save As
            </button>
          </div>
        </div>
      )}
    />
  );
};
