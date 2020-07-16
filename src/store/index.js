import Vue from 'vue'
import Vuex from 'vuex'

// 码表
import code from './moudles/code'
// 个人中心模块
import user from './moudles/user'
// 页面模块
import page from './moudles/page'
// 统计
import statistic from './moudles/statistic'
// 菜单
import menu from './moudles/menu'
// 任务
import task from './moudles/task'

Vue.use(Vuex)

// 在开发者模式下启用严格模式，生产环境为提高效率就不用
const debug = (process.env.NODE_ENV === 'development')

export default new Vuex.Store({
  /* 引入模块*/
  modules: {
    code,
    user,
    page,
    statistic,
    menu,
    task
  },
  strict: debug
})
