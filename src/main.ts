/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import Records from './components/Records.vue'
import Inbox from './components/Inbox.vue'
import Starred from './components/Starred.vue'
import Setting from './components/Setting.vue'
import About from './components/About.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    { path: '/', redirect: '/Records' },
    { path: '/Records', component: Records },
    { path: '/Inbox', component: Inbox },
    { path: '/Starred', component: Starred },
    { path: '/Setting', component: Setting },
    { path: '/About', component: About },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

const app = createApp(App)

registerPlugins(app)

app.use(router).mount('#app')
