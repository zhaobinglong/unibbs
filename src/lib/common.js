// 公共函数
module.exports = {

   test:function(){
     console.log('test');
   },
   // 将秒数转化为格式化的时间  周 时:分:秒
   filteDateBySec:function(sec){
      sec=parseInt(sec);
      var week=parseInt(sec/86400);
      var hour=parseInt(sec%86400/60/60);
      var minute=parseInt(sec%86400%3600/60);
      var second=parseInt(sec%86400%3600%60);
      switch(week){
        case 0:
          week='周一';
          break;
        case 1:
          week='周二';
          break;
        case 2:
          week='周三';
          break;
        case 3:
          week='周四';
          break;
        case 4:
          week='周五';
          break;
        case 5:
          week='周六';
          break;
        case 6:
          week='周日';
          break;
      }
      // return week+' '+hour+':'+minute+':'+second;
      var obj={
        'week':week,
        'hour':hour,
        'minute':minute,
        'second':second
      }
      return obj;
   },
   set: function (name, value, domain, path, hour) {
      if (hour) {
          var expire = new Date();
          expire.setTime(expire.getTime() + 36E5 * hour);
      }
      document.cookie = name + "=" + value + "; " + (hour ? "expires=" + expire.toGMTString() + "; " : "") +
          (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "domain=" + document.domain + ";");
       console.log(document.cookie);
      return true;
   },
   get: function (name) {
      var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"),
          m = document.cookie.match(r);

      return !m ? "" : m[1];
   },



}
