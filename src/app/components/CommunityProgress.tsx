import React from 'react';

import Card from './Card';

interface CommunityProgressBarProps {
  progress: number;
  tiers?: number;
}

export default function CommunityProgressBar ({ progress, tiers = 5 }: CommunityProgressBarProps) {
  const sectionWidth = 100 / tiers;

  return (
    <Card title={`Universal Community Research Progress • ${progress}% Done`} className='p-5 pt-10'>
      <div className='w-full'>

        <div className='relative w-full h-3 bg-gray-700 rounded-sm overflow-hidden border border-gray-600'>
          <div
            className='absolute top-0 left-0 h-full bg-gradient-to-t from-green-800 to-green-700 transition-all duration-500'
            style={{ width: `${progress}%` }}
          />

          {Array.from({ length: tiers - 1 }).map((_, i) => (
            <div
              key={i}
              className='absolute top-0 h-full w-[1px] bg-gray-900/50'
              style={{ left: `${(i + 1) * sectionWidth}%` }}
            />
          ))}
        </div>

        <div className='flex justify-between text-xs text-gray-400 mt-1'>
          {Array.from({ length: tiers }).map((_, i) => {
            const tierStart = i * sectionWidth;
            const tierEnd = (i + 1) * sectionWidth;
            const isActive = progress >= tierStart && progress < tierEnd;

            return (
              <div key={i} className='text-center w-full'>
                {isActive
                  ? (
                    <span className='text-green-700 font-semibold'>
                      Tier {i + 1} {progress}%
                    </span>
                    )
                  : (
                    <span>Tier {i + 1}</span>
                    )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
