import { GameName } from '@/const/game';
import { IipcMessage } from '../../const/type'

export function ipcMessageTool(namespace: string, command: string, payload: any = {}, listener: string = ''): Promise<IipcMessage> {
    if (listener) {
        return new Promise((resolve) => {
            (window as any).electron.ipcRenderer.send(namespace, command, payload);
            (window as any).electron.ipcRenderer.once(listener, (ipcMessage: IipcMessage) => {
                resolve(ipcMessage as IipcMessage);
            });
        });
    }
    (window as any).electron.ipcRenderer.send(namespace, command, payload);
    return Promise.resolve({
        status: 1,
        message: '',
        payload: {}
    });
}

export async function addGamePathByDialog(): Promise<IipcMessage> {
    return await ipcMessageTool('dialog', 'open-directory-dialog', {}, 'selected-directory')
}

export async function showErrorByDialog(title: string, message: string) {
    return await alert(message)
    // return await ipcMessageTool('dialog', 'show-error-dialog', {
    //     title,
    //     message
    // });
}

export async function isWotFolder(path: string): Promise<boolean> {
    const checkList = [
        'WorldOfTanks.exe',
        'res',
        'res_mods',
        'version.xml'
    ]
    const list = await ipcMessageTool('file', 'get-file-list', { path }, 'send-file-list')
    return list.payload && list.payload.length > 0 && checkList.every(element => list.payload.includes(element));
}

export async function parseGameInstallation(path: string) {
    const isWot = await isWotFolder(path);
    if (!isWot) throw new Error('非WOT文件夹')
    const wotVersionXml = await ipcMessageTool('file', 'read-version-xml', { path }, 'send-version-xml');
    const versionXmlRaw = JSON.parse(wotVersionXml.payload)['version.xml'];
    const { meta, version } = versionXmlRaw
    const name = meta[0].realm[0].replace(/\s/g, "");
    return {
        path,
        gameVersion: version[0],
        gameName: (GameName as any)[name]
    }
}