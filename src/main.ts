import '@a/css/index.less'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index'
import { createPinia } from 'pinia'
import { useErrorLogs } from '@/hooks/useErrorLogs'

const app = createApp(App).use(router)

useErrorLogs()
app.use(createPinia())

app.mount('#app')
