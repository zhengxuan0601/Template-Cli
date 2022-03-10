import Vue from 'vue'
import App from './App'
import store from './store'
import CustomHeadNav from '@/components/CustomHeadNav'
import NoData from '@/components/NoData'
import '@/assets/iconfont/iconfont.css'
Vue.config.productionTip = false
Vue.config.silent = false
Vue.component('CustomHeadNav', CustomHeadNav)
Vue.component('NoData', NoData)
App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})

app.$mount()
