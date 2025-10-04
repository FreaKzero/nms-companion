import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog: React.FC<{
  options: ConfirmOptions;
  resolve: (value: boolean) => void;
  root: ReactDOM.Root;
  container: HTMLElement;
}> = ({ options, resolve, root, container }) => {
  const {
    title = 'Confirm',
    message = 'Are you sure?',
    confirmText = 'OK',
    cancelText = 'Cancel'
  } = options;

  const handleClose = (value: boolean) => {
    resolve(value);
    root.unmount();
    container.remove();
  };

  // ESC key handling
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
      onClick={() => handleClose(false)} // backdrop click
    >
      <div
        className='bg-gray-900 text-white rounded-xl shadow-2xl w-full max-w-md p-6'
        onClick={(e) => e.stopPropagation()} // prevent backdrop-close when clicking inside
      >
        <h2 className='text-xl font-bold mb-4'>{title}</h2>
        <p className='mb-6 text-gray-300'>{message}</p>
        <div className='flex justify-end gap-3'>
          <button
            onClick={() => handleClose(false)}
            className='px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition'
          >
            {cancelText}
          </button>
          <button
            onClick={() => handleClose(true)}
            className='px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition font-bold'
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export function confirmModal (options: ConfirmOptions | string): Promise<boolean> {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);
    const opts = typeof options === 'string' ? { message: options } : options;

    root.render(<ConfirmDialog options={opts} resolve={resolve} root={root} container={container} />);
  });
}
