export function dateFormat(date, fmt = 'yyyy-mm-dd HH:MM') {
  let ret
  const opt = {
    'yyyy+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}

export function strToDate(str, fmt = 'yyyy-mm-dd HH:MM') {
  str = str.replace(/-/g, '/')
  const date = new Date(str)
  // 2012-09-5 11:11
  // const date = new Date()
  // let ret
  // const opt = {
  //   'yyyy+': (val) => date.setFullYear(val), // 年
  //   'm+': (val) => (date.setMonth(val - 1)), // 月
  //   'd+': (val) => (date.setDate(val)), // 日
  //   'H+': (val) => (date.setHours(val)), // 时
  //   'M+': (val) => (date.setMinutes(val)), // 分
  //   'S+': (val) => (date.setSeconds(val)) // 秒
  //   // 有其他格式化字符需求可以继续添加，必须转化成字符串
  // }
  // for (const k in opt) {
  //   ret = new RegExp('(' + k + ')').exec(fmt)
  //   if (ret) {
  //     const retStr = str.slice(ret.index, ret.index + ret[1].length)
  //     const n = Number.parseInt(retStr)
  //     opt[k](n)
  //   }
  // }
  return date
}
