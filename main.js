const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
let mainWindow;
let printers;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: 'file:',
      slashes: true,
    }),
  );
  // Open the DevTools.
  printers = mainWindow.webContents.getPrinters();
  console.log(printers);
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

ipcMain.on('asynchronous-message', (event, arg) => {
  const array = [
    { printer: 'EPSON', id: 1, desc: 'This is the description of the printer' },
    { printer: 'Samsung', id: 3, desc: 'This is the description of the printer' },
    { printer: 'HP', id: 4, desc: 'This is the description of the printer' },
    { printer: 'Dell', id: 5, desc: 'This is the description of the printer' },
  ];
  const printList = event.sender.send('asynchronous-reply', printers);
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
