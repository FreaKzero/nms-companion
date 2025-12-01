import timerback from 'assets/timerback.png';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { openCustomModal } from './CustomModal';

import { useTimersStore } from '../stores/useTimerStore';

interface TimerFormValues {
  label: string;
  duration: string;
}

let isInitialized = false;
let isOpen = false;

export const TimerForm = () => {
  const { addTimer } = useTimersStore();
  const { register, handleSubmit, setValue, reset, setFocus } = useForm<TimerFormValues>({
    defaultValues: { label: '', duration: '00:23:59' }
  });

  useEffect(() => {
    setFocus('label');
  }, [setFocus]);

  const onSubmit = (data: TimerFormValues) => {
    console.log(data);
    const [
      h = '0',
      m = '0',
      s = '0'
    ] = data.duration.split(':');

    const totalMs =
      parseInt(h) * 3600 * 1000 +
      parseInt(m) * 60 * 1000 +
      parseInt(s) * 1000;

    addTimer({
      id: Date.now().toString(),
      label: data.label,
      endTime: Date.now() + totalMs
    });

    reset();
    setFocus('label');
  };

  const onDurationChange = (e: any) => {
    let input = e.target.value.replace(/[^\d:]/g, '');
    input = input.replace(/(\d{2})(?=\d)/g, '$1:').slice(0, 8);

    const p = input.split(':');
    if (p[1] > '59') p[1] = '59';
    if (p[2] > '59') p[2] = '59';

    setValue('duration', p.join(':'));
  };

  return (
    <div
      style={{ backgroundImage: `url(${timerback})` }}
      className='h-full bg-cover p-5 rounded-xl'
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
        <div className='flex gap-2'>
          <div className='flex-1'>
            <label className='input-text-label'>Label</label>
            <input
              {...register('label', { required: true })}
              className='input-text w-full'
            />
          </div>

          <div className='w-32'>
            <label className='input-text-label'>Duration</label>
            <input
              {...register('duration')}
              className='input-text w-full'
              placeholder='HH:MM:SS'
              onChange={onDurationChange}
            />
          </div>
        </div>

        <button type='submit' className='button tiny'>
          Start Timer
        </button>
      </form>
    </div>
  );
};

const TimerModal: React.FC = () => {
  return (
    <TimerForm />
  );
};

export function registerTimerModal () {
  if (isInitialized) return;
  isInitialized = true;

  electron.ipcRenderer.on('MENU_TIMER', () => {
    if (!isOpen) {
      openCustomModal(<TimerModal />, '', () => { isOpen = false; });
      isOpen = true;
    }
  });
}
