import { GameMutation, StoreModule } from '@core/const/store';
import { addGamePathByDialog, handleReloadGameData, ipcMessageTool, isWotFolder, parseGameInstallation, showErrorByDialog } from '@core/utils/game';
import { Module, MutationTree, ActionTree } from 'vuex';
import { IRootState } from '../type';

export interface IgameInstallations {
    path: string,
    gameVersion: string,
    gameName: string,
}

export interface IGameState {
    gameInstallations: Record<string, IgameInstallations>,
    current: string,
    gameLoading: boolean;
}

export const state: IGameState = {
    gameInstallations: {},
    current: '',
    gameLoading: false,
};

export const mutations: MutationTree<IGameState> = {
    [GameMutation.SET_GAME_INSTALLATIONS](state: IGameState, payload: any) {
        state.gameInstallations = payload;
    },
    [GameMutation.SET_CURRENT_GAME_PATH](state: IGameState, payload: any) {
        state.current = payload;
    },
    [GameMutation.SET_GAME_LOADING](state: IGameState, payload: any) {
        state.gameLoading = payload;
    },
};

const actions: ActionTree<IGameState, IRootState> = {
    initGameState({ commit, dispatch, state }, payload) {
        commit(GameMutation.SET_CURRENT_GAME_PATH, payload.current || '')
        commit(GameMutation.SET_GAME_INSTALLATIONS, payload.gameInstallations || [])
        if (state.current
            && Object.keys(state.gameInstallations).length > 0
            && !(window as any).countries[state.current]) {
            dispatch(`reloadGameData`);
        }
    },
    async addGameInstallation({ commit, state, dispatch }) {
        const res = await addGamePathByDialog();
        const { status, payload, message } = res;
        if (status && payload) {
            try {
                const { path, gameVersion, gameName } = await parseGameInstallation(payload);
                if (state.gameInstallations[path]) {
                    alert(`${gameName}已存在，请勿重复添加`);
                    return;
                }
                commit(GameMutation.SET_GAME_INSTALLATIONS, { ...state.gameInstallations,
                    [path]: {
                        path,
                        gameVersion,
                        gameName
                    }
                })
                if (!state.current) dispatch('changeCurrent', path);
            } catch(e) {
                console.log(e)
                showErrorByDialog("失败", "解析错误，请确保所选择的文件夹是坦克世界游戏根目录，且保证游戏完成性");
            }
            return;
        }
        if (!status) showErrorByDialog('失败', '选定的路径错误' + JSON.stringify({ '报错信息': message }));
    },
    async removeGameInstallation({ commit, state }, path) {
        const flag = JSON.parse(JSON.stringify(state.gameInstallations));
        delete flag[path];
        if (Object.keys(flag).length === 0) {
            commit(GameMutation.SET_CURRENT_GAME_PATH, '')
        } else if (state.current === path) {
            commit(GameMutation.SET_CURRENT_GAME_PATH, flag[Object.keys(flag)[0]].path)
        }
        commit(GameMutation.SET_GAME_INSTALLATIONS, { ...flag })
    },
    async checkAllGameInstallation({ state, dispatch }) {
        for (const item of Object.values(state.gameInstallations)) {
            const isWot = await isWotFolder(item.path);
            if (!isWot) {
                alert(`${item.gameName}安装目录已失效，请重新导入安装目录`);
                dispatch('removeGameInstallation', item.path);
            }
        }
    },
    async reloadGameData({ commit, state, rootState }) {
        commit(GameMutation.SET_GAME_LOADING, true);
        const res = await handleReloadGameData(state.current, state.gameInstallations[state.current].gameName);
        commit(GameMutation.SET_GAME_LOADING, false);
        if (res.status) {
            alert('游戏数据载入成功');
            (window as any).countries = {
                ...(window as any).countries,
                [state.current]: {
                    version: state.gameInstallations[state.current].gameVersion,
                    ...JSON.parse(res.payload)
                }
            }
            ipcMessageTool('vuex', 'tank-write', { tank: JSON.stringify((window as any).countries) })
        } else {
            alert('游戏数据载入失败，请检查游戏目录设置是否正确，以及游戏客户端完整性')
            commit(GameMutation.SET_CURRENT_GAME_PATH, '');
        }
    },
    changeCurrent({ commit, state, dispatch }, path) {
        commit(GameMutation.SET_CURRENT_GAME_PATH, path)
        if (state.current
            && Object.keys(state.gameInstallations).length > 0
            && !(window as any).countries[state.current]) {
            dispatch(`reloadGameData`);
        }
    },
}

const gameModule: Module<IGameState, IRootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
};
export default gameModule;