/* 配置参数可以通过json文件获取*/
var omsp_app_ip = 'http://192.168.31.103:8383/omsp_project_war_exploded'
// var omsp_app_ip = 'http://192.168.30.161:8201';
var omsp_app_route = '/omsp/app'
// var omsp_app_route = '';

/* userinfo*/
var omsp_app_userinfo
var omsp_app_loginid_key = 'omsp_app_loginid_key'
var omsp_app_password_key = 'omsp_app_password_key'
var omsp_app_username_key = 'omsp_app_username_key'
/* token*/
var omsp_app_token
var omsp_app_token_key = 'omsp_app_token_key'

/* 暂时不用*/
// var omsp_app_userinfo_key = 'omsp_app_userinfo_key';

// function get_omsp_app_ip() {
//     return omsp_app_ip;
// }

// function get_omsp_app_route() {
//     return omsp_app_route;
// }

function get_omsp_app_url() {
  return omsp_app_ip + omsp_app_route
}

function set_omsp_app_userinfo(loginid, password, username) {
  localStorage.setItem(omsp_app_loginid_key, loginid)
  localStorage.setItem(omsp_app_password_key, password)
  localStorage.setItem(omsp_app_username_key, username)
}

function get_omsp_app_userinfo() {
  // omsp_app_userinfo = md.getPrefs({
  //     key: omsp_app_userinfo_key,
  // });
  omsp_app_userinfo = {
    'loginid': localStorage.getItem(omsp_app_loginid_key),
    'password': localStorage.getItem(omsp_app_password_key),
    'username': localStorage.getItem(omsp_app_username_key)
  }
  return omsp_app_userinfo
}

function set_omsp_app_token(token) {
  // md.setPrefs({
  //     key: omsp_app_token_key,
  //     value: token,
  // });
  localStorage.setItem(omsp_app_token_key, token)
}

function get_omsp_app_token() {
  // omsp_app_token = md.getPrefs({
  //     key: omsp_app_token_key,
  // });
  omsp_app_token = localStorage.getItem(omsp_app_token_key)
  return omsp_app_token
}

function remove_omsp_app_password() {
  localStorage.removeItem(omsp_app_password_key)
}

function clear() {
  localStorage.removeItem(omsp_app_loginid_key)
  localStorage.removeItem(omsp_app_password_key)
  localStorage.removeItem(omsp_app_token_key)
  localStorage.removeItem(omsp_app_username_key)
}

export default {
  get_omsp_app_url,
  set_omsp_app_userinfo,
  get_omsp_app_userinfo,
  set_omsp_app_token,
  get_omsp_app_token,
  remove_omsp_app_password,
  clear
}
