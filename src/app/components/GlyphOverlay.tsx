import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import Glyphs from './Glyphs';

interface GlyphOverlayProps {
  root: ReactDOM.Root;
  container: HTMLElement;
  portalCode: string;
  galaxyName: string;
}

const GlyphOverlay: React.FC<GlyphOverlayProps> = ({ root, container, portalCode, galaxyName }) => {
  const [visible, setVisible] = useState(false);

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
        className={`bg-gray-900 rounded-xl shadow-2xl w-3/4 p-6 transform transition-all text-center duration-200 ${
          visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        <h2 className='text-3xl text-white mb-5 font-nms'>{galaxyName}</h2>
        <Glyphs portalCode={portalCode} width='w-15' />
      </div>
    </div>
  );
};

export function openGlyphOverlay (portalCode: string, galaxyName: string) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);

  root.render(<GlyphOverlay root={root} container={container} portalCode={portalCode} galaxyName={galaxyName} />);
}
