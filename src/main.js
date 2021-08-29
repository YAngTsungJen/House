import { createApp } from 'vue'
import App from './App.vue'
// 讀取效果
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import router from './router'
// 要建立前後臺需用axios跟伺服器要資料
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import { currency, date } from './methods/filter'
const app = createApp(App)
app.config.globalProperties.$filters = {
  currency,
  date
}
app.use(router)
app.use(VueAxios, axios)
app.component('Loading', Loading)
app.mount('#app')
