import React from 'react';

import Card from './Card';

interface CommunityProgressBarProps {
  currentTier: number;
  percentage: number;
  totalTiers: number;
}

export default function CommunityProgressBar ({
  currentTier,
  percentage,
  totalTiers
}: CommunityProgressBarProps) {
  const sectionWidth = 100 / totalTiers;
  const filledUntil = (currentTier - 1) * sectionWidth;
  const currentProgress = filledUntil + (percentage / 100) * sectionWidth;

  let gradient: string;

  if (currentTier === totalTiers && percentage === 100) {
    gradient = `linear-gradient(
      to right,
      #b45309 0%,
      #d97706 100%
    )`;
  } else {
    gradient = `linear-gradient(
      to right,
      #b45309 0%,
      #d97706 ${filledUntil}%,
      #166534 ${filledUntil}%,
      #15803d ${currentProgress}%,
      transparent ${currentProgress}%,
      transparent 100%
    )`;
  }

  return (
    <Card title={`Universal Community Research Progress • Tier ${currentTier} (${percentage}%)`} className='p-5 pt-10'>
      <div className='w-full'>
        <div className='relative w-full h-3 bg-gray-700 rounded-sm overflow-hidden border border-gray-600'>
          <div
            className='absolute top-0 left-0 h-full'
            style={{
              width: '100%',
              background: gradient,
              transition: 'background 0.3s ease'
            }}
          />

          {Array.from({ length: totalTiers - 1 }).map((_, i) => (
            <div
              key={i}
              className='absolute top-0 h-full w-[2px] bg-gray-900/50'
              style={{ left: `${(i + 1) * sectionWidth}%` }}
            />
          ))}
        </div>

        <div className='flex justify-between text-xs text-gray-400 mt-1'>
          {Array.from({ length: totalTiers }).map((_, i) => {
            const tierNumber = i + 1;
            const isActive = tierNumber === currentTier;
            const isCompleted = tierNumber < currentTier;
            const isFinal = currentTier === totalTiers && percentage === 100;

            return (
              <div key={i} className='text-center w-full'>
                {isFinal && tierNumber === totalTiers
                  ? (
                    <span className='font-semibold text-amber-600'>
                      Tier {tierNumber} ✓
                    </span>
                    )
                  : isActive
                    ? (
                      <span className='font-semibold text-green-700'>
                        Tier {tierNumber} {percentage}%
                      </span>
                      )
                    : isCompleted
                      ? (
                        <span className='text-amber-600 font-semibold'>Tier {tierNumber} ✓</span>
                        )
                      : (
                        <span>Tier {tierNumber}</span>
                        )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
