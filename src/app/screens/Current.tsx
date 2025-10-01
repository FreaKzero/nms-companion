import React, { useState, useEffect, ClipboardEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Nullable } from '../stores/apiInterfaces';
import useListStore, { ListState } from '../stores/useListStore';
import usePositionStore from '../stores/usePositionStore';

interface iPreview {
  preview: Nullable<string>;
  buffer: Nullable<ArrayBuffer>;
}

function CurrentPage () {
  const position = usePositionStore();
  const [screen, setScreen] = useState<iPreview>({ preview: null, buffer: null });
  const handleAddLocation = useListStore((state) => state.add);
  const getCurrentPosition = usePositionStore((s) => s.getCurrent);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<ListState>();

  const onPicPaste = async (evt: ClipboardEvent<HTMLInputElement>) => {
    const data = evt.clipboardData.items[0];
    if (data.kind === 'file') {
      const img = data.getAsFile();
      if (img !== null) {
        const arrayBuffer = await img.arrayBuffer();
        setScreen({ buffer: arrayBuffer, preview: URL.createObjectURL(img) });
      }
    }
  };

  const onSubmit: SubmitHandler<ListState> = async (data) => {
    handleAddLocation(data, screen?.buffer);
    navigate('/list');
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    setValue('GalaxyName', position.GalaxyName);
    setValue('PortalCode', position.PortalCode);
    setValue('ShareCode', position.ShareCode);
    setValue('GalaxyIndex', position.GalaxyIndex);
    setValue('Description', position.Summary);
  }, [position, setValue]);

  return (
    <div className='h-screen w-full'>
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
            <input
              {...register('GalaxyName')}
              className='input-text' disabled
            />
          </div>
          <div>
            <label htmlFor='last-name' className='input-text-label'>
              Portal Code
            </label>
            <input
              className='input-text'
              {...register('PortalCode')}
              disabled
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
            className='button'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CurrentPage;
