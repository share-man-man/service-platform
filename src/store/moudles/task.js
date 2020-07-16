const state = {
  // 当前tab页码
  tabNum: 0,
  //  待办数量
  DB: { info: 0 },
  //  已办数量
  YB: { info: 0 },
  //  办结数量
  BJ: { info: 0 },
  //  草稿数量
  CG: { info: 0 }
}

// 获取数据
const getters = {
  allTaskInfo(state) {
    return (state.DB.info + state.YB.info + state.BJ.info + state.CG.info)
  }
}

// 异步提交数据
const actions = {
  SET_INFO({ commit }, obj) {
    commit('setInfo', obj)
  },
  SET_TAB_NUM({ commit }, num) {
    commit('setTabNum', num)
  }
}

// 同步提交数据
const mutations = {
  // 设置info数据
  setInfo(state, { name, value }) {
    state[name].info = value
  },
  setTabNum(state, num) {
    state.tabNum = num
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
