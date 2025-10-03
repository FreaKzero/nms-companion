import React, { useState, ClipboardEvent } from 'react';

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

  const handlePaste = async (evt: ClipboardEvent<HTMLDivElement>) => {
    const item = evt.clipboardData.items[0];
    if (item && item.kind === 'file') {
      const img = item.getAsFile();
      if (img) {
        const arrayBuffer = await img.arrayBuffer();
        const newScreenshot = {
          buffer: arrayBuffer,
          preview: URL.createObjectURL(img)
        };
        setScreenshot(newScreenshot);

        if (onScreenshotChange) {
          onScreenshotChange(newScreenshot);
        }
      }
    }
  };

  return (
    <div className='flex flex-col gap-1'>
      <label className='input-text-label'>{label}</label>
      <div
        className='w-44 h-28 border border-white rounded-md text-white p-2 text-center focus-visible:border-amber-400'
        onPaste={handlePaste}
        tabIndex={0}
      >
        {screenshot.preview
          ? (
            <img src={screenshot.preview} alt='Screenshot preview' />
            )
          : (
            <span>Paste here</span>
            )}
      </div>
    </div>
  );
};
