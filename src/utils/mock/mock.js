import data from './MockData'

function getData(confirmParam) {
  // console.log(confirmParam)
  const responseData = data.find(item => {
    return confirmParam.data === item.data && confirmParam.url === item.url
  })
  return responseData ? responseData.response : {}
}

export {
  getData
}
