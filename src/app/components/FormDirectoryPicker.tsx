import React, { useState } from 'react';
import { Controller, Control } from 'react-hook-form';

interface DirectoryPickerProps {
  label: string;
  name: string;
  control: Control<any>;
  disabled?: boolean;
  placeholder?: string;
  onDirectorySelect?: (path: string | null) => void;
}

export const FormDirectoryPicker: React.FC<DirectoryPickerProps> = ({
  label,
  name,
  control,
  disabled = false,
  placeholder = 'Select a folder...',
  onDirectorySelect
}) => {
  const [folderPath, setFolderPath] = useState('');

  const handleBrowse = async (onChange: (value: string) => void) => {
    if (disabled) return;
    const selectedPath: string | null = await electron.ipcRenderer.invoke('FILEPICKER_DIALOG');
    if (selectedPath) {
      setFolderPath(selectedPath);
      onChange(selectedPath); // update RHF
      if (onDirectorySelect) onDirectorySelect(selectedPath);
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
              value={field.value || folderPath}
              placeholder={placeholder}
              readOnly
              disabled={disabled}
              className='flex-1 px-3 py-2 input-text'
            />

            <button
              type='button'
              disabled={disabled}
              className='px-4 py-2 cursor-pointer text-white transition bg-gradient-to-t from-indigo-900 to-indigo-700 text-center font-semibold text-white shadow-xs hover:bg-gradient-to-t hover:from-indigo-800 hover:to-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
              onClick={() => handleBrowse(field.onChange)}
            >
              Browse
            </button>
          </div>
        </div>
      )}
    />
  );
};
