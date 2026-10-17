import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'highlight.js/styles/github.css'
import App from './App.vue'
import { router } from './router'
import { applyTheme } from './lib/theme'
import './style.css'

applyTheme()
createApp(App).use(router).mount('#app')
