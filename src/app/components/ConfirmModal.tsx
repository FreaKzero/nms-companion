/* eslint-disable @stylistic/jsx-closing-tag-location */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  info?: boolean;
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
    cancelText = 'Cancel',
    info = false
  } = options;

  const [visible, setVisible] = useState(false);

  const handleClose = (value: boolean) => {
    setVisible(false);
    setTimeout(() => {
      resolve(value);
      root.unmount();
      container.remove();
    }, 150);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose(false);
    };
    window.addEventListener('keydown', onKeyDown);
    setVisible(true);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={() => handleClose(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-gray-900 text-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-200 ${
          visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        <h2 className='text-xl font-bold mb-4'>{title}</h2>
        <p className='mb-6 text-gray-300'>{message}</p>
        <div className='flex justify-end gap-3'>
          {!info && <button
            onClick={() => handleClose(false)}
            className='button2 w-25'
                    >
            {cancelText}
          </button>}
          <button
            onClick={() => handleClose(true)}
            className='button w-25'
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
