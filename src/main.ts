import { createApp } from 'vue'
import App from './App.vue'
import '@a/css/index.less'
import router from './routes/index'

createApp(App).use(router).mount('#app')
