import axios from 'axios'
// import store from '../store/index'
import qs from 'qs'
import preference from './preference'

import store from '../store'

import { getData as getMockData } from './mock/mock'

// 创建请求服务
const service = axios.create({
  baseURL: process.env.VUE_APP_RESTURL, // 请求根路径
  timeout: 10000, // 超时时间
  headers: { token: '' }
})

// 设置请求拦截器
service.interceptors.request.use(
  config => {
    // if(store.state.user.token){
    // config.headers['token']=store.state.user.token
    // config.headers['token']=preference.get_omsp_app_token()
    // }
    config.headers['token'] = preference.get_omsp_app_token()
    return config
  },
  error => {
    // console.log(error)
    return Promise.reject(error)
  }
)

// 设置返回拦截器
service.interceptors.response.use(
  response => {
    // console.log(response)
    const code = response.data.code
    if (code === 200) {
      // 收集mock数据
      if (process.env.VUE_APP_BASEDATA === 'collect') {
        store.dispatch('page/ADD_MOCK_DATA', {
          response: {
            data: response.data.data
          },
          url: response.config.url,
          data: response.config.data
        })
      }
      /* 后台数据处理出错*/
      if (response.data.errors) {
        return Promise.reject(response.data.errors)
      } else {
        return response.data
      }
    } else {
      return Promise.reject('请求失败，请检查网络')
    }
  }
)

// 默认请求配置
const requestOption = {
  url: '',
  method: 'post',
  data: ''
}

function sendRequest(confirmParam) {
  // 将json格式转为form格式
  confirmParam.data = qs.stringify(confirmParam.data)
  // 合并对象，覆盖默认配置
  const finalParam = { ...requestOption, ...confirmParam }
  // 开发环境和运行环境的请求路径不一样
  finalParam.url = (requestOption.url + confirmParam.url)

  // mockData
  if (process.env.VUE_APP_BASEDATA === 'mock') {
    return new Promise(resolve => {
      resolve(getMockData(confirmParam))
    })
  }

  return service(finalParam)
}

export default {
  sendRequest
}
