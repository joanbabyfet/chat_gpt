import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
//引入路由文件
import router from './router'
//引入公共布局
import layout_default from './layouts/default.vue'
//引入element plus组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入全局方法
import { formatDate } from './utils/common'
//引入pinia
import { createPinia } from 'pinia'
//引入pinia数据持久化(保存local storage)
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
//定义全局变量
app.config.globalProperties.$formatDate = formatDate
app.use(ElementPlus)
app.use(pinia)
app.component('layout_default', layout_default) //内页布局
app.use(router)

//在 src/main.js 內引用 App.vue ，然後渲染到 public/index.html 
app.mount('#app')
