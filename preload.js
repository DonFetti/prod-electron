const { contextBridge, ipcRenderer } = require('electron');

// Expose ipcRenderer methods to the renderer process through contextBridge
contextBridge.exposeInMainWorld('electronAPI', {
  // invoke() - request/response pattern for IPC communication
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  
  // on() - listen to events from main process
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  
  // removeListener() - remove event listeners
  removeListener: (channel, func) => {
    ipcRenderer.removeListener(channel, func);
  }
});
