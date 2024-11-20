import '@a/css/index.less'
import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index'
import { createPinia } from 'pinia'
import { useErrorLogs } from '@/hooks/useErrorLogs'

import { useRem } from './hooks/useRem'

const app = createApp(App).use(router)


useRem()
useErrorLogs()
app.use(createPinia())

app.mount('#app')
