import '@a/css/index.less'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index'
import { createPinia } from 'pinia'

const app = createApp(App).use(router)

app.use(createPinia())

app.mount('#app')
