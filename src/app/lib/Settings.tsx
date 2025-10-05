import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { OptionManagerType } from './OptionManager';

import { confirmModal } from '../components/ConfirmModal';
import { FormDirectoryPicker } from '../components/FormDirectoryPicker';
import { FormFilePicker } from '../components/FormFilePicker';

function SettingsPage () {
  const { handleSubmit, setValue, control } = useForm<OptionManagerType>();

  useEffect(() => {
    const getSettings = async () => {
      const settings = await electron.ipcRenderer.invoke('GET_SETTINGS');
      setValue('savePath', settings.savePath, { shouldValidate: true, shouldDirty: true });
      setValue('locationThumbDir', settings.locationThumbDir, { shouldValidate: true, shouldDirty: true });
      setValue('databasePath', settings.databasePath, { shouldValidate: true, shouldDirty: true });
    };

    getSettings();
  }, []);

  const onSubmit: SubmitHandler<OptionManagerType> = async (data) => {
    await electron.ipcRenderer.invoke('SAVE_SETTINGS', data);
    if (await confirmModal('Applikation should be restarted, restart ?')) {
      electron.ipcRenderer.invoke('APP_RESTART');
    }
  };

  return (
    <div className='w-full'>
      <form action='#' method='POST' className='mx-auto p-10 w-xlsm:mt-20' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
          <FormFilePicker
            label='NMS Save File'
            name='savePath'
            control={control}
            onlyPath
          />

          <FormDirectoryPicker
            label='Select Thumbnails Folder'
            name='locationThumbDir'
            control={control}
          />

          <FormFilePicker
            label='Database Path'
            name='databasePath'
            control={control}
            onlyPath
          />
          <div />
          <button
            type='submit'
            className='button'
          >
            Save
          </button>
        </div>

      </form>
    </div>
  );
}

export default SettingsPage;
