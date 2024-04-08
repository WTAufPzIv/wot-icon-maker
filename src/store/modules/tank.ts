import { TankMutation } from '@core/const/store';
import { Module, MutationTree, ActionTree } from 'vuex';
import { IRootState } from '../type';

export interface ITankState {
    countries: any,
}

const state: ITankState = {
    countries: {},
};

const getters = {
    getCountries: () => {
        return (window as any).countries || {}
    }
}

const mutations: MutationTree<ITankState> = {
    [TankMutation.SET_COUNTRIES](state: ITankState, payload: any) {
        state.countries = {};
        // nnd直接存在window下得了，反正不需要响应式
        (window as any).countries = payload
    },
};

const actions: ActionTree<ITankState, IRootState> = {
    initTankState({ commit }, payload) {
        commit(TankMutation.SET_COUNTRIES, payload || {})
    },
}

const tankModule: Module<ITankState, IRootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
export default tankModule;