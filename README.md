# MP — Music Player

A desktop music player built with Electron, featuring an adaptive theme, internet music search, and customizable hotkeys.

## Features

- 🎨 Adaptive theme — the UI picks up the dominant color from each track's cover art
- 🎧 Local MP3 playback
- 🔍 Internet music search (via YouTube)
- ⌨️ Customizable hotkeys
- 📝 Lyrics (from file or from the internet)
- 🎚️ 10-band equalizer
- 🌙 Dark, minimal UI
- 🖥️ Cross-platform (Windows, macOS, Linux)

## Tech Stack

- Electron
- JavaScript / HTML / CSS
- Node.js
- yt-search (search)
- yt-dlp (audio extraction)

## Download

Grab the ready-to-use installer from the [Releases page](https://github.com/ZenTZ33/MP/releases/latest):

1. Download `MP Setup 1.1.0.exe`.
2. Run it and install.
3. A shortcut will appear on your desktop.

No Node.js or terminal needed — just install and use.

## Run from Source (for developers)

### Requirements

- Node.js (v16+)
- npm
- `yt-dlp.exe` (place it in the `binaries/` folder)

### Setup

```bash
git clone https://github.com/ZenTZ33/MP.git
cd MP
npm install
npm start
Build
npm run build
The output will be in the dist/ folder.
