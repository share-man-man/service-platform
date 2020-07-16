import Vue from 'vue'
import App from './App'
import { router } from './router'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import qs from 'qs'
import store from './store'
import OmspRequest from './utils/request'
import config from './utils/config'
import { getCodeName } from './utils'
// 引入富文本
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// 轻提示
import { Toast } from 'vant'

// 全局注册axios
Vue.use(Vueaxios, axios)
// 全局注册ckeditor
Vue.use(CKEditor)
// 全局注册轻提示
Vue.use(Toast)

Vue.prototype.$OmspClassicEditor = ClassicEditor
// json格式转form
Vue.prototype.$qs = qs
// 封装axios
Vue.prototype.$OmspRequest = OmspRequest
// 自定义配置js
Vue.prototype.$OmspConfig = config
// 码表方法
Vue.prototype.$OmspGetCodeName = getCodeName

new Vue({
  router,
  el: '#app',
  store,
  render: h => h(App)
})
