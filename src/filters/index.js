import Vue from 'vue'

Vue.filter('durationToTime', value => {
  let min = Number.parseInt(value / (60 * 1000), 10) + ''
  let seconds = Number.parseInt((value / 1000) % 60, 10) + ''
  min = min.length === 1 ? ('0' + min) : min
  seconds = seconds.length === 1 ? ('0' + seconds) : seconds
  return min + ':' + seconds
})

Vue.filter('playCount', value => {
  value += ''
  if (value.length >= 6) {
    return value.substr(0, value.length - 4) + '万'
  }
  return value
})

Vue.filter('unix2Time', time => {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  return year + '-' + month + '-' + day
})

Vue.filter('splitTags', tags => {
  if (typeof tags === 'object') {
    return tags.join('/')
  }
  return ''
})

Vue.filter('timeToStr', time => {
  let min = Number.parseInt(time / 60, 10) + ''
  let seconds = Number.parseInt(time % 60, 10) + ''
  min = min.length === 1 ? ('0' + min) : min
  seconds = seconds.length === 1 ? ('0' + seconds) : seconds
  return min + ':' + seconds
})

// 过滤用户身份
Vue.filter('filterUserType', value => {
  if(value == 'student'){
     return '学生'
  }else if (value == 'family'){
     return '家长'
  }else if (value == 'teacher'){
     return '老师'
  }else{
     return '其他'
  }
})

Vue.filter('filterTime', v => {
  var time = new Date(parseInt(v) * 1000);
  var y = time.getFullYear();
  var m = time.getMonth()+1 < 10 ? '0' + (time.getMonth()+1) : time.getMonth()+1 
  var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
  var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
  var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
  return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
})

Vue.filter('filterMicroTime', v => {
  var time = new Date(parseInt(v));
  var y = time.getFullYear();
  var m = time.getMonth()+1 < 10 ? '0' + (time.getMonth()+1) : time.getMonth()+1 
  var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
  var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
  var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
  return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
})

Vue.filter('filterIdentifyType', v => {
  let arr = ['','身份证','户口本','护照','军人证件','港澳居民身份证','港澳居民来往内地通行证','台湾居民来往内地通行证','港澳台居民居住证']
  let index = parseInt(v)
  return arr[index];
})

Vue.filter('filterPlanCode', v => {
  let arr = {
    "JCV4500002": '156',
    "JCV4500001": '81',
  }
  return arr[v];
})
