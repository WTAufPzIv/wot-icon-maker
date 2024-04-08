import { TransMutation } from '@core/const/store';
import { Module, MutationTree, ActionTree } from 'vuex';
import { IRootState } from '../type';

export interface ITransState {
    trans: any,
}

export const state: ITransState = {
    trans: {},
};

export const mutations: MutationTree<ITransState> = {
    [TransMutation.SET_TRANS](state: ITransState, payload: any) {
        state.trans = payload;
    },
};

const actions: ActionTree<ITransState, IRootState> = {
    initTransState({ commit }, payload) {
        commit(TransMutation.SET_TRANS, payload || {})
    },
}

const transModule: Module<ITransState, IRootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
};
export default transModule;