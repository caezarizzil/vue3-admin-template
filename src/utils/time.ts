export const getTime = () => {
  let message = ''
  // 获取当前时间
  const hours = new Date().getHours()
  if (hours < 9) {
    message = '早上'
  } else if (hours < 12) {
    message = '上午'
  } else if (hours < 14) {
    message = '中午'
  } else if (hours < 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
