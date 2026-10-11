const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow = null;

function createWindow(){
  mainWindow = new BrowserWindow({
    width: 560,
    height: 900,
    minWidth: 480,
    minHeight: 700,
    title: 'Music Player',
    backgroundColor: '#0a0505',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});