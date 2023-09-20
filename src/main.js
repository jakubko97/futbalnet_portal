import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.config.productionTip = false

import 'material-design-icons-iconfont/dist/material-design-icons.css'

import '@/plugins/axios.js'
import '@/plugins/utils.js'
import router from './router'

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
