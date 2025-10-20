import { MenuChannels } from '@/channels/menuChannels';
import { emitEvent } from '@/webContents';

const MenuItems: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'App',
    submenu: [
      {
        id: 'missions',
        label: 'Missions',
        click: () => emitEvent('MENU-ROUTE', '/'),
        accelerator: 'F1'
      },
      {
        id: 'locations',
        label: 'Locations',
        click: () => emitEvent('MENU-ROUTE', '/list'),
        accelerator: 'F2'
      },
      {
        id: 'saveCurrent',
        label: 'Save Current Location',
        click: () => emitEvent('MENU-ROUTE', '/current'),
        accelerator: 'F3'
      },
      {
        id: 'saveManual',
        label: 'Save Manual Location',
        click: () => emitEvent('MENU-ROUTE', '/manual'),
        accelerator: 'F4'
      },
      {
        id: 'reddit',
        label: 'Reddit Feed',
        click: () => emitEvent('MENU-ROUTE', '/reddit'),
        accelerator: 'F5'
      },
      {
        id: 'fish',
        label: 'Legendary Fish Tracker',
        click: () => emitEvent('MENU-ROUTE', '/fish'),
        accelerator: 'F6'
      },
      {
        type: 'separator'
      },
      {
        id: MenuChannels.WINDOW_CLOSE,
        label: 'Exit',
        role: 'quit',
        accelerator: 'CmdOrCtrl+Q'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        id: MenuChannels.WEB_ACTUAL_SIZE,
        label: 'Reset Zoom',
        role: 'resetZoom',
        accelerator: 'CmdOrCtrl+0'
      },
      {
        id: MenuChannels.WEB_ZOOM_IN,
        label: 'Zoom In',
        role: 'zoomIn'
      },
      {
        id: MenuChannels.WEB_ZOOM_OUT,
        label: 'Zoom Out',
        role: 'zoomOut',
        accelerator: 'CmdOrCtrl+-'
      },
      {
        type: 'separator'
      },
      {
        id: MenuChannels.WEB_TOGGLE_FULLSCREEN,
        label: 'Toggle Full Screen',
        role: 'togglefullscreen'
      },
      {
        type: 'separator'
      },
      {
        id: MenuChannels.WEB_TOGGLE_DEVTOOLS,
        label: 'Toogle Developer Tools',
        role: 'toggleDevTools',
        accelerator: 'CmdOrCtrl+Shift+I'
      }
    ]
  }
];

export default MenuItems;
