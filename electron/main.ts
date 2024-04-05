import path from 'path'
import { BrowserWindow, app, session } from 'electron'
import ipc from './ipc'

const vueDevToolsPath = path.resolve(__dirname, '../extension/vue-devtools')

let win: BrowserWindow

const createWindow = () => {
    win = new BrowserWindow({
        autoHideMenuBar: true,
        frame: false,
        minWidth: 1500,
        minHeight: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, '../src/preload.js'), //预加载
        },
    })
    process.env.VITE_DEV_SERVER_URL && win.loadURL('http://localhost:3000') || win.loadFile('dist/index.html')
    ipc(win);
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
        win.webContents.openDevTools();
    }
}

// app.whenReady().then(createWindow)

app.whenReady().then(async () => {
    // if (process.env.NODE_ENV === 'development') {
    //     await session.defaultSession.loadExtension(vueDevToolsPath)
    // }
    createWindow();
});

//   // 加载构建后的Vue应用，并指定路由
//   const appPath = `file://${path.join(__dirname, '../dist/index.html#/your-route-path')}`;
//   modal.loadURL(appPath);
// }