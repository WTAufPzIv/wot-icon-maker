import xml2js from 'xml2js'
const fs = require('fs');

// 读取并解析XML文件的函数
export function readAndParseXML(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            xml2js.parseString(data, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    });
}

// 解压缩坦克世界客户端文件并保存至app data中
