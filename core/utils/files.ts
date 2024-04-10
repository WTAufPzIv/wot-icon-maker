import { countries, GameName } from "../const/game";
import { ATLASES_PATH, PathSourceAtlases, PathSourceVehicle, VEHICLES_PATH, WOT_EXTRACT_PATH } from "../const/path";
import { bXmlReader } from "./bxml";
import { dialog } from 'electron';
const path = require('path')

const xml2js = require('xml2js')
const fs = require('fs');
const fsPromise = require('fs/promises')
const StreamZip = require('node-stream-zip');

let bxmlPromise: any = [];

const readedTrans: any = {}

// 读取并解析XML文件的函数
export function readAndParseXML(filePath: string, Binary: boolean = false) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err: any, data: any) => {
            if (err) {
                reject(err);
                return;
            }         
            xml2js.parseString(data, (err: any, result: any) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    });
}

// 删除文件夹
// 删除文件夹的函数
export function deleteTargetFolder(folderPath: string) {
    return new Promise((res) => {
        fs.rm(folderPath, { recursive: true, force: true }, (err: any) => {
            if (err) {
                console.error('deleteTargetFolder fail', err);
                    res(0)
                }
            res(1)
        });
    })
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 解压缩坦克世界客户端文件并保存至app data中
export async function extractWotFile(basePath: string) {
    await deleteTargetFolder(WOT_EXTRACT_PATH)
    const pkgPath = PathSourceVehicle.split('|')[0];
    const pkgEntryPath = PathSourceVehicle.split('|')[1];
    const zip = new StreamZip.async({ file: basePath + pkgPath });
    await zip.extract(pkgEntryPath, WOT_EXTRACT_PATH + VEHICLES_PATH);
    const atlasesPath = PathSourceAtlases.split('|')[0];
    const atlasesEntryPath = PathSourceAtlases.split('|')[1];
    const atlasesZip = new StreamZip.async({ file: basePath + atlasesPath });
    await fsPromise.mkdir(WOT_EXTRACT_PATH + ATLASES_PATH)
    await atlasesZip.extract(atlasesEntryPath, WOT_EXTRACT_PATH + ATLASES_PATH);
}

function fsOpen(path: string): Promise<number> {
    return new Promise((res, rej) => {
        fs.open(path, 'r', async (err: any, fd: number) => {
            if (err) {
                rej('parserWotFile Error');
                return;
            }
            res(fd);
        });
    })
}

async function loadTankList(country: string): Promise<any> {
    try {
        const fd = await fsOpen(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/list.xml`);
        const tankList = await bXmlReader(fd) as any;
        return tankList;
    } catch (err) {
        throw new Error('parserWotFile Error' + err);
    }
}
async function loadTankItem(country: string, tankName: string): Promise<Promise<any>> {
    try {
        const fd = await fsOpen(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/${tankName}.xml`);
        return await bXmlReader(fd)
    } catch (err) {
        throw new Error('parserWotFile Error');
    }
}
async function loadGuns(country: string): Promise<any> {
    try {
        const fd = await fsOpen(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/components/guns.xml`);
        return await bXmlReader(fd)
    } catch (err) {
        throw new Error('parserWotFile Error');
    }
}

async function loadAllTanks(country: string, trans: any): Promise<any> {
    const promises: any = [];
    const tanklist = await loadTankList(country);
    const tankGuns = await loadGuns(country);
    Object.entries(tanklist).forEach(([key, value]: any) => {
        if (key !== "" && key !== 'xmlns:xmlref') {
            promises.push(loadTankItem(country, key));
        }
        else {
            promises.push(new Promise(res => { res({}) }))
        }
    })
    const tankMainInfos = await Promise.all(promises);
    const tankFullList: any = {};
    Object.entries(tanklist).forEach(([ key, value ]: any, index) => {
        if (key && key !== 'xmlns:xmlref') {
            const mainInfo = { ...tankMainInfos[index] };
            const Turrets = Object.keys(mainInfo.turrets0);
            const TopTurretName = Turrets[Turrets.length - 1]
            const topTurret = mainInfo.turrets0[TopTurretName];
            const Guns = Object.keys(topTurret.guns);
            const TopGunName = Guns[Guns.length - 1]
            const shells: any = Object.values(tankGuns.shared[TopGunName].shots);
            tankFullList[key] = {
                ...value,
                ...tankMainInfos[index],
                shell1: shells[0].piercingPower.split(' ')[0],
                shell2: shells[1]?.piercingPower?.split(' ')[0],
                visibility: topTurret.circularVisionRadius,
                tankId: key,
            }
            const name = tankFullList[key].shortUserString || tankFullList[key].userString
            if (name) {
                const realName = name.split(':')[1];
                readedTrans[realName] = trans[realName];
                tankFullList[key].namefortrans = trans[realName];
            }
        }
    })
    return {
        [country]: tankFullList
    };
}
async function loadEngines(country: string): Promise<any> {
    try {
        const fd = await fsOpen(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/components/engines.xml`);
        return await bXmlReader(fd)
    } catch (err) {
        throw new Error('parserWotFile Error');
    }
}
function loadShells(country: string): Promise<any> {
    return new Promise((res, rej) => {
        fs.open(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/components/shells.xml`, 'r', async (err: any, fd: number) => {
            if (err) {
                rej('parserWotFile Error');
                return;
            }
            bxmlPromise.push(bXmlReader(fd))
            // fs.close(fd, (err: any) => {
            //     if (err) {
            //         rej('parserWotFile Error');
            //     }
            // });
            res(0);
        });
    })
}
function loadRadios(country: string): Promise<any> {
    return new Promise((res, rej) => {
        fs.open(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/components/radios.xml`, 'r', async (err: any, fd: number) => {
            if (err) {
                rej('parserWotFile Error');
                return;
            }
            bxmlPromise.push(bXmlReader(fd))
            // fs.close(fd, (err: any) => {
            //     if (err) {
            //         rej('parserWotFile Error');
            //     }
            // });
            res(0);
        });
    })
}
// 读取数据
export async function parserWotFile(gameName: string) {
    const promises = [];
    const wg = fs.readFileSync(path.join(__dirname, '../trans/wg.json'), 'utf8');
    const lesta = fs.readFileSync(path.join(__dirname, '../trans/lesta.json'), 'utf8')
    let wgObj;
    if (gameName === GameName.RU) {
        wgObj = JSON.parse(lesta);
    } else {
        wgObj = JSON.parse(wg);
    }
    for (const item of countries) {
        promises.push(loadAllTanks(item, wgObj))
        // promises.push(loadEngines(item))
        // promises.push(loadGuns(item))
        // promises.push(loadRadios(item))
        // promises.push(loadShells(item))
    }
    const CountriesRawData: any = await Promise.all(promises);
    const Countries: any = {}
    CountriesRawData.forEach((item: any) => {
        Object.entries(item).forEach(([key, value]) => {
            Countries[key] = value
        })
    })
    fs.writeFile(path.join(__dirname, '../trans/new-lesta.json'), JSON.stringify(readedTrans), () => {})
    return JSON.stringify(Countries);
}

// 保存图片和 XML 文件
export function saveFiles(imageDataUrl: string, xmlContent: string, defaultFilename = 'battleAtlases') {
  // 显示自定义文件保存对话框
  return new Promise((res, rej) => {
    dialog.showSaveDialog({
        defaultPath: defaultFilename,
        filters: [
          { name: 'All Files', extensions: ['*'] }
        ]
      }).then(async (result) => {
        if (!result.canceled && result.filePath) {
          const filePath = result.filePath;
          
          // 将 data URL 转换为二进制数据
          const base64Data: any = imageDataUrl.split(';base64,').pop();
          const imageBuffer = Buffer.from(base64Data, 'base64');
    
          // 写入图片文件
          await fsPromise.writeFile(filePath + '.dds', imageBuffer);
    
          // 写入 XML 文件
          await fsPromise.writeFile(filePath + '.xml', xmlContent);
          res(1);
        }
      }).catch((err: any) => {
        rej('Error saving files:' + err)
      });
  })
}