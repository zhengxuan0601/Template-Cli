import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/init.css'
import loadingDirective from '@/directives/loading'
import ClickOutside from '@/directives/clickoutside'
const app = createApp(App)
app.directive('loading', loadingDirective)
app.directive('clickoutside', ClickOutside)
app.use(store).use(router).mount('#app')
