import { ipcMain, BrowserWindow } from 'electron'

function createModalWindow(mainWindow: BrowserWindow) {
  let modal = new BrowserWindow({
      parent: mainWindow, // 设置父窗口
      modal: true, // 设置为模态窗口
      show: true, // 初始时不显示窗口
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false, // 根据需要调整这些选项
      },
      autoHideMenuBar: true,
      width: 1500,
      height: 1000,
      minWidth: 1500,
      minHeight: 1000,
  });

  modal.loadURL('http://localhost:3000/#/editor'); // 加载子窗口内容
  modal.once('ready-to-show', () => {
      modal.show(); // 当页面加载完成后显示窗口
  });
}

export default (mainWindow: BrowserWindow) => {
    // 窗口控制监听
  ipcMain.on('window-control', (event, command) => {
    switch (command) {
      case 'minimize':
        mainWindow.minimize();
        break;
      case 'maximize-restore':
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
        break;
      case 'close':
        mainWindow.close();
        break;
      case 'open-editor':
        createModalWindow(mainWindow)
    }
  });
}