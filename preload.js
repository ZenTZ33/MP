const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('musicAPI', {
  search: (query) => ipcRenderer.invoke('search-music', query),
  getAudioUrl: (url) => ipcRenderer.invoke('get-audio-url', url)
});