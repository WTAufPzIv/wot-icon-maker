import { PATH_vehicle_list, VEHICLES_PATH, WOT_EXTRACT_PATH } from "../const/path";
import { bXmlReader } from "./bxml";
const BinaryXML = require('binary-xml');

const xml2js = require('xml2js')
const fs = require('fs');
const StreamZip = require('node-stream-zip');

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
    await sleep(2000);
    const pkgPath = PATH_vehicle_list.split('|')[0];
    const pkgEntryPath = PATH_vehicle_list.split('|')[1];
    const zip = new StreamZip.async({ file: basePath + pkgPath });
    await zip.extract(pkgEntryPath, WOT_EXTRACT_PATH + VEHICLES_PATH);
}

// 读取数据
export async function parserWotFile() {
    return new Promise((res, rej) => {
        fs.open(`${WOT_EXTRACT_PATH + VEHICLES_PATH}/china/components/guns.xml`, 'r', async (err: any, fd: number) => {
            if (err) {
                rej('parserWotFile Error');
                return;
            }
            await bXmlReader(fd);
            fs.close(fd, (err: any) => {
                if (err) {
                    rej('parserWotFile Error');
                }
            });
            res(1)
        });
    })
}