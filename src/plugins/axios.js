import Vue from 'vue'
import { http } from '@/utils/handler/http'

Vue.axios = http

const installer = {
  vm: {},
  install (Vue) {
    Object.defineProperties(Vue.prototype, {
      axios: {
        get: function get () {
          return http
        }
      },
      $http: {
        get: function get () {
          return http
        }
      }
    })
  }
}

// mount axios Vue.$http and this.$http
Vue.use(installer)
