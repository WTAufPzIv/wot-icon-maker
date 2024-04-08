export enum GameMutation {
    SET_GAME_INSTALLATIONS = 'setGameInstallations',
    SET_CURRENT_GAME_PATH = 'setCurrentGamePath',
    SET_GAME_LOADING = 'setGameLoading',
}

export enum TankMutation {
    SET_COUNTRIES = 'setCountries',
}

export enum TransMutation {
    SET_TRANS = 'setTrans',
}

export enum StoreModule {
    // 游戏安装信息
    GAME = 'GAME',
    // 坦克解包数据
    TANK = 'TANK',
    // 翻译信息
    TRANS = 'TRANS'
}