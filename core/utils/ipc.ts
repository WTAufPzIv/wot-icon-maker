import { ipcMain, BrowserWindow, dialog, shell } from 'electron'
import { IipcMessage } from '../const/type';
import { extractWotFile, parserWotFile, readAndParseXML } from './files';
import { STORE_PATH, TANK_PATH } from '../const/path'
const path = require('path')
const fs = require('fs');

function createSuccessIpcMessage(payload: any): IipcMessage {
  return {
    status: 1,
    payload,
    message: '',
  }
}

function createFailIpcMessage(message: string): IipcMessage {
  return {
    status: 0,
    payload: null,
    message,
  }
}

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
  // 弹窗调用监听
  ipcMain.on('dialog', (event, command, args) => {
    switch (command) {
      case 'open-directory-dialog':
        dialog.showOpenDialog(mainWindow, {
          properties: ['openDirectory']
        }).then(result => {
          if (!result.canceled && result.filePaths.length > 0) {
            // 发送所选文件夹的路径回渲染进程
            event.sender.send('selected-directory', createSuccessIpcMessage(result.filePaths[0]));
          }
          event.sender.send('selected-directory', createSuccessIpcMessage(''));
        }).catch(err => {
          event.sender.send('selected-directory', createFailIpcMessage(err));
        });
        break;
      case 'show-error-dialog':
        const { title, message } = args;
        dialog.showErrorBox(title, message);
        break;
    }
  })
  // 文件读取监听
  ipcMain.on('file', async (event, command, args) => {
    switch (command) {
      case 'read-version-xml':
        try {
          const { path: wotpath } = args;
          const filePath = path.join(wotpath, 'version.xml');
          const xmlObject = await readAndParseXML(filePath);
          event.sender.send('send-version-xml', createSuccessIpcMessage(JSON.stringify(xmlObject)));
          return;
        } catch (error) {
          console.error('读取或解析XML文件时出错:', error);
          event.sender.send('send-version-xml', createFailIpcMessage('读取或解析XML文件时出错'));
          return null; // 或者根据需要返回错误信息
        }
      case 'get-file-list':
        try {
          const { path: wotpath } = args;
          const files = fs.readdirSync(wotpath);
          event.sender.send('send-file-list', createSuccessIpcMessage(files));
          return
        } catch (error) {
          console.error('读取文件列表时出错:', error);
          event.sender.send('send-file-list', createFailIpcMessage('读取文件列表时出错'));
          return
        }
      case 'open-folder':
        const { path: wotpath } = args;
        shell.openPath(wotpath)
          .then(() => {
            console.log('Folder opened successfully');
          })
          .catch(err => {
            console.error('Error opening folder:', err);
          });
          break;
        case 'reload-wot-data':
          const { basePath, gameName } = args;
          try {
            await extractWotFile(basePath);
            const wotData = await parserWotFile(gameName);
            event.sender.send('reload-wot-data-done', createSuccessIpcMessage(wotData));
          } catch(err) {
            console.log(err)
            event.sender.send('reload-wot-data-done', createFailIpcMessage('读取客户端数据失败'));
          }
          break;
      }
  });
  // vuex持久化存储监听
  ipcMain.on('vuex', async (event, command, args) => {
    switch (command) {
      case 'vuex-write':
        const { state } = args;
        fs.writeFile(STORE_PATH, state, (err: any) => {
          if (err) {
            event.reply('vuex-error', err);
          }
        });
        break;
      case 'tank-write':
          const { tank } = args;
          fs.writeFile(TANK_PATH, tank, (err: any) => {
            if (err) {
              event.reply('tank-error', err);
            }
          });
          break;
      case 'vuex-read':
        fs.readFile(STORE_PATH, (err: any, data: any) => {
          if (err) {
            // 如果文件不存在，则初始化为空对象或默认状态
            if (err.code === 'ENOENT') {
              event.sender.send('vuex-initial-stat', createFailIpcMessage('文件不存在'));
            } else {
              // 其他错误类型，返回错误信息
              event.sender.send('vuex-initial-stat', createFailIpcMessage(JSON.stringify(err)));
            }
            return;
          }
          event.sender.send('vuex-initial-stat', createSuccessIpcMessage(data.toString()));
        });
        break;
      case 'tank-read':
        fs.readFile(TANK_PATH, (err: any, data: any) => {
          if (err) {
            // 如果文件不存在，则初始化为空对象或默认状态
            if (err.code === 'ENOENT') {
              event.sender.send('tank-initial-stat', createFailIpcMessage('文件不存在'));
            } else {
              // 其他错误类型，返回错误信息
              event.sender.send('tank-initial-stat', createFailIpcMessage(JSON.stringify(err)));
            }
            return;
          }
          event.sender.send('tank-initial-stat', createSuccessIpcMessage(data.toString()));
        });
    }
  });
}