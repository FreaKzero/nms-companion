import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { OptionManagerType } from './OptionManager';

import { confirmModal } from '../components/ConfirmModal';
import { FormDirectoryPicker } from '../components/FormDirectoryPicker';
import { FormFilePicker } from '../components/FormFilePicker';
import { FormInput } from '../components/FormInput';
import { useAutoRefreshStore } from '../stores/useRefreshStore';

function SettingsPage () {
  const { handleSubmit, setValue, control, register } = useForm<OptionManagerType>();
  const stopAutoRefresh = useAutoRefreshStore((s) => s.stop);

  useEffect(() => {
    const getSettings = async () => {
      const settings = await electron.ipcRenderer.invoke('GET_SETTINGS');
      setValue('fishtrackerFile', settings.fishtrackerFile, { shouldValidate: true, shouldDirty: true });
      setValue('savePath', settings.savePath, { shouldValidate: true, shouldDirty: true });
      setValue('locationThumbDir', settings.locationThumbDir, { shouldValidate: true, shouldDirty: true });
      setValue('databasePath', settings.databasePath, { shouldValidate: true, shouldDirty: true });
      setValue('charName', settings.charName);
      setValue('redditFeed', settings.redditFeed);
    };
    stopAutoRefresh();
    getSettings();
  }, []);

  const onSubmit: SubmitHandler<OptionManagerType> = async (data) => {
    await electron.ipcRenderer.invoke('SET_SETTINGS', data);
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

          <FormInput
            id='charName'
            label='NMS Character Name'
            register={register('charName', { required: 'Character Name is required' })}
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

          <FormFilePicker
            label='Fishtracker File'
            name='fishtrackerFile'
            control={control}
            onlyPath
          />

          <FormInput
            label='Reddit Feed'
            id='redditFeed'
            register={register('redditFeed', { required: 'Reddit Feed is required' })}
          />

        </div>
        <button
          type='submit'
          className='button mt-5'
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default SettingsPage;
