import { StoreModule } from '@core/const/store';
import { ipcMessageTool } from '@core/utils/game';
import { createStore } from 'vuex';
import Game from './modules/game';
import Tank from './modules/tank';
import Trans from './modules/trans';

const store = createStore({
    modules: {
        [StoreModule.GAME]: Game,
        [StoreModule.TANK]: Tank,
        [StoreModule.TRANS]: Trans,
    },
    plugins: [
        async (store) => {
            //   应用启动时，从主进程读取状态
            (window as any).countries = {};
            const localTank = await ipcMessageTool('vuex', 'tank-read', {}, 'tank-initial-stat')
            if (localTank.status) {
                // 读取成功才进行state载入
                const localState = JSON.parse(localTank.payload);
                (window as any).countries = localState;
            }
            const localStore = await ipcMessageTool('vuex', 'vuex-read', {}, 'vuex-initial-stat')
            if (localStore.status) {
                // 读取成功才进行state载入
                const localState = JSON.parse(localStore.payload);
                store.dispatch(`${StoreModule.GAME}/initGameState`, localState[StoreModule.GAME]);
            }

             // 当状态变化时，发送状态到主进程进行存储
            store.subscribe((mutation, state) => {
                ipcMessageTool('vuex', 'vuex-write', { state: JSON.stringify(state) })
            });
        }
      ]
});


if ([ 'dev', 'development' ].includes(process.env.NODE_ENV as string)) {
    /* eslint-disable no-console */
    store.subscribe((mutation, state): void => {
        console.groupCollapsed(`%cMutation: ${mutation.type}`, 'padding: 3px 10px;color: #FFF; background: #248a24; border-radius: 50px;');
        console.log('Payload', mutation.payload);
        console.log('State', state);
        console.groupEnd();
    });
    store.subscribeAction((action, state): void => {
        console.groupCollapsed(`%cAction: ${action.type}`, 'padding: 3px 10px;color: #FFF; background: #24468a; border-radius: 50px;');
        console.log('Payload', action.payload);
        console.log('State', state);
        console.groupEnd();
    });
    /* eslint-enable no-console */
}

export default store;