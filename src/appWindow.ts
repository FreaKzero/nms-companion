import path from 'node:path';

import appMenu from '@/menu/appMenu';

import Database from 'better-sqlite3';
import { BrowserWindow, Menu, app, shell } from 'electron';

import OptionManager from './app/lib/OptionManager';
import { registerDialogIpc } from './ipc/dialogIPC';
import { registerDiscoveriesIpc } from './ipc/discoveriesIPC';
import registerFishTrackerIpc from './ipc/fishtrackerIPC';
import { registerFlightLogIpc } from './ipc/flightlogIPC';
import { registerLocationIpc } from './ipc/locationIPC';
import registerNmsIpc from './ipc/nmsIPC';
import registerRedditIPC from './ipc/redditIPC';
import { registerSupplyIpc } from './ipc/supplyIPC';
import registerSystemIpc from './ipc/systemIPC';

let appWindow: BrowserWindow;
let db: Database.Database;

/**
 * Create Application Window
 * @returns { BrowserWindow } Application Window Instance
 */
export function createAppWindow (): BrowserWindow {
  const minWidth = 1200;
  const minHeight = 800;

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

  appWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http') && !url.includes('localhost')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  appWindow.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith('http') && !url.includes('localhost')) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

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

app.on('before-quit', () => {
  if (db) {
    db.close();
    console.log('SQLite database closed.');
  }
});

/**
 * Register Inter Process Communication
 */
function registerMainIPC () {
  /**
   * Here you can assign IPC related codes for the application window
   * to Communicate asynchronously from the main process to renderer processes.
   */

  const opt = OptionManager.load();
  db = new Database(opt.databasePath);

  registerLocationIpc(opt, db);
  registerSystemIpc(opt);
  registerRedditIPC(opt);
  registerNmsIpc(opt);
  registerFishTrackerIpc(opt);
  registerSupplyIpc(db);
  registerDiscoveriesIpc(db);
  registerFlightLogIpc(db);

  registerDialogIpc(appWindow);
}
