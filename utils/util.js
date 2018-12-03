const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 时间戳转化为时间
function timestampToTime(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = formatNumber(date.getDate()) + ' ';
  var h = formatNumber(date.getHours()) + ':';
  var m = formatNumber(date.getMinutes()) + ':';
  var s = formatNumber(date.getSeconds());
  return Y + M + D + h + m + s;
}
module.exports = {
  formatTime: formatTime,
  timestampToTime: timestampToTime
}
