import { ipcMain, dialog, BrowserWindow } from 'electron';

export function registerDialogIpc (mainWindow?: BrowserWindow) {
  ipcMain.handle('FILEPICKER_DIALOG', async (opts?: any) => {
    const defOpts = {
      properties: ['openDirectory']
    };
    const result = await dialog.showOpenDialog(Object.assign({}, defOpts, opts));

    if (result.canceled) return null;
    return result.filePaths[0];
  });

  ipcMain.handle('OPEN_FILE_DIALOG', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile']
    });
    if (result.canceled) return null;
    return result.filePaths[0];
  });

  ipcMain.handle('OPEN_MULTI_FILE_DIALOG', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections']
    });
    if (result.canceled) return null;
    return result.filePaths;
  });

  ipcMain.handle('SAVE_FILE_DIALOG', async () => {
    const result = await dialog.showSaveDialog({});
    if (result.canceled) return null;
    return result.filePath;
  });

  ipcMain.handle(
    'MESSAGE_BOX',
    async (
      _,
      options: Electron.MessageBoxOptions = {
        type: 'question',
        buttons: ['Cancel', 'OK'],
        defaultId: 1,
        title: 'Confirm',
        message: 'Are you sure?'
      }
    ) => {
      const res = await dialog.showMessageBox(mainWindow ?? null, options);
      return res.response;
    }
  );

  ipcMain.handle('ERROR_DIALOG', async (_, message: string, title = 'Error') => {
    await dialog.showErrorBox(title, message);
    return true;
  });
}
