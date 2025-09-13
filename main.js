const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store');

const store = new Store();

function createWindow () {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers for storage
ipcMain.handle('load-data', async (event) => {
  const data = store.get('app_data', { employees: [], taxBands: [] });
  return data;
});

ipcMain.handle('save-data', async (event, data) => {
  store.set('app_data', data);
  return { ok: true };
});

ipcMain.handle('choose-save-path', async (event, defaultName) => {
  const win = BrowserWindow.getFocusedWindow();
  const res = await dialog.showSaveDialog(win, { defaultPath: defaultName });
  return res;
});

ipcMain.handle('print-pdf', async (event, htmlContent, defaultFileName) => {
  // create a hidden BrowserWindow, load the content and print to PDF
  const pdfWin = new BrowserWindow({ show: false, webPreferences: { sandbox: true } });
  await pdfWin.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
  try {
    const data = await pdfWin.webContents.printToPDF({});
    const { canceled, filePath } = await dialog.showSaveDialog(pdfWin, { defaultPath: defaultFileName });
    if (canceled) return { canceled: true };
    fs.writeFileSync(filePath, data);
    pdfWin.close();
    return { canceled: false, filePath };
  } catch (err) {
    pdfWin.close();
    return { canceled: true, error: err.message };
  }
});
