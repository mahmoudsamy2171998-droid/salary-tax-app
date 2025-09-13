const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadData: () => ipcRenderer.invoke('load-data'),
  saveData: (data) => ipcRenderer.invoke('save-data', data),
  chooseSavePath: (name) => ipcRenderer.invoke('choose-save-path', name),
  printPDF: (html, name) => ipcRenderer.invoke('print-pdf', html, name)
});
