import { ListState } from '@/ipc/dbIPC';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormBiomeInput } from '../components/FormBiomeInput';
import { FormDropdown } from '../components/FormDropdown';
import { FormGlyphInput } from '../components/FormGlyphInput';
import { FormHidden } from '../components/FormHidden';
import { FormInput } from '../components/FormInput';
import { FormScreenShotPaster, ScreenshotValue } from '../components/FormScreenShotPaster';
import { FormTextArea } from '../components/FormTextArea';
import Loader from '../components/Loader';
import useListStore from '../stores/useListStore';
import useMetaStore from '../stores/useMetaStore';
import usePositionStore from '../stores/usePositionStore';
import { useAutoRefreshStore } from '../stores/useRefreshStore';

function CurrentPage () {
  const position = usePositionStore();
  const handleAddLocation = useListStore((state) => state.add);
  const getCurrentPosition = usePositionStore((s) => s.getCurrent);
  const loading = usePositionStore((s) => s.loading);
  const getTags = useMetaStore((s) => s.getTags);
  const optionTags = useMetaStore((s) => s.optionTags);
  const stopAutoRefresh = useAutoRefreshStore((s) => s.stop);
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ListState>();

  const [screenshot, setScreenshot] = React.useState<ScreenshotValue>({
    preview: null,
    buffer: null
  });

  const onSubmit: SubmitHandler<ListState> = async (data) => {
    handleAddLocation(data, screenshot.buffer);
    navigate('/list');
  };

  useEffect(() => {
    stopAutoRefresh();
    getCurrentPosition();
    getTags();
  }, [getCurrentPosition]);

  useEffect(() => {
    setValue('GalaxyName', position.GalaxyName);
    setValue('PortalCode', position.PortalCode);
    setValue('ShareCode', position.ShareCode);
    setValue('GalaxyIndex', position.GalaxyIndex);
    setValue('Description', position.Summary);
  }, [position, setValue]);

  return (
    <div className='w-full'>
      {loading && <Loader message='Loading current Position ...' />}
      <form
        action='#'
        method='POST'
        className='mx-auto p-10 w-xlsm:mt-20'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type='hidden' {...register('ShareCode')} />
        <input type='hidden' {...register('GalaxyIndex')} />

        <div className='grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2'>
          <FormInput
            label='Galaxy Name'
            id='GalaxyName'
            register={register('GalaxyName')}
            disabled
          />

          <FormGlyphInput label='Portal Code' name='PortalCode' control={control} disabled />
          <FormHidden
            id='PortalCode'
            register={register('PortalCode', {
              required: 'Portal code is required',
              validate: (value) => value?.length === 12 || 'Portal code must be exactly 12 characters'
            })}
          />

          <FormBiomeInput
            label='Biome'
            name='Biome'
            control={control}
          />

          <div>
            <FormDropdown
              label='Tag'
              name='Tag'
              control={control}
              options={optionTags}
              writeable
              required='Tag is required'
            />
          </div>
        </div>
        <div className='flex gap-5 mt-5'>
          <FormScreenShotPaster
            label='Screenshot'
            onScreenshotChange={setScreenshot}
          />
          <div className='w-full'>
            <FormTextArea
              label='Description'
              id='Description'
              rows={4}
              register={register('Description', { required: 'Description is required' })}
            />
            {errors.Description && (
              <p className='text-indigo-500 text-sm mt-1'>
                {errors.Description.message}
              </p>
            )}
          </div>
        </div>
        <button type='submit' className='button mt-5'>
          Save Location
        </button>
      </form>
    </div>
  );
}

export default CurrentPage;
