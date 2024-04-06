const path = require('path')
import { app } from 'electron'

// 游戏相关路径
export const PATH_res_mods = '/res_mods/{version}'
export const PATH_vehicle_list = '/res/packages/scripts.pkg|scripts/item_defs/vehicles/';
// export const Path

// 程序app data相关路径
export const STORE_PATH = path.join(app.getPath('userData'), 'store.json');
export const WOT_EXTRACT_PATH = path.join(app.getPath('userData'), 'extract');