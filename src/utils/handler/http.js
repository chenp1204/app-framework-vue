import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import notification from 'ant-design-vue/es/notification'
import { Promise } from 'q'

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url // api的base_url
  timeout: 10000 // 请求超时时间
})

// 统一错误处理方法
const errorHandler = (error) => {
  let errorMsg
  if (error.response) {
    // 处理http响应错误
    const response = error.response
    switch (response.status) {
      case 401:
      case 408: {
        notification.error('登录信息无效或Token已过期,请重新登录')
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
        return
      }
      default:
        errorMsg = response.statusText
        break
    }
  } else if (error.request) {
    // 处理http请求错误
    errorMsg = error.request.message
  } else {
    // 处理其他错误
    errorMsg = error.message
  }

  // 默认错误处理，弹窗错误消息
  if (errorMsg) {
    notification.error(errorMsg)
  }

  return Promise.reject(new Error(errorMsg))
}

// request拦截器
instance.interceptors.request.use(
  config => {
    // 添加请求token
    const userToken = Vue.ls.get(ACCESS_TOKEN)
    const userId = sessionStorage.getItem('userId')
    if (userToken) {
      config.headers.common['Authorization'] = `${userId}_${userToken}`
    }
    return config
  },
  errorHandler
)

// respone拦截器
instance.interceptors.response.use(
  response => {
    // 只解析返回的json数据，非json数据直接返回整个响应
    // const contentType = response.headers['content-type'].toLowerCase()
    // if (contentType.includes('application/json')) {
    //   // 处理json数据
    //   const result = response.data
    //   if (result.code === '0000') {
    //     const data = result.data
    //     return data
    //   } else {
    //   // 接口逻辑错误
    //     const error = {
    //       response: {
    //         status: result.code,
    //         statusText: result.message
    //       }
    //     }
    //     return errorHandler(error)
    //   }
    // } else {
    //   // 非json数据直接返回
    //   return response
    // }
    return response.data
  },
  errorHandler
)

export {
  instance as http
}
