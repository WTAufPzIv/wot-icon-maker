"use strict";
const path = require("path");
const electron = require("electron");
function createModalWindow(mainWindow) {
  let modal = new electron.BrowserWindow({
    parent: mainWindow,
    // 设置父窗口
    modal: true,
    // 设置为模态窗口
    show: true,
    // 初始时不显示窗口
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
      // 根据需要调整这些选项
    },
    autoHideMenuBar: true,
    width: 1500,
    height: 1e3,
    minWidth: 1500,
    minHeight: 1e3
  });
  modal.loadURL("http://localhost:3000/#/editor");
  modal.once("ready-to-show", () => {
    modal.show();
  });
}
const ipc = (mainWindow) => {
  electron.ipcMain.on("window-control", (event, command) => {
    switch (command) {
      case "minimize":
        mainWindow.minimize();
        break;
      case "maximize-restore":
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
        break;
      case "close":
        mainWindow.close();
        break;
      case "open-editor":
        createModalWindow(mainWindow);
    }
  });
};
let win;
const createWindow = () => {
  win = new electron.BrowserWindow({
    autoHideMenuBar: true,
    frame: false,
    minWidth: 1500,
    minHeight: 1e3,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "../src/preload.js")
      //预加载
    }
  });
  process.env.VITE_DEV_SERVER_URL && win.loadURL("http://localhost:3000") || win.loadFile("dist/index.html");
  ipc(win);
  if (process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true") {
    win.webContents.openDevTools();
  }
};
electron.app.whenReady().then(() => {
  createWindow();
});
