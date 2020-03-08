import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import messager from 'ant-design-vue/es/message'
import { Promise } from 'q'
import { apiPrefix, isContainer } from '@/config'
import { userJumper } from '@/views/jumper'
// 创建axios实例
const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: apiPrefix, // api base_url // api的base_url
  timeout: 10000 // 请求超时时间
})

// 统一错误处理方法
const errorHandler = (error) => {
  let errorMsg
  if (error.response) {
    // 处理http响应错误
    const response = error.response
    switch (response.status) {
      case 401: {
        messager.error(response.data.message)
        store.dispatch('Logout')
          .then(() => {
            setTimeout(() => {
              userJumper.goLogin()
            }, 500)
          })
        return
      }
      default:
        errorMsg = response.statusText
        break
    }
  } else if (error.request) {
    // 处理http请求错误
    errorMsg = error.request.statusText || error.message
  } else {
    // 处理其他错误
    errorMsg = error.message || error
  }

  // 默认错误处理，弹窗错误消息
  if (errorMsg) {
    messager.error(errorMsg)
  }

  return Promise.reject(new Error(errorMsg))
}

// request拦截器
instance.interceptors.request.use(
  config => {
    // 添加请求token
    if (!isContainer) {
      const userToken = Vue.ls.get(ACCESS_TOKEN)
      config.headers.common['Authorization'] = userToken
    }

    return config
  },
  errorHandler
)

// respone拦截器
instance.interceptors.response.use(
  response => {
    // 只解析返回的json数据，非json数据直接返回整个响应
    const contentType = response.headers['content-type']
    if (contentType) {
      if (contentType.toLowerCase().includes('application/json')) {
        // 处理json数据
        const result = response.data
        if (result.code === '00000000') {
          return result.data
        } else {
          // 接口逻辑错误
          return errorHandler({
            response: {
              status: result.code,
              statusText: result.message
            }
          })
        }
      } else {
        // 非json数据直接返回
        return response
      }
    } else {
      return response.data || response
    }
  },
  errorHandler
)

export {
  instance as http
}