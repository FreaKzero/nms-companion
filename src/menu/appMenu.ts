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
        id: 'Supply Depots',
        label: 'Supply Depots',
        click: () => emitEvent('MENU-ROUTE', '/supply'),
        accelerator: 'F2'
      },
      {
        id: 'locations',
        label: 'Locations',
        click: () => emitEvent('MENU-ROUTE', '/locations'),
        accelerator: 'F3'
      },
      {
        id: 'saveCurrent',
        label: 'Save Current Location',
        click: () => emitEvent('MENU-ROUTE', '/current'),
        accelerator: 'F4'
      },
      {
        id: 'saveManual',
        label: 'Save Manual Location',
        click: () => emitEvent('MENU-ROUTE', '/manual'),
        accelerator: 'F5'
      },
      {
        id: 'reddit',
        label: 'Reddit Feed',
        click: () => emitEvent('MENU-ROUTE', '/reddit'),
        accelerator: 'F6'
      },
      {
        id: 'fish',
        label: 'Flight Log',
        click: () => emitEvent('MENU-ROUTE', '/log'),
        accelerator: 'F7'
      },
      {
        id: 'discoveries',
        label: 'Discovered Galaxies',
        click: () => emitEvent('MENU-ROUTE', '/discoveries'),
        accelerator: 'F8'
      },
      {
        type: 'separator'
      },
      {
        id: 'debug',
        label: 'Developer Debug',
        click: () => emitEvent('MENU-ROUTE', '/dev')
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
    label: 'Tools',
    submenu: [
      {
        id: 'nmswiki',
        label: 'Search in NMS Wiki',
        click: () => emitEvent('MENU_WIKISEARCH'),
        accelerator: 'CmdOrCtrl+F'
      },
      {
        id: 'biome',
        label: 'Biome Decoder',
        click: () => emitEvent('MENU_BIOME'),
        accelerator: 'CmdOrCtrl+B'
      },
      {
        id: 'roulette',
        label: 'Glyph Roulette',
        click: () => emitEvent('MENU_ROULETTE'),
        accelerator: 'CmdOrCtrl+R'
      },
      {
        type: 'separator'
      },
      {
        id: 'fishtracker',
        label: 'Legendary Fish Tracker',
        click: () => emitEvent('MENU-ROUTE', '/fish')
      },
      {
        id: 'savestates',
        label: 'Save States',
        click: () => emitEvent('MENU-ROUTE', '/savestates')

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
