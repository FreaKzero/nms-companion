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

import { MouseEvent, useState } from 'react';

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

const Glyphs = ({ portalCode, width = 'w-10' }: { portalCode?: string; width?: string }) => {
  const [tooltipText, setTooltipText] = useState('Copy Portal Code');
  const [isPulsing, setIsPulsing] = useState(false);

  const handleClick = async (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!portalCode) return;

    try {
      await navigator.clipboard.writeText(portalCode);

      setTooltipText('Copied!');

      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 300);

      setTimeout(() => setTooltipText('Copy Portal Code'), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setTooltipText('Failed');
      setTimeout(() => setTooltipText('Copy Portal Code'), 1000);
    }
  };

  if (!portalCode) {
    return (
      <div className='inline-flex gap-1'>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`placeholder-${i}`}
            className={`bg-gray-200 border-2 border-dashed rounded ${width}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className='relative inline-block group'>
      <div
        onClick={handleClick}
        className={`
          flex cursor-pointer transition-all duration-150 active:scale-90 select-none
          ${isPulsing ? 'animate-pulse' : ''}
        `}
      >
        {portalCode.split('').map((char, i) => (
          <img
            key={`glyph-${i}`}
            src={glyphMap[char]}
            alt={char}
            className={`inline-block ${width}`}
          />
        ))}
      </div>

      <div
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          pointer-events-none z-50
          px-2 py-1 min-w-max
          bg-gray-900 text-white text-xs font-bold
          rounded-md shadow-md
          transition-all duration-100
          scale-0 group-hover:scale-100
          origin-center
          whitespace-nowrap
          font-nms
        `}
      >
        {tooltipText}
      </div>
    </div>
  );
};

export default Glyphs;
