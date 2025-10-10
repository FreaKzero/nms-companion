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

  return (
    <div className='flex flex-col gap-1'>
      <label className='input-text-label'>{label}</label>

      <div
        tabIndex={0}
        onPaste={handlePaste}
        className='w-44 h-28 border border-white rounded-md text-white p-2
               flex flex-col items-center justify-center text-center outline-none
               focus-visible:border-amber-400
               focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500
               transition-all duration-100'
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
            <div className='flex flex-col items-center justify-center gap-2 text-xs uppercase tracking-wide'>
              <ClipboardIcon size='20' />
              <span>Paste Image or URL</span>
            </div>
            )}
      </div>
    </div>
  );
};
