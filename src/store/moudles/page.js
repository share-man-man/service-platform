// 页面管理
const state = {
  // 缓存页面名称
  cachePageName: [],
  refreshIndex: false,
  // mock数据
  mockDataList: []
}

// 获取计算属性
const getters = {
}

// 异步提交数据
const actions = {
  // SIG_IN(context) {
  //   context.commit('sigIn')
  // },
  // SIG_OUT(context) {
  //   context.commit('sigOut')
  // },
  REMOVE_CACHE_PAGE_NAME(context, value) {
    context.commit('removeCachePageName', value)
  },

  ADD_MOCK_DATA(context, value) {
    context.commit('addMockData', value)
  }
}

// 同步提交数据
const mutations = {
  // // 登陆后缓存首页和搜索页
  // sigIn(state, value) {
  //   state.cachePageName.push(...['OmspIndex'])
  // },
  // sigOut(state, value) {
  //   state.cachePageName.splice(0)
  // },
  // 添加缓存页面
  addCachePageName(state, value) {
    if (state.cachePageName.indexOf(value) < 0) {
      state.cachePageName.push(value)
    }
  },
  // 删除缓存页面
  removeCachePageName(state, value) {
    state.cachePageName.splice(state.cachePageName.indexOf(value), 1)
  },
  // 刷新首页
  refreshIndex(state, value) {
    state.refreshIndex = value
  },
  // 添加mock数据
  addMockData(state, value) {
  // 如果数组中没有改url和data，就push进去
    const flag = state.mockDataList.some(item => {
      return (JSON.stringify(item.data) === JSON.stringify(value.data) && item.url === value.url)
    })

    if (!flag) {
      state.mockDataList.push(value)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
