import '@/assets/main.css'

import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Antd from 'ant-design-vue'
import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)
const unHeadInstance = createHead()

app.use(router)
   .use(unHeadInstance)
   .use(Antd)
   .use(autoAnimatePlugin)
   .mount('#app')
