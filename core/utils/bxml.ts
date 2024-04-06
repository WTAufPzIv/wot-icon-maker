const fs = require('fs');
const path = require('path')
import { app } from 'electron'

const type = {
    Dict: 0,
    String: 1,
    Int: 2,
    Float: 3,
    Bool: 4,
    Base64: 5
}

// 从文件中读取1个字节的数据
export async function ReadByte(fd: number, start: number = 0, buffer: Buffer | null = null): Promise<number> {
    return new Promise((res, rej) => {
        const bufferFor1Bit: Buffer = Buffer.alloc(1); // 创建一个1字节的Buffer
        fs.read(fd, buffer || bufferFor1Bit, start, 1, start, (err: any, bytesRead: number, buffer: Buffer) => {
            if (err) {
                rej('ReadByte Error')
            }

            const value = buffer[0];
            res(value)
        });
    })
}

// 从流中读取下一个四字节无符号整数，并将其作为32位无符号整数返回
// 按照二进制方式从流中读取4个字节，并将其解释为一个32位的无符号整数。
export async function ReadUInt32(fd: number) {
    return new Promise((res, rej) => {
        const buffer: Buffer = Buffer.alloc(4); // 创建一个4字节的Buffer
        fs.read(fd, buffer, 0, 4, 0, (err: any, bytesRead: number, buffer: Buffer) => {
            if (err) {
                rej('ReadUInt32 Error')
            }
        
            // 将Buffer中的数据解释为32位无符号整数
            const value = buffer.readUInt32LE(0); // 使用小端序解析无符号整数
            res(value)
        });
    })
}

// 读取零终止的字节数组
// 虽然不知道为什么这么做，但理解下来就是用一个一维数组去抄录一个二维数组，小循环抄录二维数组每一行的字节，大循环抄录二维数组的一整行
// 小循环以这一行的零终止字节为结束
// 大循环以数组的空行为结束（这一行第一个字节为零终止字节，视为空行）
// 抄录的每一行转换为utf8编码存储在strings数组中
function readNextByte(fd: number): Promise<string[]> {
    return new Promise((res, rej) => {
        const strings: string[] = [];
        // 创建一个长度为128的字节数组
        let bytes = Buffer.alloc(128);
        // 读取每一条字符串的游标
        let length = 0;
        // 读取文件流的游标
        let cursor = 5;
        const readNext = async (fd: number) => {
            fs.read(fd, bytes, length, 1, cursor, (err: any, bytesRead: number) => {
                cursor++;
                if (err) {
                    rej('ReadByte Error')
                }
                if (bytes[length] === 0) {
                    // 遇到零终止字节，解码为UTF-8字符串并添加到数组中
                    // const str = new TextDecoder().decode(new Uint8Array(bytes.buffer, 0, length));
                    const str = bytes.slice(0, length).toString()
                    strings.push(str);
                    if (length === 0) {
                        // 遇到零长度字符串，结束循环
                        res(strings);
                    } else {
                        // 重置长度，继续读取下一个字符串
                        length = 0;
                        readNext(fd);
                    }
                } else {
                    // 继续读取下一个字节
                    length++;
                    if (length >= bytes.length) {
                        // 如果缓冲区不够大，扩展缓冲区大小
                        const newBytes = Buffer.alloc(bytes.length * 2);
                        bytes.copy(newBytes);
                        bytes = newBytes;
                    }
                    readNext(fd);
                }
            });
        };
        readNext(fd)
    })
}

// 流中读取下一个两字节有符号整数，并将其作为一个16位整数返回
// 按照二进制方式从流中读取2个字节，并将其解释为一个16位的有符号整数
export function ReadInt16(fd: number): Promise<number> {
    return new Promise((res, rej) => {
        const buffer: Buffer = Buffer.alloc(2); // 创建一个2字节的Buffer
        fs.read(fd, buffer, 0, 2, 0, (err: any, bytesRead: number, buffer: Buffer) => {
            if (err) {
                rej('readDict Error')
            }
        
            // 将Buffer中的数据解释为16位有符号整数
            const value = buffer.readInt16LE(0); // 使用小端序解析无符号整数
            res(value)
        });
    })
}

// 从流中读取下一个四字节有符号整数，并将其作为一个32位整数返回
// 按照二进制方式从流中读取4个字节，并将其解释为一个32位的有符号整数
export function ReadInt32(fd: number): Promise<number> {
    return new Promise((res, rej) => {
        const buffer: Buffer = Buffer.alloc(4); // 创建一个4字节的Buffer
        fs.read(fd, buffer, 0, 4, 0, (err: any, bytesRead: number, buffer: Buffer) => {
            if (err) {
                rej('readDict Error')
            }
        
            // 将Buffer中的数据解释为32位有符号整数
            const value = buffer.readInt32LE(0); // 使用小端序解析无符号整数
            res(value)
        });
    })
}

// export async function readDict(fd: number, strings: string[]) {
//     const childCount = await ReadInt16(fd);
//     const endAndType = await ReadInt32(fd);
//     const ownValueLength = endAndType & 0x0fffffff;
//     const ownValueType = endAndType >> 28
//     if (ownValueType == type.Dict) {
//         throw new Error('readDict Error')
//     }
//     console.log(childCount, endAndType, ownValueType);
//     const prevEnd = ownValueLength;

//     const childrenList = [];

//     for (let dummy = 0; dummy < childCount; dummy ++) {
//         const name = strings[reader.ReadInt16()];
//         endAndType = reader.ReadInt32();
//         var end = endAndType & 0x0fffffff;
//         var length = end - prevEnd;
//         prevEnd = end;
//         childrenList.push({ name, length, type: endAndType >> 28 });
//     }
// }

export function bXmlReader(fd: number) {
    return new Promise(async (res, rej) => {
        // 检查文件头部，是否是xml文件
        const fileTypeCheck = await ReadUInt32(fd);
        if (fileTypeCheck !== 0x62A14E45) {
            rej('This file does not look like a valid binary-xml file')
        }

        const strs = await readNextByte(fd);
        const txtPath = path.join(app.getPath('userData'), '1.txt');
        fs.writeFileSync(txtPath, strs.toString());
        // await readDict(fd, strs)
        res(1);
    })
}