import { ClipboardIcon } from 'lucide-react';
import React, { useState } from 'react';

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

  const handlePasteButton = async () => {
    const imageUrlRegex = /^(https?:\/\/)?((([a-z0-9-]+\.)+[a-z]{2,}|localhost|(\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[^\s?#]*)\.(?:jpe?g|png|gif|webp|svg|bmp|tiff|ico)(\?[^\s#]*)?(#[^\s]*)?$/i;

    try {
      const clipboardItems = await navigator.clipboard.read();
      const lastItem = clipboardItems[0];

      if (!lastItem) {
        return;
      }

      const txtType = lastItem.types.find((t) => t.includes('text/plain'));

      if (txtType) {
        const url = await navigator.clipboard.readText();
        if (imageUrlRegex.test(url)) {
          const arrayBuffer = await electron.ipcRenderer.invoke('ARRAYBUFFER_SCREEN_URL', url);

          const newScreenshot = {
            buffer: arrayBuffer,
            preview: url
          };

          setScreenshot(newScreenshot);
          if (onScreenshotChange) onScreenshotChange(newScreenshot);
        }
        return;
      }

      const imageType = lastItem.types.find((t) => t.startsWith('image/'));
      if (!imageType) {
        return;
      }

      const blob = await lastItem.getType(imageType);
      const arrayBuffer = await blob.arrayBuffer();

      const newScreenshot = {
        buffer: arrayBuffer,
        preview: URL.createObjectURL(blob)
      };

      setScreenshot(newScreenshot);
      if (onScreenshotChange) onScreenshotChange(newScreenshot);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col gap-1'>
      <label className='input-text-label'>{label}</label>

      <div
        className='w-44 h-28 border border-white rounded-md text-white p-2
               flex flex-col items-center justify-center text-center
               focus-visible:border-amber-400'
        tabIndex={0}
      >
        {screenshot.preview
          ? (
            <img src={screenshot.preview} alt='Screenshot preview' className='max-h-full max-w-full object-contain' />
            )
          : (
            <div className='flex flex-col items-center justify-center gap-2'>
              <span className='text-xs uppercase tracking-wide'>Paste Image or URL</span>
              <button
                type='button'
                onClick={handlePasteButton}
                className='flex h-10 w-10 items-center justify-center rounded-md bg-indigo-600
                     text-white hover:bg-indigo-500 active:bg-indigo-700 transition-colors'
              >
                <ClipboardIcon size='20' />
              </button>
            </div>
            )}
      </div>
    </div>

  );
};
