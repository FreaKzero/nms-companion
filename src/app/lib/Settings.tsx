import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { OptionManagerType } from './OptionManager';

import { confirmModal } from '../components/ConfirmModal';
import { FormDirectoryPicker } from '../components/FormDirectoryPicker';
import { FormFilePicker } from '../components/FormFilePicker';
import { FormInput } from '../components/FormInput';
import { useAutoRefreshStore } from '../stores/useRefreshStore';

function SettingsPage () {
  const navigate = useNavigate();
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
      setValue('picSize', settings.picSize);
      setValue('cacheDir', settings.cacheDir);
      setValue('savestateDir', settings.savestateDir);
    };
    stopAutoRefresh();
    getSettings();
  }, []);

  const onSubmit: SubmitHandler<OptionManagerType> = async (data) => {
    await electron.ipcRenderer.invoke('SET_SETTINGS', data);
    if (await confirmModal({
      title: 'Warning',
      message: 'Applikation will be restarted',
      info: true
    })) {
      electron.ipcRenderer.invoke('APP_RESTART');
    }
  };

  const handleEmptyCache = async () => {
    const conf = await confirmModal({
      message: 'Clear Cache and temporary Flags ?'
    });

    if (conf) {
      electron.ipcRenderer.invoke('EMPTY_CACHE');
      electron.ipcRenderer.invoke('db.flightlog.truncate');
      localStorage.removeItem('hideCommunityProgress');
      localStorage.removeItem('reddit_lastRead');
      confirmModal({
        message: 'Cache Cleared',
        info: true
      });
    }
  };
  return (
    <div className='w-full'>
      <form action='#' method='POST' className='mx-auto p-10 w-xlsm:mt-20' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>

          <FormInput
            id='charName'
            label='NMS Character Name'
            register={register('charName', { required: 'Character Name is required' })}
          />

          <FormFilePicker
            label='NMS Save File'
            name='savePath'
            control={control}
            onlyPath
          />

          <FormInput
            label='Reddit Feed'
            id='redditFeed'
            register={register('redditFeed', { required: 'Reddit Feed is required' })}
          />

          <FormDirectoryPicker
            label='Select Cache Folder'
            name='cacheDir'
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

          <FormDirectoryPicker
            label='Select Thumbnails Folder'
            name='locationThumbDir'
            control={control}
          />

          <FormDirectoryPicker
            label='Select Savestate Folder'
            name='savestateDir'
            control={control}
          />

          <FormInput
            id='picSize'
            label='Picture Resize (px)'
            register={register('picSize', { required: 'Picture Resize is required' })}
          />

        </div>

        <div className='flex justify-between mt-10'>
          <div>
            <button type='button' className='buttonred' onClick={handleEmptyCache}>
              Clear Cache
            </button>
          </div>
          <div>
            <button type='button' className='button2' onClick={() => navigate('/')}>
              Cancel
            </button>

            <button
              type='submit'
              className='button ml-5'
            >
              Save Settings
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}

export default SettingsPage;
