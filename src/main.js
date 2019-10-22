// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

// 初始化器
import initializer from '@/core/initializer'

// 引导启动
import './core/bootstrap'

// mock
import './mock'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created: initializer,
  render: h => h(App)
}).$mount('#app')
