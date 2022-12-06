/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { createRouter, createWebHashHistory } from 'vue-router'
import axios from '@/request';


const routes = [
  { path: '/', redirect: '/Records' },
  { path: '/Records', component: () => import('./components/Records.vue'), },
  { path: '/Inbox', component: () => import('./components/Inbox.vue'), },
  { path: '/Starred', component: () => import('./components/Starred.vue'), },
  { path: '/Setting', component: () => import('./components/Setting.vue'), },
  { path: '/About', component: () => import('./components/About.vue'), },
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
