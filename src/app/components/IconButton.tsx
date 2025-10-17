import React from 'react';

interface IconButtonProps {
  Icon: React.ElementType;
  label?: string;
  onClick?: (e?: any) => void;
  size?: number;
  className?: string;
}

export default function IconButton ({
  Icon,
  label,
  onClick,
  size = 16,
  className = ''
}: IconButtonProps) {
  return (
    <div className={`relative group inline-block ${className}`}>
      <button
        type='button'
        onClick={onClick}
        className='button h-10 pl-3 pr-3'
      >
        <Icon height={size} width={size} />
      </button>

      {label && (
        <span
          className='
            absolute left-1/2 -translate-x-1/2 -top-8
            bg-gray-900 text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap
            opacity-0 group-hover:opacity-100 group-hover:-translate-y-1
            pointer-events-none transition-all duration-150
            shadow-md
          '
        >
          {label}
        </span>
      )}
    </div>
  );
}
