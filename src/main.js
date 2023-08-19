import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import  VueCookies  from 'vue-cookies'
import { vMaska } from 'maska'

import App from './App.vue'
import router from './router'

const app = createApp(App)


import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.directive("maska", vMaska)
app.use(ElementPlus)
app.use(VueCookies, {expires: '1h'})
app.use(createPinia())
app.use(router)
app.mount('#app')
