import * as Vue from 'vue';
import { createWebHashHistory, createRouter, Router } from 'vue-router';
import homeComponent from '../pages/home/index.vue';
import editorComponent from '../pages/editor/index.vue';
import setupComponent from '../pages/home/setup/index.vue';
import overviewComponent from '../pages/home/overview/index.vue';

// vite直接使用动态path无法解析，https://github.com/vitejs/vite/discussions/2746
// const dashboardModules =
//     Object.assign(
//         {},
//         import.meta.glob('../pages/data-dashboard/*.vue'),
//         import.meta.glob('../pages/data-dashboard/*/*.vue'),
//     );
export interface IRouter extends Router {
    app?: Vue.App<Element>;
}

const router: IRouter = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            component: homeComponent,
            children: [
                {
                    name: 'icon.overview',
                    path: '/',
                    meta: {
                        title: '总览',
                    },
                    component: overviewComponent,
                },
                // {
                //     name: 'icon.preview',
                //     path: '/preview',
                //     meta: {
                //         title: '图标预览',
                //     },
                //     component: () => import(/* webpackChunkName:"overview" */ '../pages/home/preview/index.vue'),
                // },
                {
                    name: 'icon.setup',
                    path: '/setup',
                    meta: {
                        title: '设置',
                    },
                    component: setupComponent,
                },
            ]
        },
        {
            name: 'editor',
            path: '/editor',
            component: editorComponent,
        }
    ]
})


// router.beforeEach(scrollToTop);

export default router;
