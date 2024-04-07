const path = require('path')
import { app } from 'electron'

// 游戏相关路径
export const PATH_res_mods = '/res_mods/{version}'
export const PathSourceVehicle = '/res/packages/scripts.pkg|scripts/item_defs/vehicles/';
export const PathVehicleList = 'vehicles/${country}/list.xml';
// 车辆模块数据path
// 炮塔和履带中的数据没啥东西，可以直接在list中获得，因此没有
export const PathGuns = 'vehicles/${country}/components/guns.xml';
export const PathEngines = 'vehicles/${country}/engines.xml';
export const PathRadios = 'vehicles/${country}/radios.xml';
export const PatShellss = 'vehicles/${country}/shells.xml';
// export const Path

// 程序app data相关路径
export const STORE_PATH = path.join(app.getPath('userData'), 'store.json');
export const WOT_EXTRACT_PATH = path.join(app.getPath('userData'), 'extract');
export const VEHICLES_PATH = '/vehicles';
export const MO_PATH = '/mo';