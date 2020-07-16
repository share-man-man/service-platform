// 存储数据的仓库
const state = {
  // 是否展示菜单
  showMenuFlag: false,
  //  菜单标签dot
  dot: false,
  allMenu: {
    message: { info: 0 }
  }
}

// 获取数据
const getters = {
  getDot(state) {
    return Object.entries(state.allMenu).some(item => {
      return item[1]['info'] > 0
    })
  }
}

// 异步提交数据
const actions = {

}

// 同步提交数据
const mutations = {
  setShowMenuFlag(state, value) {
    state.showMenuFlag = value
  },
  // // 设置菜单dot
  // setDot(state, value) {
  //   state.dot = !value
  // },
  // 设置菜单info
  setMenuInfo(state, { name, info }) {
    state.allMenu[name]['info'] = info
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
