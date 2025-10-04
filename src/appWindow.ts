import path from 'node:path';

import { registerMenuIpc } from '@/ipc/menuIPC';
import appMenu from '@/menu/appMenu';

import { BrowserWindow, Menu, app } from 'electron';

import { registerDbIpc } from './ipc/dbIPC';
import { registerDialogIpc } from './ipc/dialogIPC';
import registerNmsIpc from './ipc/nmsIPC';
import registerSystemIpc from './ipc/systemIPC';

let appWindow: BrowserWindow;

/**
 * Create Application Window
 * @returns { BrowserWindow } Application Window Instance
 */
export function createAppWindow (): BrowserWindow {
  const minWidth = 960;
  const minHeight = 660;

  const windowOptions: Electron.BrowserWindowConstructorOptions = {
    minWidth,
    minHeight,
    show: false,
    autoHideMenuBar: false,
    titleBarStyle: 'default',
    frame: true,
    backgroundColor: '#1a1a1a',
    webPreferences: {
      webSecurity: app.isPackaged,
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: path.join(import.meta.dirname, 'preload.js')
    }
  };

  // Create new window instance
  appWindow = new BrowserWindow(windowOptions);

  // Load the index.html of the app window.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    appWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    appWindow.loadFile(path.join(import.meta.dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Build the application menu
  const menu = Menu.buildFromTemplate(appMenu);
  Menu.setApplicationMenu(menu);

  // Show window when is ready to
  appWindow.on('ready-to-show', () => {
    appWindow.show();
  });

  // Register Inter Process Communication for main process
  registerMainIPC();

  // Close all windows when main window is closed
  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  return appWindow;
}

/**
 * Register Inter Process Communication
 */
function registerMainIPC () {
  /**
   * Here you can assign IPC related codes for the application window
   * to Communicate asynchronously from the main process to renderer processes.
   */
  registerNmsIpc();
  registerMenuIpc(appWindow);
  registerDbIpc();
  registerDialogIpc(appWindow);
  registerSystemIpc();
}
