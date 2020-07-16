// // 统计
// const state = {
//     startDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
//     endDate: new Date(),
//     // startDate:'',
//     // endDate:'',
//     gridData: {
//         CG: 2,/*草稿*/
//         TJ: 0,/*提交*/
//         DB: 0,/*待办*/
//         BJ: 0,/*办结*/
//         YB: 0,/*以办*/
//     },
//     //事件统计
//     incident: {},
// }
//
// // 获取计算属性
// const getters = {
//     //开始时间格式化
//     getterStartDate: (state) => {
//         const start = state.startDate
//         return `${start.getFullYear()}-${start.getMonth() < 9 ? (`0` + (start.getMonth() + 1)) : start.getMonth() + 1}-${start.getDate() <= 9 ? (`0` + start.getDate()) : start.getDate()}`
//     },
//     //结束时间格式化
//     getterEndDate: (state) => {
//         const end = state.endDate
//         return `${end.getFullYear()}-${end.getMonth() < 9 ? (`0` + (end.getMonth() + 1)) : end.getMonth() + 1}-${end.getDate() <= 9 ? (`0` + end.getDate()) : end.getDate()}`
//     },
//     //展示时间格式化
//     getterAllDate: (state,getters) => {
//         return `${getters.getterStartDate} 至 ${getters.getterEndDate}`
//     }
//
// }
//
// // 异步提交数据
// const actions = {}
//
// // 同步提交数据
// const mutations = {
//     //修改事件统计的gridData
//     updateIncidentGridData(state, value) {
//         state.gridData = {...state.gridData, ...value}
//     },
//     //修改统计时间
//     updateStatisticDate(state, [start, end]) {
//         state.startDate = start
//         state.endDate = end
//     }
// }
//
// export default {
//     namespaced: true,
//     state,
//     getters,
//     actions,
//     mutations
// }
