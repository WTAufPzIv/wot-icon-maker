"use strict";
const electron = require("electron");
const path$3 = require("path");
const PATH_vehicle_list = "/res/packages/scripts.pkg|scripts/item_defs/vehicles/";
const STORE_PATH = path$3.join(electron.app.getPath("userData"), "store.json");
const WOT_EXTRACT_PATH = path$3.join(electron.app.getPath("userData"), "extract");
const VEHICLES_PATH = "/vehicles";
const fs$2 = require("fs");
const path$2 = require("path");
async function ReadUInt32(fd) {
  return new Promise((res, rej) => {
    const buffer = Buffer.alloc(4);
    fs$2.read(fd, buffer, 0, 4, 0, (err, bytesRead, buffer2) => {
      if (err) {
        rej("ReadUInt32 Error");
      }
      const value = buffer2.readUInt32LE(0);
      res(value);
    });
  });
}
function readNextByte(fd) {
  return new Promise((res, rej) => {
    const strings = [];
    let bytes = Buffer.alloc(128);
    let length = 0;
    let cursor = 5;
    const readNext = async (fd2) => {
      fs$2.read(fd2, bytes, length, 1, cursor, (err, bytesRead) => {
        cursor++;
        if (err) {
          rej("ReadByte Error");
        }
        if (bytes[length] === 0) {
          const str = bytes.slice(0, length).toString();
          strings.push(str);
          if (length === 0) {
            res(strings);
          } else {
            length = 0;
            readNext(fd2);
          }
        } else {
          length++;
          if (length >= bytes.length) {
            const newBytes = Buffer.alloc(bytes.length * 2);
            bytes.copy(newBytes);
            bytes = newBytes;
          }
          readNext(fd2);
        }
      });
    };
    readNext(fd);
  });
}
function bXmlReader(fd) {
  return new Promise(async (res, rej) => {
    const fileTypeCheck = await ReadUInt32(fd);
    if (fileTypeCheck !== 1654738501) {
      rej("This file does not look like a valid binary-xml file");
    }
    const strs = await readNextByte(fd);
    const txtPath = path$2.join(electron.app.getPath("userData"), "1.txt");
    fs$2.writeFileSync(txtPath, strs.toString());
    res(1);
  });
}
require("binary-xml");
const xml2js = require("xml2js");
const fs$1 = require("fs");
const StreamZip = require("node-stream-zip");
function readAndParseXML(filePath, Binary = false) {
  return new Promise((resolve, reject) => {
    fs$1.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      xml2js.parseString(data, (err2, result) => {
        if (err2) {
          reject(err2);
          return;
        }
        resolve(result);
      });
    });
  });
}
function deleteTargetFolder(folderPath) {
  return new Promise((res) => {
    fs$1.rm(folderPath, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error("deleteTargetFolder fail", err);
        res(0);
      }
      res(1);
    });
  });
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function extractWotFile(basePath) {
  await deleteTargetFolder(WOT_EXTRACT_PATH);
  await sleep(2e3);
  const pkgPath = PATH_vehicle_list.split("|")[0];
  const pkgEntryPath = PATH_vehicle_list.split("|")[1];
  const zip = new StreamZip.async({ file: basePath + pkgPath });
  await zip.extract(pkgEntryPath, WOT_EXTRACT_PATH + VEHICLES_PATH);
}
async function parserWotFile() {
  return new Promise((res, rej) => {
    fs$1.open(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/china/components/guns.xml`, "r", async (err, fd) => {
      if (err) {
        rej("parserWotFile Error");
        return;
      }
      await bXmlReader(fd);
      fs$1.close(fd, (err2) => {
        if (err2) {
          rej("parserWotFile Error");
        }
      });
      res(1);
    });
  });
}
const path$1 = require("path");
const fs = require("fs");
function createSuccessIpcMessage(payload) {
  return {
    status: 1,
    payload,
    message: ""
  };
}
function createFailIpcMessage(message) {
  return {
    status: 0,
    payload: null,
    message
  };
}
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
  electron.ipcMain.on("dialog", (event, command, args) => {
    switch (command) {
      case "open-directory-dialog":
        electron.dialog.showOpenDialog(mainWindow, {
          properties: ["openDirectory"]
        }).then((result) => {
          if (!result.canceled && result.filePaths.length > 0) {
            event.sender.send("selected-directory", createSuccessIpcMessage(result.filePaths[0]));
          }
          event.sender.send("selected-directory", createSuccessIpcMessage(""));
        }).catch((err) => {
          event.sender.send("selected-directory", createFailIpcMessage(err));
        });
        break;
      case "show-error-dialog":
        const { title, message } = args;
        electron.dialog.showErrorBox(title, message);
        break;
    }
  });
  electron.ipcMain.on("file", async (event, command, args) => {
    switch (command) {
      case "read-version-xml":
        try {
          const { path: wotpath2 } = args;
          const filePath = path$1.join(wotpath2, "version.xml");
          const xmlObject = await readAndParseXML(filePath);
          event.sender.send("send-version-xml", createSuccessIpcMessage(JSON.stringify(xmlObject)));
          return;
        } catch (error) {
          console.error("读取或解析XML文件时出错:", error);
          event.sender.send("send-version-xml", createFailIpcMessage("读取或解析XML文件时出错"));
          return null;
        }
      case "get-file-list":
        try {
          const { path: wotpath2 } = args;
          const files = fs.readdirSync(wotpath2);
          event.sender.send("send-file-list", createSuccessIpcMessage(files));
          return;
        } catch (error) {
          console.error("读取文件列表时出错:", error);
          event.sender.send("send-file-list", createFailIpcMessage("读取文件列表时出错"));
          return;
        }
      case "open-folder":
        const { path: wotpath } = args;
        electron.shell.openPath(wotpath).then(() => {
          console.log("Folder opened successfully");
        }).catch((err) => {
          console.error("Error opening folder:", err);
        });
        break;
      case "reload-wot-data":
        const { basePath } = args;
        try {
          await extractWotFile(basePath);
          await parserWotFile();
          event.sender.send("reload-wot-data-done", createSuccessIpcMessage("读取完成"));
        } catch {
          event.sender.send("reload-wot-data-done", createFailIpcMessage("读取客户端数据失败"));
        }
        break;
    }
  });
  electron.ipcMain.on("vuex", async (event, command, args) => {
    switch (command) {
      case "vuex-write":
        const { state } = args;
        fs.writeFile(STORE_PATH, state, (err) => {
          if (err) {
            event.reply("vuex-error", err);
          }
        });
        break;
      case "vuex-read":
        fs.readFile(STORE_PATH, (err, data) => {
          if (err) {
            if (err.code === "ENOENT") {
              event.sender.send("vuex-initial-stat", createFailIpcMessage("文件不存在"));
            } else {
              event.sender.send("vuex-initial-stat", createFailIpcMessage(JSON.stringify(err)));
            }
            return;
          }
          event.sender.send("vuex-initial-stat", createSuccessIpcMessage(data.toString()));
        });
    }
  });
};
const path = require("path");
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
electron.app.whenReady().then(async () => {
  createWindow();
});
