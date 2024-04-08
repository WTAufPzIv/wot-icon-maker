// 捋一下毛子加密后的xml反序列化逻辑,以下面这个为例
// <root>
//     0
//     <a>1</a>
//     <b>
//         <c></c>
//     </b>
// </root>
// 转换为json为下面的形式
// // {
//     "": 0 // 最外层自带值，非子节点
//     a: 1,
//     b: {
//         c: 'a'
//     }
// }
// 上述对象被序列化后在文件中大概是这样：
// 描述字段：包含了一段数据的长度、类型、隶属于拿个索引名称等信息
// (索引集合：abc)
// (root层描述：类型number；长度1字节) (root层子节点描述：(a的描述：类型number；长度1字节)(b的描述：类型字典；长度n字节))
// (root层数据：0) (root层子节点a数据：1) (root层子节点b数据：(b层描述： 类型string，长度0字节)(b层子节点描述：(c的描述：类型string，长度1字节))(b层数据：无自带数据)(b层c节点数据：'a')))
// 反序列化上述的过程
const fs = require('fs');

enum typeEnum {
    Dict = 0,
    String = 1,
    Int = 2,
    Float = 3,
    Bool = 4,
    Base64 = 5
}

// 从文件中读取1个字节的数据(默认一个字节)，并返回这个字节
export async function ReadByte(fd: number): Promise<number> {
    return new Promise((res, rej) => {
        const buffer: Buffer = Buffer.allocUnsafe(1); // 创建一个1字节的Buffer
        fs.read(fd, buffer, 0, 1, null, (err: any, bytesRead: number, buffer: Buffer) => {
            if (err) {
                rej('ReadByte Error' + err)
            }
            const byte = buffer[0]
            res(byte)
        });
    })
}

// 从文件中读取n个字节的数据(默认一个字节)，默认返回编码后的字符串，如果传入needBuffer，则返回原始buffer
export async function ReadBytes(fd: number, length: number = 1, needBuffer: boolean = false): Promise<string | Buffer> {
    return new Promise((res, rej) => {
        const buffer: Buffer = Buffer.allocUnsafe(length); // 创建一个n字节的Buffer
        fs.read(fd, buffer, 0, length, null, (err: any, bytesRead: number, buffer: Buffer) => {
            if (err) {
                rej('ReadByte Error' + err)
            }
            if (needBuffer) {
                res(buffer);
            } else {
                const str = buffer.slice(0, length).toString()
                res(str)
            }
        });
    })
}

// 从流中读取下一个四字节无符号整数，并将其作为32位无符号整数返回
// 按照二进制方式从流中读取4个字节，并将其解释为一个32位的无符号整数。
export async function ReadUInt32(fd: number) {
    return new Promise((res, rej) => {
        const buffer: Buffer = Buffer.allocUnsafe(4); // 创建一个4字节的Buffer
        fs.read(fd, buffer, 0, 4, null, (err: any, bytesRead: number, buffer: Buffer) => {
            if (err) {
                rej('ReadUInt32 Error' + err)
            }
            // 将Buffer中的数据解释为32位无符号整数
            const value = buffer.readUInt32LE(0); // 使用小端序解析无符号整数
            res(value)
        });
    })
}

// 从流中读取下一个四字节单精度浮点数，并将其作为一个32位单精度浮点数
// 按照二进制方式从流中读取4个字节，并将其解释为一个32位的单精度浮点数
export function ReadSingle(fd: number): Promise<number> {
    return new Promise((res, rej) => {
        const buffer: Buffer = Buffer.allocUnsafe(4); // 创建一个4字节的Buffer
        fs.read(fd, buffer, 0, 4, null, (err: any, bytesRead: number, buffer: Buffer) => {
            if (err) {
                rej('ReadSingle Error' + err)
            }
            // 将Buffer中的数据解释为32位单精度浮点数
            const value = buffer.readFloatLE(0);
            res(value)
        });
    })
}

// 流中读取下一个一字节有符号整数，并将其作为一个8位整数返回
// 按照二进制方式从流中读取1个字节，并将其解释为一个8位的有符号整数
export function ReadInt8(fd: number): Promise<number> {
    return new Promise((res, rej) => {
        const buffer: Buffer = Buffer.allocUnsafe(1); // 创建一个1字节的Buffer
        fs.read(fd, buffer, 0, 1, null, (err: any, bytesRead: number, buffer: Buffer) => {
            if (err) {
                rej('ReadInt8 Error' + err)
            }
            // 将Buffer中的数据解释为8位有符号整数
            const value = buffer.readInt8(0); // 使用小端序解析无符号整数
            res(value)
        });
    })
}

// 流中读取下一个两字节有符号整数，并将其作为一个16位整数返回
// 按照二进制方式从流中读取2个字节，并将其解释为一个16位的有符号整数
export function ReadInt16(fd: number): Promise<number> {
    return new Promise((res, rej) => {
        const buffer: Buffer = Buffer.allocUnsafe(2); // 创建一个2字节的Buffer
        fs.read(fd, buffer, 0, 2, null, (err: any, bytesRead: number, buffer: Buffer) => {
            if (err) {
                rej('ReadInt16 Error' + err)
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
        const buffer: Buffer = Buffer.allocUnsafe(4); // 创建一个4字节的Buffer
        fs.read(fd, buffer, 0, 4, null, (err: any, bytesRead: number, buffer: Buffer) => {
            if (err) {
                rej(`ReadInt32 Error: ${err}`)
            }
            // 将Buffer中的数据解释为32位有符号整数
            const value = buffer.readInt32LE(0); // 使用小端序解析无符号整数
            res(value)
        });
    })
}

// 读取零终止的字节数组
// 用一个一维数组去抄录一个二维数组，小循环抄录二维数组每一行的字节，大循环抄录二维数组的一整行
// 小循环以这一行的零终止字节为结束
// 大循环以数组的空行为结束（这一行第一个字节为零终止字节，视为空行）
// 抄录的每一行转换为utf8编码存储在strings数组中
function readNextByte(fd: number): Promise<string[]> {
    return new Promise((res, rej) => {
        const strings: string[] = [];
        // 创建一个长度为128的字节数组
        let bytes = Buffer.allocUnsafe(128);
        // 读取每一条字符串的游标
        let length = 0;
        // 读取文件流的游标
        const readNext = async (fd: number) => {
            fs.read(fd, bytes, length, 1, null, (err: any) => {
                if (err) {
                    rej('readNextByte Error')
                }
                if (bytes[length] === 0) {
                    // 遇到零终止字节，解码为UTF-8字符串并添加到数组中
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
                        const newBytes = Buffer.allocUnsafe(bytes.length * 2);
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

// 从二进制读取器的当前位置读取类型字典的值。请注意，除了多个子元素之外，字典还可能有一个“自己的”值，该值永远不是字典，并且该函数将其存储在空字符串键中
// 类似下面这种情况,父节点a自带一个值123，以及一个子节点b
// 注意：在这个逻辑下，父节点a的自带值可以是除字典类型外的任何值。（因为里面的字典被视为“子节点”，而不是“值”）
// <a>123<b>456</b></a>
export async function readDict(fd: number, strings: string[]): Promise<any> {
    // 读取字典的子节点数量
    const childCount = await ReadInt16(fd);
    // 读取字典的自身值的长度和数据类型
    let endAndType = await ReadInt32(fd);
    const ownValueEnd = endAndType & 0x0fffffff;
    const ownLength = ownValueEnd;
    const ownValueType = endAndType >> 28
    let ppp = ownValueEnd
    if (ownValueType === typeEnum.Dict) {
        throw new Error('readDict Error: 字典值错误，不应该为字典')
    }

    // 读取每一个子节点的信息：键值、长度、数据类型
    const childrenList = [];
    for (const item of new Array(childCount)) {
        const index = await ReadInt16(fd);
        const name = strings[index];
        endAndType = await ReadInt32(fd);
        const end = endAndType & 0x0fffffff;
        const length = end - ppp;
        ppp = end;
        childrenList.push({
            name: name,
            length: length,
            type: endAndType >> 28
        });
    }

    // 读取字典的自身值的内容
    const result: any = {};
    if (ownLength > 0 || ownValueType !== typeEnum.String) {
        result[""] = await readData(fd, strings, ownValueType, ownLength);
    }

    // 读取子节点的内容
    for(const child of childrenList) {
        result[child.name] = await readData(fd, strings, child.type, child.length);
    }
    return result;
}

export async function readData(fd: number, strings: string[], type: number, length: number) {
    switch(type) {
        case typeEnum.Dict:
            return await readDict(fd, strings);
        case typeEnum.String:
            return await ReadBytes(fd, length);
        case typeEnum.Int:
            switch(length) {
                case 0:
                    return 0;
                case 1:
                    return await ReadInt8(fd);
                case 2:
                    return await ReadInt16(fd);
                case 4:
                    return await ReadInt32(fd);
                default:
                    throw new Error('readData Error: Unexpected length for Int. error length:  ' + length)
            }
        case typeEnum.Float:
            const floats: number[] = [];
            for (const item of new Array(length / 4)) {
                floats.push(await ReadSingle(fd));
            }
            if (floats.length === 1) return floats[0];
            return floats;
        case typeEnum.Bool:
            // md这个地方曾经写了个bug，解了一整天，望周知
            if (length === 0) return 0;
            // 上面这个逻辑多读了一次，导致position位置炸了
            if (length === 1) {
                const flag = await ReadInt8(fd);
                if (flag === 1) return 1;
                return 0;
            }
            throw new Error('readData Error: boolean Error')
        case typeEnum.Base64:
            const b64 = (await ReadBytes(fd, length, true) as Buffer).toString('base64'); // weird one: bytes -> base64 where the base64 looks like a normal string
            return b64;
        default:
            throw new Error("readData Error: Unknown type. error type: " + type);
    }
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


export async function bXmlReader(fd: number) {
    // 检查文件头部，是否是xml文件
    const fileTypeCheck = await ReadUInt32(fd);
    if (fileTypeCheck !== 0x62A14E45) {
       throw new Error('This file does not look like a valid binary-xml file')
    }

    // 读取一次文件流，让position前进一位
    await ReadBytes(fd, 1);

    // 读取索引集合
    const strs = await readNextByte(fd);
    // 读取字典内容，原理见最上面
    const raw = await readDict(fd, strs)
    await fsClose(fd);
    return raw;
}