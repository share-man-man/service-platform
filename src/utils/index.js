export function getCodeName(codeList = [], id = '') {
  const code = codeList.find(item => item.id === id)
  return code ? code.name : ''
}
