import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

interface CustomModalProps {
  root: ReactDOM.Root;
  container: HTMLElement;
  children: React.ReactNode;
  className?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ root, container, children, className }) => {
  const [visible, setVisible] = useState(false);

  const cl = className || 'bg-gray-900 rounded-xl shadow-2xl p-6 transform transition-all text-center duration-200';

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      root.unmount();
      container.remove();
    }, 150);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
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
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${cl} ${
          visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export function openCustomModal (children: React.ReactNode, className: string) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);

  root.render(<CustomModal root={root} container={container} className={className}>{children}</CustomModal>);
}
