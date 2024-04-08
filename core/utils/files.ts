import { countries } from "../const/game";
import { PathSourceVehicle, VEHICLES_PATH, WOT_EXTRACT_PATH } from "../const/path";
import { bXmlReader } from "./bxml";

const xml2js = require('xml2js')
const fs = require('fs');
const StreamZip = require('node-stream-zip');

let bxmlPromise: any = [];

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
    // await sleep(100);
    const pkgPath = PathSourceVehicle.split('|')[0];
    const pkgEntryPath = PathSourceVehicle.split('|')[1];
    const zip = new StreamZip.async({ file: basePath + pkgPath });
    await zip.extract(pkgEntryPath, WOT_EXTRACT_PATH + VEHICLES_PATH);
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
function fsClose(fd: number): Promise<string> {
    return new Promise((res, rej) => {
        fs.close(fd, async (err: any, fd: number) => {
            if (err) {
                rej('parserWotFile Error');
                return;
            }
            res('1');
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
async function loadTankItem(country: string, tankName: string, pre: any): Promise<Promise<any>> {
    try {
        const fd = await fsOpen(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/${tankName}.xml`);
        bxmlPromise.push(bXmlReader(fd))
        return 0
    } catch (err) {
        throw new Error('parserWotFile Error');
    }
}

async function loadAllTanks(country: string): Promise<any> {
    const promises = [];
    const tanklist = await loadTankList(country);
    for (const [key, value] of (Object.entries(tanklist) as any)) {
        if (key === 'xmlns:xmlref' || !key) continue;
        promises.push(loadTankItem(country, key, value));
    }
    const t = Promise.all(promises);
    return t;
}
function loadEngines(country: string): Promise<any> {
    return new Promise((res, rej) => {
        fs.open(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/components/engines.xml`, 'r', async (err: any, fd: number) => {
            if (err) {
                rej('parserWotFile Error');
                return;
            }
            // const engines = await bXmlRe
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
function loadGuns(country: string): Promise<any> {
    return new Promise((res, rej) => {
        fs.open(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/${country}/components/guns.xml`, 'r', async (err: any, fd: number) => {
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
export async function parserWotFile() {
    const promises = [];
    for (const item of countries) {
        promises.push(loadAllTanks(item))
        // promises.push(loadEngines(item))
        // promises.push(loadGuns(item))
        // promises.push(loadRadios(item))
        // promises.push(loadShells(item))
    }
    const Countries: any = await Promise.all(promises);
    const CountriesVlaue: any = await Promise.all(bxmlPromise);
    // res(JSON.stringify(Countries));
    return JSON.stringify({});
}