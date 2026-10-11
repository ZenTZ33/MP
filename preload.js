const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('musicAPI', {});