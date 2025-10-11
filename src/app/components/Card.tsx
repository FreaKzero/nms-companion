import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
}

export default function Card ({ children, title }: CardProps) {
  return (
    <div className='mt-3 flex flex-1 gap-5'>
      <div className='w-full bg-gray-900 border border-neutral-700 rounded-xl overflow-hidden'>
        <div className='bg-gray-700 p-2'>
          <h2 className='text-2xl text-white ml-5 font-nms'>{title}</h2>
        </div>
        <div className='border-b border-neutral-700' />
        <div className='p-5'>
          {children}
        </div>
      </div>
    </div>
  );
}
