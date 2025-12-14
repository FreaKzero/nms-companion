import { useState } from 'react';

import { openCustomModal } from './CustomModal';
function bearingBetween (startLat: number, startLon: number, endLat: number, endLon: number) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;
  const φ1 = toRad(startLat);
  const φ2 = toRad(endLat);
  const Δλ = toRad(endLon - startLon);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ) - Math.sin(φ1) * Math.sin(φ2);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

function parseCoord (value: string): number {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}

let isInitialized = false;
let isOpen = false;

export default function Compass () {
  const [start, setStart] = useState({ lat: 0, lon: 0 });
  const [end, setEnd] = useState({ lat: 0, lon: 0 });

  const [startInput, setStartInput] = useState(`${start.lat} ${start.lon}`);
  const [endInput, setEndInput] = useState(`${end.lat} ${end.lon}`);

  const angle = bearingBetween(start.lat, start.lon, end.lat, end.lon);

  return (
    <div className='flex flex-col items-center gap-4 p-6'>
      <div className='grid grid-cols-1 gap-4 w-64'>
        <input
          className='border p-2 rounded w-full'
          type='text'
          value={startInput}
          placeholder='Start LAT LON'
          onChange={(e) => setStartInput(e.target.value)}
          onBlur={() => {
            const [latStr, lonStr] = startInput.trim().split(' ');
            setStart({
              lat: parseCoord(latStr || ''),
              lon: parseCoord(lonStr || '')
            });
            setStartInput(`${parseCoord(latStr || '')} ${parseCoord(lonStr || '')}`);
          }}
        />
        <input
          className='border p-2 rounded w-full'
          type='text'
          value={endInput}
          placeholder='End LAT LON'
          onChange={(e) => setEndInput(e.target.value)}
          onBlur={() => {
            const [latStr, lonStr] = endInput.trim().split(' ');
            setEnd({
              lat: parseCoord(latStr || ''),
              lon: parseCoord(lonStr || '')
            });
            setEndInput(`${parseCoord(latStr || '')} ${parseCoord(lonStr || '')}`);
          }}
        />
      </div>

      <div className='relative w-64 h-64 flex items-center justify-center'>
        <div
          className='absolute w-60 h-60 rounded-full border-4 border-gray-500 flex items-center justify-center transition-transform duration-300'
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <span className='absolute top-2 font-bold text-xl'>N</span>
          <span className='absolute bottom-2 font-bold text-xl'>S</span>
          <span className='absolute left-2 font-bold text-xl'>W</span>
          <span className='absolute right-2 font-bold text-xl'>E</span>
        </div>

        <div
          className='absolute w-1 h-24 bg-blue-500 rounded-full opacity-80'
          style={{ transform: `rotate(${angle}deg)` }}
        />

        <div className='w-2 h-16 bg-red-600 rounded-full' />
      </div>

    </div>
  );
}

export function registerCompassModal () {
  if (isInitialized) return;
  isInitialized = true;

  electron.ipcRenderer.on('MENU_COMPASS', () => {
    if (!isOpen) {
      openCustomModal(<Compass />, '', () => { isOpen = false; });
      isOpen = true;
    }
  });
}
