import { BrowserWindow } from 'electron';

export type ClickHandler = (
  menuItem: Electron.MenuItem,
  browserWindow: Electron.BrowserWindow | undefined,
  event: Electron.KeyboardEvent,
) => void;

export function emitEvent (channel: string, payload?: any) {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.webContents.send(channel, payload);
}
