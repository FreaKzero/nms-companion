import timerback from 'assets/timerback.png';

import React from 'react';

import Card from './Card';

import { useTimersStore } from '../stores/useTimerStore';

export const TimerList = () => {
  const { timers, removeTimer } = useTimersStore();

  const formatRemaining = (endTime: number) => {
    const r = Math.max(endTime - Date.now(), 0);
    const h = String(Math.floor(r / 3600000)).padStart(2, '0');
    const m = String(Math.floor((r % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((r % 60000) / 1000)).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {timers.map((t) => {
        const isDone = Date.now() >= t.endTime;

        return (
          <Card key={t.id} title={t.label}>
            <div
              style={{ backgroundImage: `url(${timerback})` }}
              className='h-full bg-cover p-5 flex flex-col items-center gap-3'
            >
              {isDone
                ? (
                  <div className='flex flex-col items-center gap-2'>
                    <h2 className='text-xl text-amber-600 font-bold'>
                      TIMER DONE
                    </h2>

                    <button
                      onClick={() => removeTimer(t.id)}
                      className='button tiny'
                    >
                      Done
                    </button>
                  </div>
                  )
                : (
                  <>
                    <span className='font-nms text-4xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent'>
                      {formatRemaining(t.endTime)}
                    </span>

                    <button
                      onClick={() => removeTimer(t.id)}
                      className='button2 tiny'
                    >
                      Reset
                    </button>
                  </>
                  )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
