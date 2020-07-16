import preferenceJs from '../../utils/preference'
// 存储数据的仓库
const state = {
  // 开启消息提示，默认为false
  notifications: true,
  // 登录后的token
  token: ''
}

// 获取数据
const getters = {
  getNotifications(state) {
    return state.notifications
  }
}

// 异步提交数据
const actions = {

}

// 同步提交数据
const mutations = {
  setToken(state, value) {
    state.token = value
    preferenceJs.set_omsp_app_token(value)
  },
  setNotifications(state, value) {
    state.notifications = value
    preferenceJs.set_omsp_app_notifications(value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
