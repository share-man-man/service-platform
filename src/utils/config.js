let codeMap = {
  SJ: {
    id: 1,
    codeName: '事件'
  },
  WT: {
    id: 2,
    codeName: '问题'
  },
  BG: {
    id: 3,
    codeName: '变更'
  },
  FB: {
    id: 4,
    codeName: '发布'
  }
}
function getTaskType(biz_code) {
  return codeMap[biz_code] ? codeMap[biz_code]['id'] : ''
}

function setCodeMap(map) {
  codeMap = { ...map }
}

function getCodeMap() {
  return codeMap
}

export default {
  getTaskType,
  setCodeMap,
  getCodeMap
}
