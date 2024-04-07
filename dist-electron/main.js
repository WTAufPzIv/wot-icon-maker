"use strict";
const electron = require("electron");
const countries = [
  "ussr",
  "germany",
  "usa",
  "france",
  "china",
  "uk",
  "japan",
  "czech",
  "sweden",
  "poland",
  "italy"
];
const path$2 = require("path");
const PathSourceVehicle = "/res/packages/scripts.pkg|scripts/item_defs/vehicles/";
const STORE_PATH = path$2.join(electron.app.getPath("userData"), "store.json");
const WOT_EXTRACT_PATH = path$2.join(electron.app.getPath("userData"), "extract");
const VEHICLES_PATH = "/vehicles";
const fs$2 = require("fs");
require("path");
async function ReadBytes(fd, length = 1, needBuffer = false) {
  return new Promise((res, rej) => {
    const buffer = Buffer.alloc(length);
    fs$2.read(fd, buffer, 0, length, null, (err, bytesRead, buffer2) => {
      if (err) {
        rej("ReadByte Error" + err);
      }
      if (needBuffer) {
        res(buffer2);
      } else {
        const str = buffer2.slice(0, length).toString();
        res(str);
      }
    });
  });
}
async function ReadUInt32(fd) {
  return new Promise((res, rej) => {
    const buffer = Buffer.alloc(4);
    fs$2.read(fd, buffer, 0, 4, null, (err, bytesRead, buffer2) => {
      if (err) {
        rej("ReadUInt32 Error" + err);
      }
      const value = buffer2.readUInt32LE(0);
      res(value);
    });
  });
}
function ReadSingle(fd) {
  return new Promise((res, rej) => {
    const buffer = Buffer.alloc(4);
    fs$2.read(fd, buffer, 0, 4, null, (err, bytesRead, buffer2) => {
      if (err) {
        rej("ReadSingle Error" + err);
      }
      const value = buffer2.readFloatLE(0);
      res(value);
    });
  });
}
function ReadInt8(fd) {
  return new Promise((res, rej) => {
    const buffer = Buffer.alloc(1);
    fs$2.read(fd, buffer, 0, 1, null, (err, bytesRead, buffer2) => {
      if (err) {
        rej("ReadInt8 Error" + err);
      }
      const value = buffer2.readInt8(0);
      res(value);
    });
  });
}
function ReadInt16(fd) {
  return new Promise((res, rej) => {
    const buffer = Buffer.alloc(2);
    fs$2.read(fd, buffer, 0, 2, null, (err, bytesRead, buffer2) => {
      if (err) {
        rej("ReadInt16 Error" + err);
      }
      const value = buffer2.readInt16LE(0);
      res(value);
    });
  });
}
function ReadInt32(fd) {
  return new Promise((res, rej) => {
    const buffer = Buffer.alloc(4);
    fs$2.read(fd, buffer, 0, 4, null, (err, bytesRead, buffer2) => {
      if (err) {
        rej(`ReadInt32 Error: ${err}`);
      }
      const value = buffer2.readInt32LE(0);
      res(value);
    });
  });
}
function readNextByte(fd) {
  return new Promise((res, rej) => {
    const strings = [];
    let bytes = Buffer.alloc(128);
    let length = 0;
    const readNext = async (fd2) => {
      fs$2.read(fd2, bytes, length, 1, null, (err) => {
        if (err) {
          rej("readNextByte Error");
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
async function readDict(fd, strings) {
  return new Promise(async (res) => {
    const childCount = await ReadInt16(fd);
    let endAndType = await ReadInt32(fd);
    const ownValueEnd = endAndType & 268435455;
    const ownLength = ownValueEnd;
    const ownValueType = endAndType >> 28;
    let ppp = ownValueEnd;
    if (ownValueType === 0) {
      throw new Error("readDict Error: 字典值错误，不应该为字典");
    }
    const childrenList = [];
    for (const item of new Array(childCount)) {
      const index = await ReadInt16(fd);
      const name = strings[index];
      endAndType = await ReadInt32(fd);
      const end = endAndType & 268435455;
      const length = end - ppp;
      ppp = end;
      childrenList.push({
        name,
        length,
        type: endAndType >> 28
      });
    }
    const result = {};
    if (ownLength > 0 || ownValueType !== 1) {
      result[""] = await readData(fd, strings, ownValueType, ownLength);
    }
    for (const child of childrenList) {
      result[child.name] = await readData(fd, strings, child.type, child.length);
    }
    res(result);
  });
}
async function readData(fd, strings, type, length) {
  switch (type) {
    case 0:
      return await readDict(fd, strings);
    case 1:
      return await ReadBytes(fd, length);
    case 2:
      switch (length) {
        case 0:
          return 0;
        case 1:
          return await ReadInt8(fd);
        case 2:
          return await ReadInt16(fd);
        case 4:
          return await ReadInt32(fd);
        default:
          throw new Error("readData Error: Unexpected length for Int. error length:  " + length);
      }
    case 3:
      const floats = [];
      for (const item of new Array(length / 4)) {
        floats.push(await ReadSingle(fd));
      }
      if (floats.length === 1)
        return floats[0];
      return floats;
    case 4:
      if (length === 0)
        return 0;
      if (length === 1) {
        const flag = await ReadInt8(fd);
        if (flag === 1)
          return 1;
        return 0;
      }
      throw new Error("readData Error: boolean Error");
    case 5:
      const b64 = (await ReadBytes(fd, length, true)).toString("base64");
      return b64;
    default:
      throw new Error("readData Error: Unknown type. error type: " + type);
  }
}
function bXmlReader(fd) {
  return new Promise(async (res, rej) => {
    const fileTypeCheck = await ReadUInt32(fd);
    if (fileTypeCheck !== 1654738501) {
      rej("This file does not look like a valid binary-xml file");
    }
    await ReadBytes(fd, 1);
    const strs = await readNextByte(fd);
    const raw = await readDict(fd, strs);
    res(raw);
  });
}
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
async function extractWotFile(basePath) {
  await deleteTargetFolder(WOT_EXTRACT_PATH);
  const pkgPath = PathSourceVehicle.split("|")[0];
  const pkgEntryPath = PathSourceVehicle.split("|")[1];
  const zip = new StreamZip.async({ file: basePath + pkgPath });
  await zip.extract(pkgEntryPath, WOT_EXTRACT_PATH + VEHICLES_PATH);
}
function loadTanks(country) {
  return new Promise((res, rej) => {
    fs$1.open(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/list.xml`, "r", async (err, fd) => {
      if (err) {
        rej("parserWotFile Error");
        return;
      }
      const tanks = await bXmlReader(fd);
      fs$1.close(fd, (err2) => {
        if (err2) {
          rej("parserWotFile Error");
        }
      });
      res(tanks);
    });
  });
}
function loadEngines(country) {
  return new Promise((res, rej) => {
    fs$1.open(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/components/engines.xml`, "r", async (err, fd) => {
      if (err) {
        rej("parserWotFile Error");
        return;
      }
      const engines = await bXmlReader(fd);
      fs$1.close(fd, (err2) => {
        if (err2) {
          rej("parserWotFile Error");
        }
      });
      res(engines);
    });
  });
}
function loadGuns(country) {
  return new Promise((res, rej) => {
    fs$1.open(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/components/guns.xml`, "r", async (err, fd) => {
      if (err) {
        rej("parserWotFile Error");
        return;
      }
      const guns = await bXmlReader(fd);
      fs$1.close(fd, (err2) => {
        if (err2) {
          rej("parserWotFile Error");
        }
      });
      res(guns);
    });
  });
}
function loadShells(country) {
  return new Promise((res, rej) => {
    fs$1.open(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/components/shells.xml`, "r", async (err, fd) => {
      if (err) {
        rej("parserWotFile Error");
        return;
      }
      const shells = await bXmlReader(fd);
      fs$1.close(fd, (err2) => {
        if (err2) {
          rej("parserWotFile Error");
        }
      });
      res(shells);
    });
  });
}
function loadRadios(country) {
  return new Promise((res, rej) => {
    fs$1.open(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/components/radios.xml`, "r", async (err, fd) => {
      if (err) {
        rej("parserWotFile Error");
        return;
      }
      const radios = await bXmlReader(fd);
      fs$1.close(fd, (err2) => {
        if (err2) {
          rej("parserWotFile Error");
        }
      });
      res(radios);
    });
  });
}
async function parserWotFile() {
  return new Promise(async (res, rej) => {
    const Countries = {};
    for (const item of countries) {
      Countries[item] = {
        tanks: await loadTanks(item),
        engines: await loadEngines(item),
        guns: await loadGuns(item),
        radios: await loadRadios(item),
        shells: await loadShells(item)
      };
    }
    res(JSON.stringify(Countries));
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
          const wotData = await parserWotFile();
          event.sender.send("reload-wot-data-done", createSuccessIpcMessage(wotData));
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
