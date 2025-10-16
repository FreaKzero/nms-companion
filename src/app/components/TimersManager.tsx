import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Card from './Card';

import getRelativeTime from '../lib/getRelativeTime';

interface TimerEntry {
  id: number;
  label: string;
  endTime: number;
}

interface TimerFormValues {
  label: string;
  duration: string;
}

const STORAGE_KEY = 'multiTimers';

export default function TimersManager () {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<TimerFormValues>({
    defaultValues: { label: '', duration: '' }
  });

  const [timers, setTimers] = useState<TimerEntry[]>([]);

  // Load timers from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setTimers(JSON.parse(stored));
  }, []);

  // Save timers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timers));
  }, [timers]);

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

    if (totalMs <= 0) return; // invalid duration

    const endTime = Date.now() + totalMs;

    const newTimer: TimerEntry = {
      id: timers.length ? timers[timers.length - 1].id + 1 : 1,
      label: data.label.trim() || `Timer ${timers.length + 1}`,
      endTime
    };

    setTimers([...timers, newTimer]);
    reset({ label: '', duration: '' });
  };

  const handleDelete = (id: number) => {
    setTimers(timers.filter((t) => t.id !== id));
  };

  const formatRelativeTime = (endTime: number) => {
    const diffMs = endTime - Date.now();
    if (diffMs <= 0) return 'Expired';
    return getRelativeTime(new Date(endTime));
  };

  return (
    <Card title='Timers'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col md:flex-row gap-3 mb-5'
      >
        <div className='flex flex-col flex-1'>
          <input
            {...register('label', { required: 'Label is required' })}
            placeholder='Label'
            className='input-text flex-1'
          />
          {errors.label && (
            <span className='text-red-400 text-xs mt-1'>{errors.label.message}</span>
          )}
        </div>

        <div className='flex flex-col'>
          <input
            {...register('duration', {
              required: 'Duration is required',
              pattern: {
                value: /^\d{2}:\d{2}:\d{2}$/,
                message: 'Format must be HH:MM:SS'
              },
              validate: (value) => {
                const [
                  h,
                  m,
                  s
                ] = value.split(':').map(Number);
                return h + m + s > 0 || 'Duration cannot be 00:00:00';
              }
            })}
            placeholder='HH:MM:SS'
            className='input-text w-32'
            onChange={(e) => {
              let input = e.target.value.replace(/[^\d:]/g, '');
              input = input.replace(/(\d{2})(?=\d)/g, '$1:').slice(0, 8);
              const parts = input.split(':');
              if (parts.length >= 2 && parseInt(parts[1]) > 59) parts[1] = '59';
              if (parts.length === 3 && parseInt(parts[2]) > 59) parts[2] = '59';
              setValue('duration', parts.join(':'), {
                shouldValidate: true,
                shouldDirty: true
              });
            }}
          />
          {errors.duration && (
            <span className='text-red-400 text-xs mt-1'>
              {errors.duration.message}
            </span>
          )}
        </div>

        <button
          type='submit'
          className='px-4 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm cursor-pointer'
        >
          Add Timer
        </button>
      </form>

      {timers.length === 0
        ? (
          <p className='text-gray-400 text-sm italic'>No timers yet.</p>
          )
        : (
          <table className='w-full text-sm border-collapse'>
            <thead>
              <tr className='border-b border-neutral-700 text-gray-300'>
                <th className='text-left py-1 px-2'>Label</th>
                <th className='text-left py-1 px-2'>Remaining</th>
                <th className='py-1 px-2 text-right'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {timers.map((t) => (
                <tr
                  key={t.id}
                  className={`border-b border-neutral-800 ${
                  t.endTime < Date.now()
                    ? 'text-gray-500'
                    : 'text-gray-200'
                }`}
                >
                  <td className='py-1 px-2'>{t.label}</td>
                  <td className='py-1 px-2'>{formatRelativeTime(t.endTime)}</td>
                  <td className='py-1 px-2 text-right'>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className='text-red-400 hover:text-red-300 text-xs'
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
    </Card>
  );
}
