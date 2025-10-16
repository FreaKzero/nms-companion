import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Card from './Card';

interface TimerFormValues {
  label: string;
  duration: string;
}

interface TimerData {
  endTime: number;
  label: string;
  confirmed?: boolean;
}

interface TimerComponentProps {
  storageKey: string;
}

export const TimerMission: React.FC<TimerComponentProps> = ({ storageKey }) => {
  const { register, handleSubmit, reset, watch, setValue } = useForm<TimerFormValues>({
    defaultValues: { label: '', duration: '23:59:00' }
  });

  const stored = localStorage.getItem(storageKey);
  const timerData: TimerData | null = stored ? JSON.parse(stored) : null;
  const remaining = timerData ? Math.max(timerData.endTime - Date.now(), 0) : null;
  const isExpired = remaining !== null && remaining <= 0;

  const onSubmit: SubmitHandler<TimerFormValues> = (data) => {
    const [
      h = '0',
      m = '0',
      s = '0'
    ] = data.duration.split(':');
    const totalMs =
      parseInt(h) * 3600 * 1000 +
      parseInt(m) * 60 * 1000 +
      parseInt(s) * 1000;

    const endTime = Date.now() + totalMs;
    const timer: TimerData = { endTime, label: data.label, confirmed: false };
    localStorage.setItem(storageKey, JSON.stringify(timer));
    reset({ duration: '', label: '' });
  };

  const handleConfirmEnd = () => {
    localStorage.removeItem(storageKey);
    reset();
  };

  const handleCancel = () => {
    localStorage.removeItem(storageKey);
    reset();
  };

  const watchedLabel = watch('label');

  return (
    <Card title={timerData ? timerData.label : watchedLabel || 'Timer'}>
      {!timerData
        ? (
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
            <div className='flex gap-2'>
              <div className='flex-1'>
                <label className='input-text-label' htmlFor='label'>Timer Label</label>
                <input
                  id='label'
                  {...register('label', { required: true })}
                  className='input-text w-full'
                  placeholder='Label'
                />
              </div>

              <div className='w-32'>
                <label className='input-text-label' htmlFor='duration'>Duration</label>
                <input
                  id='duration'
                  {...register('duration', { required: true })}
                  className='input-text w-full'
                  placeholder='HH:MM:SS'
                  onChange={(e) => {
                    let input = e.target.value.replace(/[^\d:]/g, '');
                    input = input.replace(/(\d{2})(?=\d)/g, '$1:').slice(0, 8);
                    const parts = input.split(':');
                    if (parts.length >= 2 && parseInt(parts[1]) > 59) parts[1] = '59';
                    if (parts.length === 3 && parseInt(parts[2]) > 59) parts[2] = '59';
                    setValue('duration', parts.join(':'), { shouldValidate: true, shouldDirty: true });
                  }}
                />
              </div>
            </div>

            <button
              type='submit'
              className='button tiny'
            >
              Start Timer
            </button>
          </form>
          )
        : isExpired
          ? (
            <div className='flex flex-col items-center gap-2'>
              <h2 className='text-xl text-amber-600 font-bold'>TIMER DONE</h2>
              <button
                onClick={handleConfirmEnd}
                className='button tiny'
              >
                Done
              </button>
            </div>
            )
          : (
            <div className='flex flex-col items-center gap-2'>
              <div className='text-2xl font-mono mt-3'>
                {remaining !== null
                  ? `${Math.floor(remaining / 3600000)
                  .toString()
                  .padStart(2, '0')}:${Math.floor((remaining % 3600000) / 60000)
                  .toString()
                  .padStart(2, '0')}:${Math.floor((remaining % 60000) / 1000)
                  .toString()
                  .padStart(2, '0')}`
                  : '---'}
              </div>
              <button
                onClick={handleCancel}
                className='button2 tiny'
              >
                Reset
              </button>
            </div>
            )}
    </Card>
  );
};
