import { ClipboardIcon } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

export interface ScreenshotValue {
  preview: string | null;
  buffer: ArrayBuffer | null;
}

interface FormScreenshotPasterProps {
  label: string;
  onScreenshotChange?: (screenshot: ScreenshotValue) => void;
}

export const FormScreenShotPaster: React.FC<FormScreenshotPasterProps> = ({
  label,
  onScreenshotChange
}) => {
  const [screenshot, setScreenshot] = useState<ScreenshotValue>({
    preview: null,
    buffer: null
  });
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    const imageUrlRegex =
      /^(https?:\/\/)?((([a-z0-9-]+\.)+[a-z]{2,}|localhost|(\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[^\s?#]*)\.(?:jpe?g|png|gif|webp|svg|bmp|tiff|ico)(\?[^\s#]*)?(#[^\s]*)?$/i;

    try {
      const pastedText = e.clipboardData.getData('text/plain');
      if (pastedText && imageUrlRegex.test(pastedText)) {
        const arrayBuffer = await electron.ipcRenderer.invoke('ARRAYBUFFER_SCREEN_URL', pastedText);
        const newScreenshot = { buffer: arrayBuffer, preview: pastedText };
        setScreenshot(newScreenshot);
        onScreenshotChange?.(newScreenshot);
        return;
      }

      const file = e.clipboardData.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const arrayBuffer = await file.arrayBuffer();
        const newScreenshot = { buffer: arrayBuffer, preview: URL.createObjectURL(file) };
        setScreenshot(newScreenshot);
        onScreenshotChange?.(newScreenshot);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='flex flex-col gap-1'>
      <label className='input-text-label'>{label}</label>

      <div
        ref={containerRef}
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onPaste={handlePaste}
        className={`bg-white/5 w-44 h-28 border rounded-md p-2 flex flex-col items-center justify-center text-center transition-all duration-100
          ${isFocused ? 'border-indigo-600 text-indigo-400 border-2' : 'border-white/10 text-gray-500'}`}
      >
        {screenshot.preview
          ? (
            <img
              src={screenshot.preview}
              alt='Screenshot preview'
              className='max-h-full max-w-full object-contain'
            />
            )
          : (
            <div className='flex flex-col items-center justify-center gap-2 text-xs uppercase tracking-wide cursor-pointer'>
              <ClipboardIcon size='20' className={isFocused ? 'text-indigo-500' : 'text-white/30'} />
              <span>{isFocused ? 'CTRL + V' : 'Copy Picture or URL and click'}</span>
            </div>
            )}
      </div>
    </div>
  );
};
