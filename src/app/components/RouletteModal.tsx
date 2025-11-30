import g0 from 'assets/0.png';
import g1 from 'assets/1.png';
import g2 from 'assets/2.png';
import g3 from 'assets/3.png';
import g4 from 'assets/4.png';
import g5 from 'assets/5.png';
import g6 from 'assets/6.png';
import g7 from 'assets/7.png';
import g8 from 'assets/8.png';
import g9 from 'assets/9.png';
import gA from 'assets/A.png';
import gB from 'assets/B.png';
import gC from 'assets/C.png';
import gD from 'assets/D.png';
import gE from 'assets/E.png';
import gF from 'assets/F.png';

import React, { useEffect, useState } from 'react';

import { openCustomModal } from './CustomModal';

let isInitialized = false;
let isOpen = false;

export const glyphMap: Record<string, string> = {
  0: g0,
  1: g1,
  2: g2,
  3: g3,
  4: g4,
  5: g5,
  6: g6,
  7: g7,
  8: g8,
  9: g9,
  A: gA,
  B: gB,
  C: gC,
  D: gD,
  E: gE,
  F: gF
};

const glyphKeys = Object.keys(glyphMap);

const Roulette: React.FC = () => {
  const [slots, setSlots] = useState<string[]>(Array(12).fill('0'));
  const [spinning, setSpinning] = useState<boolean[]>(Array(12).fill(false));

  const [offsets] = useState<number[]>(() => Array(12).fill(0)
    .map(() => Math.floor(Math.random() * glyphKeys.length)));

  const roll = () => {
    setSpinning(Array(12).fill(true));

    const result = Array(12)
      .fill('')
      .map(() => glyphKeys[Math.floor(Math.random() * glyphKeys.length)]);

    result.forEach((glyph, i) => {
      setTimeout(() => {
        setSlots((prev) => {
          const cp = [...prev];
          cp[i] = glyph;
          return cp;
        });

        setSpinning((prev) => {
          const cp = [...prev];
          cp[i] = false;
          return cp;
        });
      }, 400 + i * 200);
    });
  };

  useEffect(() => {
    roll();
  }, []);

  return (
    <>
      <div className='flex gap-2 items-center'>
        {slots.map((glyph, i) => (
          <div
            key={i}
            className='relative overflow-hidden w-15 px-2 py-5 h-12 rounded-md border border-gray-700 bg-black'
          >
            <div
              className={`
              absolute inset-0 flex flex-col
              ${spinning[i] ? 'slot-roll' : 'hidden'}
            `}
              style={{
                transform: `translateY(-${offsets[i] * 48}px)`
              }}
            >
              {[...glyphKeys, ...glyphKeys].map((key, idx) => (
                <img
                  key={idx}
                  src={glyphMap[key]}
                  className='w-full h-12 object-contain'
                />
              ))}
            </div>

            {!spinning[i] && (
              <img
                src={glyphMap[glyph]}
                className='absolute inset-0 w-full h-full object-contain'
              />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={roll}
        className='button mt-5 w-full'
      >
        Re-Spin
      </button>
    </>
  );
};

const RouletteModal: React.FC = () => {
  return (
    <Roulette />
  );
};

export function registerRouletteModal () {
  if (isInitialized) return;
  isInitialized = true;

  const handleShortcut = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r' && !isOpen) {
      e.preventDefault();
      openCustomModal(<RouletteModal />, '', () => { isOpen = false; });
      isOpen = true;
    }
  };

  window.addEventListener('keydown', handleShortcut);

  electron.ipcRenderer.on('MENU_ROULETTE', () => {
    openCustomModal(<RouletteModal />, '', () => { isOpen = false; });
    isOpen = true;
  });
}
