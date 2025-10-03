import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormGlyphInput } from '../components/FormGlyphInput';
import { FormHidden } from '../components/FormHidden';
import { FormInput } from '../components/FormInput';
import { FormScreenShotPaster, ScreenshotValue } from '../components/FormScreenShotPaster';
import { FormSelect } from '../components/FormSelect';
import { FormTextArea } from '../components/FormTextArea';
import GlyphInput from '../components/GlyphInput';
import Glyphs from '../components/Glyphs';
import { GalaxyNames } from '../mappings/GalaxyNames';
import useListStore from '../stores/useListStore';

type FormValues = {
  GalaxyIndex: number;
  GalaxyName: string;
  PortalCode: string;
  ShareCode: string;
  Description: string;
  Screenshot: string;
  Tag: string;
};

function ManualPage () {
  const [screenshot, setScreenshot] = useState<ScreenshotValue>({
    preview: null,
    buffer: null
  });

  const handleAddLocation = useListStore((state) => state.add);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues, watch, control } = useForm<FormValues>();

  const GlyphPortalCode = watch('PortalCode');

  const handleSelectGlyph = (glyph: string) => {
    const x = getValues();
    if (x.PortalCode.length < 12) {
      setValue('PortalCode', x.PortalCode + glyph);
      setValue('ShareCode', x.PortalCode);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    data.GalaxyName = GalaxyNames[data.GalaxyIndex];
    handleAddLocation(data, screenshot?.buffer);
    navigate('/list');
  };

  return (
    <div className='h-screen w-full'>
      <GlyphInput onClick={handleSelectGlyph} />

      <form
        action='#'
        method='POST'
        className='mx-auto p-10 w-xlsm:mt-20'
        onSubmit={handleSubmit(onSubmit)}
      >

        <FormHidden id='ShareCode' register={register('ShareCode')} />
        <FormHidden id='GalaxyIndex' register={register('GalaxyIndex')} />

        <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
          <FormSelect
            label='Galaxy Name'
            id='GalaxyName'
            options={GalaxyNames}
            register={register('GalaxyIndex')}
          />

          <FormGlyphInput
            label='Portal Code'
            name='PortalCode'
            control={control}
            onClear={() => console.log('Cleared!')}
          />

          <FormHidden id='PortalCode' register={register('PortalCode')} />

          <FormScreenShotPaster
            label='Screenshot'
            onScreenshotChange={setScreenshot}
          />

          <FormInput label='Tag' id='Tag' register={register('Tag')} />

          <div className='sm:col-span-2'>
            <FormTextArea
              label='Description'
              id='Description'
              rows={4}
              register={register('Description')}
            />
          </div>

          <button
            type='submit'
            className='w-20 rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManualPage;
