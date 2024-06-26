import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import store from './store';

const app = createApp(App)
app.config.performance = true;

router.app = app;
app
    .use(router)
    .use(store)
    .use(Antd)
    .mount('#app');

(window as any).$store = store;