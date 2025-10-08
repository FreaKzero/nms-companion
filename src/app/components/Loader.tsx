import React, { useEffect, useState } from 'react';

export default function Loader ({ message }: { message: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-center items-center bg-gray-950/70 backdrop-blur-sm transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <p className='font-semibold text-3xl animate-pulse font-nms'>
        {message}
      </p>
    </div>
  );
}
