import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'






import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueCookies } from 'vue-cookies'

import App from './App.vue'
import router from './router'

const app = createApp(App)


import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// app.use(VueCookies, {expires: '1d'})
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')
