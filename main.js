const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const yts = require('yt-search');

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

// ============ ПОИСК МУЗЫКИ В ИНТЕРНЕТЕ ============

ipcMain.handle('search-music', async (event, query) => {
  try {
    const r = await yts(query);
    return r.videos.slice(0, 15).map(v => ({
      title: v.title,
      artist: v.author.name,
      duration: v.timestamp,
      thumbnail: v.thumbnail,
      url: v.url,
      videoId: v.videoId
    }));
  } catch (e) {
    console.error('search error:', e);
    return [];
  }
});

ipcMain.handle('get-audio-url', async (event, videoUrl) => {
  return new Promise((resolve) => {
    // В собранном приложении yt-dlp.exe лежит в resources/binaries
    // При npm start — в папке проекта binaries/
    const ytdlpPath = app.isPackaged
      ? path.join(process.resourcesPath, 'binaries', 'yt-dlp.exe')
      : path.join(__dirname, 'binaries', 'yt-dlp.exe');

    const cmd = `"${ytdlpPath}" -f "bestaudio" --get-url "${videoUrl}"`;
    exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
      if (error) {
        console.error('yt-dlp error:', error.message);
        console.error('stderr:', stderr);
        resolve(null);
        return;
      }
      resolve(stdout.trim());
    });
  });
});

// ============ ЗАПУСК ============

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});