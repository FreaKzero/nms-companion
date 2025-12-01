import { ListState } from '@/ipc/locationIPC';

import React, { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { confirmModal } from '../components/ConfirmModal';
import { FormBiomeInput } from '../components/FormBiomeInput';
import { FormDropdown } from '../components/FormDropdown';
import { FormGlyphInput } from '../components/FormGlyphInput';
import { FormHidden } from '../components/FormHidden';
import { FormScreenShotPaster, ScreenshotValue } from '../components/FormScreenShotPaster';
import { FormTextArea } from '../components/FormTextArea';
import GlyphInput from '../components/GlyphInput';
import { GalaxyNames } from '../mappings/GalaxyNames';
import useListStore from '../stores/useLocationStore';
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
  Biome: string;
};

interface ManualPageProps {
  editItem?: ListState;
}

function LocationForm ({ editItem }: ManualPageProps) {
  const navigate = useNavigate();
  const [search] = useSearchParams();

  const handleAddLocation = useListStore((s) => s.add);
  const handleUpdateLocation = useListStore((s) => s.update);

  const getTags = useMetaStore((s) => s.getTags);
  const optionTags = useMetaStore((s) => s.optionTags);

  const stopAutoRefresh = useAutoRefreshStore((s) => s.stop);

  const [glyphInput, setGlyphInput] = useState(false);
  const [screenshot, setScreenshot] = useState<ScreenshotValue>({
    preview: null,
    buffer: null
  });

  const qsGalaxy = search.get('galaxy');
  const qsPortal = search.get('portalcode');
  const qsDesc = search.get('description');

  const defaultGalaxyIndex =
    qsGalaxy ? Number(qsGalaxy) : editItem?.GalaxyIndex ?? 0;

  const defaultPortal = qsPortal ?? editItem?.PortalCode ?? '';
  const defaultShare = qsPortal ?? editItem?.ShareCode ?? '';
  const defaultDesc = qsDesc ?? editItem?.Description ?? '';

  const defaultValues: FormValues = {
    GalaxyIndex: defaultGalaxyIndex,
    GalaxyName: GalaxyNames[defaultGalaxyIndex] ?? '',
    PortalCode: defaultPortal,
    ShareCode: defaultShare,
    Description: defaultDesc,
    Screenshot: editItem?.Screenshot ?? '',
    Tag: editItem?.Tag ?? '',
    Biome: editItem?.Biome ?? ''
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ defaultValues });

  const glyphRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    stopAutoRefresh();
    getTags();

    const galaxyIdx =
      qsGalaxy ? Number(qsGalaxy) : editItem?.GalaxyIndex ?? 0;

    reset({
      GalaxyIndex: galaxyIdx,
      GalaxyName: GalaxyNames[galaxyIdx],
      PortalCode: qsPortal ?? editItem?.PortalCode ?? '',
      ShareCode: qsPortal ?? editItem?.ShareCode ?? '',
      Description: qsDesc ?? editItem?.Description ?? '',
      Screenshot: editItem?.Screenshot ?? '',
      Tag: editItem?.Tag ?? '',
      Biome: editItem?.Biome ?? ''
    });

    setScreenshot({ preview: editItem?.Screenshot, buffer: null });
  }, [
    qsGalaxy,
    qsPortal,
    editItem,
    reset
  ]);

  const handleSelectGlyph = (glyph: string) => {
    const input = glyphRef.current;
    if (!input) return;

    if (input.value.length < 12) {
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;
      const value = input.value;

      const newValue = value.slice(0, start) + glyph + value.slice(end);

      setValue('PortalCode', newValue);
      setValue('ShareCode', newValue);

      // Hacky way to fix the Cursorposition
      setTimeout(() => {
        input.selectionStart = input.selectionEnd = start + glyph.length;
        input.focus();
      }, 0);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    data.GalaxyName = GalaxyNames[data.GalaxyIndex];

    if (editItem?.id) {
      await handleUpdateLocation(editItem.id, data, screenshot?.buffer);
    } else {
      await handleAddLocation(data, screenshot?.buffer);
    }

    navigate('/locations');
  };

  const galaxyOptions = GalaxyNames.map((name, idx) => ({
    label: name,
    value: String(idx)
  }));

  function extractPortalCode (input: string) {
    const matches = input.match(/:portal([a-zA-Z0-9]):/g);
    if (!matches) return '';

    return matches
      .map((m) => m.match(/:portal([a-zA-Z0-9]):/)![1])
      .join('')
      .toUpperCase();
  }

  const handlePastePortalCode = async () => {
    try {
      let text = (await navigator.clipboard.readText()).trim();
      const isDiscordCode =
        /^(?::portal[a-zA-Z0-9]: ){11}:portal[a-zA-Z0-9]:$/;

      if (isDiscordCode.test(text)) {
        text = extractPortalCode(text);
      }

      const isValidHex = (/^[0-9A-Fa-f]{12}$/).test(text);
      if (isValidHex) {
        setValue('PortalCode', text);
        setValue('ShareCode', text);
      } else {
        await confirmModal({
          message:
            'Pasted Data is not a valid Portal Code (12 chars hexadecimal)',
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
        <FormHidden id='GalaxyIndex' register={register('GalaxyIndex')} />

        <h2 className='font-bold font-nms text-3xl mb-8'>
          {editItem ? 'Update Location' : 'Save Location'}
        </h2>

        <div className='grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2'>
          <div>
            <FormDropdown
              label='Galaxy'
              name='GalaxyIndex'
              control={control}
              options={galaxyOptions}
              placeholder='Search for a Galaxy'
              required='Galaxy is required'
            />
          </div>

          <div>
            <FormGlyphInput
              label='Portal Code'
              name='PortalCode'
              control={control}
              onClickPaste={handlePastePortalCode}
              onFocus={() => setGlyphInput(true)}
              onBlur={() => setGlyphInput(false)}
              ref={glyphRef}
            />
            <FormHidden
              id='PortalCode'
              register={register('PortalCode', {
                required: 'Portal code is required',
                validate: (value) => value?.length === 12 ||
                  'Portal code must be exactly 12 characters'
              })}
            />
            {errors.PortalCode && (
              <p className='text-indigo-500 text-sm'>
                {errors.PortalCode.message}
              </p>
            )}
          </div>

          <FormBiomeInput control={control} label='Biome' name='Biome' />

          <div>
            <FormDropdown
              label='Tag'
              name='Tag'
              control={control}
              options={optionTags}
              placeholder='Search or define Tag'
              required='Tag is required'
              writeable
            />
          </div>
        </div>

        <div className='flex gap-5 mt-5'>
          <FormScreenShotPaster
            label='Screenshot'
            screenshot={screenshot}
            onScreenshotChange={setScreenshot}
          />

          <div className='w-full'>
            <FormTextArea
              label='Description'
              id='Description'
              rows={4}
              register={register('Description', {
                required: 'Description is required'
              })}
            />
            {errors.Description && (
              <p className='text-indigo-500 text-sm mt-1'>
                {errors.Description.message}
              </p>
            )}
          </div>
        </div>

        <div className='mt-10 text-right'>
          <button
            type='button'
            className='button2'
            onClick={() => navigate('/locations')}
          >
            Cancel
          </button>

          <button type='submit' className='button ml-5'>
            {editItem ? 'Update Location' : 'Save Location'}
          </button>
        </div>

        <GlyphInput onClick={handleSelectGlyph} active={glyphInput} />
      </form>
    </div>
  );
}

export default LocationForm;
