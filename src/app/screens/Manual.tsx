import React, { useState, ClipboardEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import GlyphInput from '../components/GlyphInput';
import Glyphs from '../components/ui/Glyphs';
import { GalaxyNames } from '../mappings/GalaxyNames';
import useListStore from '../stores/useListStore';

type Nullable<T> = T | null;

type FormValues = {
  GalaxyIndex: number;
  GalaxyName: string;
  PortalCode: string;
  ShareCode: string;
  Description: string;
  Screenshot: string;
  Tag: string;
};

interface iPreview {
  preview: Nullable<string>;
  blob: Nullable<File>;
}

function ManualPage () {
  const [screen, setScreen] = useState<iPreview>({ preview: null, blob: null });
  const handleAddLocation = useListStore((state) => state.add);

  const { register, handleSubmit, setValue, getValues, watch } = useForm<FormValues>();

  const GlyphPortalCode = watch('PortalCode');

  const onPicPaste = (evt: ClipboardEvent<HTMLInputElement>) => {
    const data = evt.clipboardData.items[0];
    if (data.kind === 'file') {
      const img = data.getAsFile();
      if (img !== null) {
        setScreen({ blob: img, preview: URL.createObjectURL(img) });
      }
    }
  };

  const handleSelectGlyph = (glyph: string) => {
    const x = getValues();
    if (x.PortalCode.length < 12) {
      setValue('PortalCode', x.PortalCode + glyph);
      setValue('ShareCode', x.PortalCode);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    handleAddLocation(data);
  };

  return (
    <div className='h-screen w-full'>
      <GlyphInput onClick={handleSelectGlyph} />
      <form action='#' method='POST' className='mx-auto p-10 w-xlsm:mt-20' onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('ShareCode')}
          type='hidden'
        />

        <input
          {...register('GalaxyIndex')}
          type='hidden'
        />

        <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
          <div>
            <label htmlFor='galaxy-name' className='input-text-label'>
              Galaxy Name
            </label>

            <select
              {...register('GalaxyIndex')}
              className='input-text'
            >
              {GalaxyNames.map((a, i) => {
                return <option key={`galaxy-${i}`} className='bg-gray-600' value={i}>{a} ({i})</option>;
              })}
            </select>

          </div>
          <div>
            <label htmlFor='last-name' className='input-text-label'>
              Portal Code
            </label>

            <div
              className='h-10 mb-5 block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500'
            >
              <Glyphs portalCode={GlyphPortalCode} width='w-5' />
            </div>
            <input
              {...register('PortalCode')}
              className='input-text'
            />

          </div>
          <div>
            <label htmlFor='Screen' className='input-text-label'>
              Screenshot
            </label>

            <div className='w-44 h-28 border border-white rounded-md text-white p-2 text-center in-focus-visible:border-amber-400' onPaste={onPicPaste} tabIndex={-1}>
              {screen.preview === null && <span>Paste here</span>}
              {screen.preview !== null && <img src={screen.preview} />}
            </div>

          </div>

          <div>
            <label htmlFor='tag' className='input-text-label'>
              Tag
            </label>

            <input
              {...register('Tag')}
              className='input-text'
            />
          </div>

          <div className='sm:col-span-2'>
            <label htmlFor='message' className='input-text-label'>
              Description
            </label>

            <textarea
              {...register('Description')}
              id='Description'
              name='Description'
              rows={4}
              className='input-text' defaultValue=''
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
