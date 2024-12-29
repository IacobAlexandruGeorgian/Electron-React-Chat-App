
const {app, BrowserWindow, ipcMain, Notification} = require('electron');
const path = require('path');
const { electron } = require('process');
const isDev = !app.isPackaged;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavascript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
    })

    win.loadFile('index.html');
    isDev && win.webContents.openDevTools();
}

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

app.whenReady().then(createWindow);

ipcMain.on('notify', (_, message) => {
    new Notification({title: 'Notification', body: message}).show();
})

ipcMain.on('app-quit', () => {
    app.quit();
})

app.on('window-all-cosed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})

// npm install --save-dev electron
// npm install --save react react-dom
// npm install --save @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader sass sass-loader style-loader webpack webpack-cli
// npm install --save-dev electron-reload

