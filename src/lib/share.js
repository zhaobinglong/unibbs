import cookies from 'js-cookie'
import axios from 'axios'  
import config from './config'

var wechatShare={

  

  
  init:function(obj){
      var self=this;
      var url=config.base+'weixin.php?action=signature&url='+encodeURIComponent(window.location.href.split('#')[0]);
      axios.get(url)
        .then(function (response) {
          var json=response.data;
          wx.config({
             debug: false, // 开启调试模式
             appId: json.appId,
             timestamp: json.timestamp,
             nonceStr: json.nonceStr,
             signature: json.signature,
             jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline']
          })

          wx.error(function(res){

          });

          // 验证签名之后，准备调用的函数
          wx.ready(function(){
               // 课程名称+在‘真题研究所’的第X天，累计做题X道
               obj.title = '【'+obj.title+'】'+'在真题研究所的第'+obj.diffDate+'天,累计做题'+obj.all_count+'道';
               obj.shareLink = config.shareLink+cookies.get('openid')+'/'+cookies.get('subject')+'/'+obj.diffDate+'/'+obj.all_count;
               wx.onMenuShareAppMessage({
                   title:obj.title,
                   desc:'', //描述
                   link: obj.shareLink, // 分享链接
                   imgUrl: config.shareImgUrl, // 分享图标
                   success: function () {
                       // 用户确认分享后执行的回调函数

                   },
                   cancel: function () {
                       // 用户取消分享后执行的回调函数
                   }
                  });

                  wx.onMenuShareTimeline({
                      title:obj.title, //
                      link: obj.shareLink, // 分享链接
                      imgUrl: config.shareImgUrl, // 分享图标
                      success: function () {
                          // 用户确认分享后执行的回调函数
                      },
                      cancel: function () {
                          // 用户取消分享后执行的回调函数
                      }
                  });

          });
        })
        .catch(function (error) {
          console.log(error);
        });

    }  
}	

export default wechatShare;


