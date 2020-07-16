// 存储数据的仓库
const state = {
  codeList: [
    // // 对象模版
    // {
    //   codeId: 'test_code',
    //   list: [
    //     {
    //       id: 'cg',
    //       name: '草稿',
    //       py: ''
    //     },
    //     {
    //       id: 'sj',
    //       name: '事件',
    //       py: ''
    //     }
    //   ]
    // }
  ]
}

// 获取数据
const getters = {
}

// 异步提交数据
const actions = {

}

// 同步提交数据
const mutations = {
  // 清空码表
  flushCodeList(state) {
    state.codeList.splice(0)
  },
  // 添加码值
  pushCodeList(state, value) {
    const index = state.codeList.findIndex(code => {
      return code.codeId === value.codeId
    })
    if (index > -1) {
      // 如果有值，替换掉
      state.codeList.splice(index, 1, value)
    } else {
      state.codeList.push(value)
    }
  },
  // // 通过码表codeId获取code对象
  // getCodeById(state, codeId) {
  //   return state.codeList.find(code => {
  //     return code.codeId === codeId
  //   })
  // },
  // // 通过codeId和key获取value
  // getValueByIdAndKey(state, { codeId, id }) {
  //   const code = state.codeList.find(code => {
  //     return code.codeId === codeId
  //   })
  //   if (!code) {
  //     return ''
  //   } else {
  //     const obj = code.list.find(item => item.id === id)
  //     // console.log(obj)
  //     return obj ? obj.name : ''
  //   }
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
