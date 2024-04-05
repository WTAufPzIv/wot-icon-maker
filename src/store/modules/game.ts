import { GameMutation } from '@/const/store';
import { addGamePathByDialog, isWotFolder, parseGameInstallation, showErrorByDialog } from '@/utils/game';
import { Module, MutationTree, ActionTree } from 'vuex';
import { IRootState } from '../type';

export interface IgameInstallations {
    path: string,
    gameVersion: string,
    gameName: string,
}

export interface IGameState {
    gameInstallations: IgameInstallations[],
    current: string
}

export const state: IGameState = {
    gameInstallations: [],
    current: '',
};

export const mutations: MutationTree<IGameState> = {
    [GameMutation.SET_GAME_INSTALLATIONS](state: IGameState, payload: any) {
        state.gameInstallations = payload;
    },
    [GameMutation.SET_CURRENT_GAME_PATH](state: IGameState, payload: any) {
        state.current = payload;
    },
};

const actions: ActionTree<IGameState, IRootState> = {
    initGameState({ commit }, payload) {
        commit(GameMutation.SET_CURRENT_GAME_PATH, payload.current || '')
        commit(GameMutation.SET_GAME_INSTALLATIONS, payload.gameInstallations || [])
    },
    async addGameInstallation({ commit, state }) {
        const res = await addGamePathByDialog();
        const { status, payload, message } = res;
        if (status && payload) {
            try {
                const { path, gameVersion, gameName } = await parseGameInstallation(payload);
                if (!state.current) state.current = path;
                if (state.gameInstallations.find(item => item.path === path)) {
                    alert(`${gameName}已存在，请勿重复添加`);
                    return;
                }
                commit(GameMutation.SET_GAME_INSTALLATIONS, [ ...state.gameInstallations, {
                    path,
                    gameVersion,
                    gameName
                }])
            } catch(e) {
                console.log(e)
                showErrorByDialog("失败", "解析错误，请确保所选择的文件夹是坦克世界游戏根目录，且保证游戏完成性");
            }
            return;
        }
        if (!status) showErrorByDialog('失败', '选定的路径错误' + JSON.stringify({ '报错信息': message }));
    },
    async removeGameInstallation({ commit, state }, path) {
        const flag = state.gameInstallations.filter(item => {
            return item.path !== path
        });
        if (flag.length === 0) state.current = '';
        if (state.current === path) state.current = flag[0].path
        commit(GameMutation.SET_GAME_INSTALLATIONS, [...flag])
    },
    async checkAllGameInstallation({ state, dispatch }) {
        for (const item of state.gameInstallations) {
            const isWot = await isWotFolder(item.path);
            if (!isWot) {
                alert(`${item.gameName}安装目录已失效，请重新导入安装目录`);
                dispatch('removeGameInstallation', item.path);
            }
        }
    },
    changeCurrent({ commit }, path) {
        commit(GameMutation.SET_CURRENT_GAME_PATH, path)
    }
}

const gameModule: Module<IGameState, IRootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
};
export default gameModule;