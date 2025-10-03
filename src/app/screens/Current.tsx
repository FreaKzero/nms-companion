import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormInput } from '../components/FormInput';
import { FormScreenShotPaster, ScreenshotValue } from '../components/FormScreenShotPaster';
import { FormTextArea } from '../components/FormTextArea';
import useListStore, { ListState } from '../stores/useListStore';
import usePositionStore from '../stores/usePositionStore';

function CurrentPage () {
  const position = usePositionStore();
  const handleAddLocation = useListStore((state) => state.add);
  const getCurrentPosition = usePositionStore((s) => s.getCurrent);
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<ListState>();
  const [screenshot, setScreenshot] = React.useState<ScreenshotValue>({
    preview: null,
    buffer: null
  });

  const onSubmit: SubmitHandler<ListState> = async (data) => {
    handleAddLocation(data, screenshot.buffer);
    navigate('/list');
  };

  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  useEffect(() => {
    setValue('GalaxyName', position.GalaxyName);
    setValue('PortalCode', position.PortalCode);
    setValue('ShareCode', position.ShareCode);
    setValue('GalaxyIndex', position.GalaxyIndex);
    setValue('Description', position.Summary);
  }, [position, setValue]);

  return (
    <div className='h-screen w-full'>
      <form
        action='#'
        method='POST'
        className='mx-auto p-10 w-xlsm:mt-20'
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Hidden Inputs */}
        <input type='hidden' {...register('ShareCode')} />
        <input type='hidden' {...register('GalaxyIndex')} />

        <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
          <FormInput
            label='Galaxy Name'
            id='GalaxyName'
            register={register('GalaxyName')}
            disabled
          />

          <FormInput
            label='Portal Code'
            id='PortalCode'
            register={register('PortalCode')}
            disabled
          />

          <FormScreenShotPaster
            label='Screenshot'
            onScreenshotChange={setScreenshot}
          />

          <FormInput
            label='Tag'
            id='Tag'
            register={register('Tag')}
          />

          <div className='sm:col-span-2'>
            <FormTextArea
              label='Description'
              id='Description'
              rows={4}
              register={register('Description')}
            />
          </div>

          <button type='submit' className='button'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CurrentPage;
