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

const app = createApp(App)
app.use(ElementPlus)
app.component('layout_default', layout_default) //内页布局
app.use(router)

//在 src/main.js 內引用 App.vue ，然後渲染到 public/index.html 
app.mount('#app')
