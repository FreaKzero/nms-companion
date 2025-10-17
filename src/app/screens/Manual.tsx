import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { confirmModal } from '../components/ConfirmModal';
import { FormDropdown } from '../components/FormDropdown';
import { FormGlyphInput } from '../components/FormGlyphInput';
import { FormHidden } from '../components/FormHidden';
import { FormScreenShotPaster, ScreenshotValue } from '../components/FormScreenShotPaster';
import { FormTextArea } from '../components/FormTextArea';
import GlyphInput from '../components/GlyphInput';
import { GalaxyNames } from '../mappings/GalaxyNames';
import useListStore from '../stores/useListStore';
import useMetaStore from '../stores/useMetaStore';
import { useAutoRefreshStore } from '../stores/useRefreshStore';

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

  const getTags = useMetaStore((s) => s.getTags);
  const optionTags = useMetaStore((s) => s.optionTags);
  const stopAutoRefresh = useAutoRefreshStore((s) => s.stop);
  const [glyphInput, setGlyphInput] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm<FormValues>();

  useEffect(() => {
    stopAutoRefresh();
    getTags();
  }, []);

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

  const galaxyOptions = GalaxyNames.map((i, idx) => ({ label: i, value: idx }));

  function extractPortalCode (input: string) {
    const matches = input.match(/:portal([a-zA-Z0-9]):/g);
    if (!matches) return '';

    return matches
      .map((m) => m.match(/:portal([a-zA-Z0-9]):/)[1])
      .join('')
      .toUpperCase();
  }

  const handlePastePortalCode = async () => {
    try {
      let text = (await navigator.clipboard.readText()).trim();
      const isDiscordCode = /^(?::portal[a-zA-Z0-9]: ){11}:portal[a-zA-Z0-9]:$/;

      if (isDiscordCode.test(text)) {
        text = extractPortalCode(text);
      }

      const isValidHex = (/^[0-9A-Fa-f]{12}$/).test(text);

      if (isValidHex) {
        setValue('PortalCode', text);
      } else {
        await confirmModal({
          message: 'Pasted Data is not an valid Portal Code (12 Chars Hexadecimal)',
          title: 'Portal Code invalid',
          info: true
        });
      }
    } catch (err) {
      console.error('Clipboard read failed:', err);
    }
  };

  return (
    <div className='w-full'>
      <form
        action='#'
        method='POST'
        className='mx-auto p-10 w-xlsm:mt-20'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormHidden id='ShareCode' register={register('ShareCode')} />
        <FormHidden id='GalaxyIndex' register={register('GalaxyIndex', { required: 'Galaxy index is required' })} />

        <div className='grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2'>
          <div>

            <FormDropdown
              label='Galaxy'
              id='GalaxyIndex'
              register={register('GalaxyIndex', { required: 'Galaxy is required' })}
              options={galaxyOptions}
            />

            {errors.GalaxyIndex && (
              <p className='text-indigo-500 text-sm mt-1'>{errors.GalaxyIndex.message}</p>
            )}
          </div>

          <div>
            <FormGlyphInput
              label='Portal Code'
              name='PortalCode'
              control={control}
              onClickPaste={() => handlePastePortalCode()}
              onFocus={() => setGlyphInput(true)}
              onBlur={() => setGlyphInput(false)}

            />
            <FormHidden
              id='PortalCode'
              register={register('PortalCode', {
                required: 'Portal code is required',
                validate: (value) => value?.length === 12 || 'Portal code must be exactly 12 characters'
              })}
            />
            {errors.PortalCode && (
              <p className='text-indigo-500 text-sm'>{errors.PortalCode.message}</p>
            )}
          </div>
          <div>
            <FormDropdown
              label='Tag'
              id='Tag'
              options={optionTags}
              register={register('Tag', { required: 'Tag is required' })}
              writeable
            />
            {errors.Tag && (
              <p className='text-indigo-500 text-sm mt-1'>{errors.Tag.message}</p>
            )}
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

        <button
          type='submit' className='button mt-5'
        >
          Save Location
        </button>

        <GlyphInput onClick={handleSelectGlyph} active={glyphInput} />
      </form>
    </div>
  );
}

export default ManualPage;
