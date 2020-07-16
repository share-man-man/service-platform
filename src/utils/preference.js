let omsp_app_userinfo
const omsp_app_loginid_key = 'omsp_app_loginid_key'
const omsp_app_password_key = 'omsp_app_password_key'
const omsp_app_username_key = 'omsp_app_username_key'
// token
let omsp_app_token
const omsp_app_token_key = 'omsp_app_token_key'
// 消息通知
let omsp_app_notifications
const omsp_app_notifications_key = 'omsp_app_notifications_key'
// 偏好设置
const omsp_app_config_key = 'omsp_app_config_key'
// 历史查询记录
const omsp_app_search_history_key = 'omsp_app_search_history_key'

function set_omsp_app_notifications(notifications) {
  localStorage.setItem(omsp_app_notifications_key, notifications)
}

function get_omsp_app_notifications() {
  omsp_app_notifications = localStorage.getItem(omsp_app_notifications_key)
  return omsp_app_notifications
}

function set_omsp_app_userinfo(loginid, password, username) {
  localStorage.setItem(omsp_app_loginid_key, loginid)
  localStorage.setItem(omsp_app_password_key, password)
  localStorage.setItem(omsp_app_username_key, username)
}

function get_omsp_app_userinfo() {
  omsp_app_userinfo = {
    'loginid': localStorage.getItem(omsp_app_loginid_key),
    'password': localStorage.getItem(omsp_app_password_key),
    'username': localStorage.getItem(omsp_app_username_key)
  }
  return omsp_app_userinfo
}

function set_omsp_app_token(token) {
  localStorage.setItem(omsp_app_token_key, token)
}

function get_omsp_app_token() {
  omsp_app_token = localStorage.getItem(omsp_app_token_key)
  return omsp_app_token
}

function remove_omsp_app_password() {
  localStorage.removeItem(omsp_app_password_key)
}

function setConfig(value) {
  localStorage.setItem(omsp_app_config_key, value)
}

function getConfig() {
  return localStorage.getItem(omsp_app_config_key)
}

function getSearchHistory() {
  return JSON.parse(localStorage.getItem(omsp_app_search_history_key)) || []
}
function pushSearchHistory(vlaue) {
  const historyList = getSearchHistory()
  const index = historyList.findIndex(item => { return item === vlaue })
  if (index > -1) {
    historyList.splice(index, 1)
  }
  historyList.unshift(vlaue)
  localStorage.setItem(omsp_app_search_history_key, JSON.stringify(historyList))
}
function clearSearchHistory() {
  localStorage.removeItem(omsp_app_search_history_key)
}

function clear() {
  localStorage.removeItem(omsp_app_loginid_key)
  localStorage.removeItem(omsp_app_password_key)
  localStorage.removeItem(omsp_app_token_key)
  localStorage.removeItem(omsp_app_username_key)
  localStorage.removeItem(omsp_app_search_history_key)
}

export {
  getSearchHistory,
  pushSearchHistory,
  clearSearchHistory
}

export default {
  set_omsp_app_userinfo,
  get_omsp_app_userinfo,
  set_omsp_app_token,
  get_omsp_app_token,
  set_omsp_app_notifications,
  get_omsp_app_notifications,
  remove_omsp_app_password,
  setConfig,
  getConfig,
  clear
}
