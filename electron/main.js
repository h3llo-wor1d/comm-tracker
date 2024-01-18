const { app, BrowserWindow, screen: electronScreen, session, Menu } = require('electron');
const path = require('path');
const { chrome } = require('process');
const url = require('url');
//const fetch = require("cross-fetch");
//const { ElectronBlocker } = require('@cliqz/adblocker-electron');

const createMainWindow = () => {
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

 

  /*ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
    blocker.enableBlockingInSession(session.defaultSession);
  });*/

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  
  const extensionPopup = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  
  extensionPopup.loadFile(path.join(__dirname, '../extensions/ublock/popup-fenix.html'));

  const template = [
    {
      label: 'Extensions',
      submenu: [
        // Other menu items...
        {
          label: 'Open UBlock Origin',
          click: () => {
            // Add the functionality you want when the button is clicked
            extensionPopup.show()
          },
        },
      ],
    },
    // Other menu items...
  ];

  //const menu = Menu.buildFromTemplate(template);
  //Menu.setApplicationMenu(menu);

  mainWindow.loadURL(startUrl);


  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.whenReady().then(async () => {
  /*await session.defaultSession.loadExtension(
    path.join(__dirname, '../extensions/ublock')
  )*/

  //console.log(`Loaded extensions: ${JSON.stringify(session.defaultSession.getAllExtensions(), null, 4)}`)

  createMainWindow();

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});