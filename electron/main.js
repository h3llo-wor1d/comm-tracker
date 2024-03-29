const { app, BrowserWindow, screen: electronScreen, session, Tray, Menu } = require('electron');
const path = require('path');
const { chrome } = require('process');
const url = require('url');
const fetch = require('cross-fetch');
const { ElectronBlocker, fullLists, FiltersEngine } = require('@cliqz/adblocker-electron');
const { readFileSync, writeFileSync } = require("original-fs");

var mainWindowOpen = true;

const createMainWindow = async () => {
  mainWindowOpen = true;
  let mainWindow = new BrowserWindow({
    width: electronScreen.getPrimaryDisplay().workArea.width,
    height: electronScreen.getPrimaryDisplay().workArea.height,
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, '../icons/icon.png')
  });

  
  var adBlocker = await ElectronBlocker.fromLists(
    fetch,
    fullLists,
    {
    enableCompression: true
    },
    {
    path: `engine.bin`, 
    read: async (...args) => readFileSync(...args),
    write: async (...args) => writeFileSync(...args),
    }
  );

  adBlocker.enableBlockingInSession(session.defaultSession);

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  
  mainWindow.loadURL(startUrl);


  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
    mainWindowOpen = false;
  });
};

app.whenReady().then(async () => {

  const tray = new Tray(path.join(__dirname, '../icons/icon.ico'))

  tray.on('click', () => {
    if (!mainWindowOpen) createMainWindow();
  })

  const menu = Menu.buildFromTemplate ([
    {
      label: 'Quit',
      click() { 
        app.quit()
      }
    }
  ])

  tray.setToolTip('Wrench Comm Tracker')
  tray.setContextMenu(menu)

  createMainWindow();

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  console.log("should be quitting, no?")
  if (process.platform !== 'darwin') {
    app.quit();
    console.log("should quit, no?")
  }
});