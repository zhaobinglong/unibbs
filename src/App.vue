<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import axios from 'axios'
import config from './lib/config'
import util from './lib/util'
import cookies from 'js-cookie'
import moment  from 'moment'
export default {
  name: 'app',

  mounted :function(){
    // this.getShare();
    // this.initAuth();
  },
  methods:{

    // 
    initAuth(){
     cookies.set('redirect_url', window.location.href, { expires: 7 });
     if(window.location.hostname=='localhost'){
        cookies.set('openid', config.openid, { expires: 7 });
     }else{
        if(cookies.get('openid')){
            // 
        }else{
            window.location.href=config.wechat_oauth_url;
        }       
     }

  
    },

    // 获取分享内容
    getShare(){
      var self=this;
      var openid = cookies.get('openid');
      var subject = cookies.get('subject');
      var url = config.base+'user.php?code=wechatShare&openid='+openid+'&subject='+subject;
      axios.get(url)
         .then(function (response) {
              var form = response.data;

              form.subscribe_date = parseInt(form.subscribe_date)*1000;
              form.date = moment(form.subscribe_date).format('YYYY-MM-DD');
              form.now = moment().format('YYYY-MM-DD');
              form.diffDate = util.diffDate(form.date,form.now)+1;
              
              self.wxShare(form)
             

         })
         .catch(function (error) {
             console.log(error);
         });
    },

  	wxShare(obj){
  	  var self=this;
      var url=config.base+'weixin.php?action=signature&url='+encodeURIComponent(window.location.href.split('#')[0]);
      // alert(window.location.href.split('#')[0]);
      axios.get(url)
        .then(function (response) {
          var json=response.data;
          // console.log(json);
          wx.config({
             debug: false, // 开启调试模式
             appId: json.appId,
             timestamp: json.timestamp,
             nonceStr: json.nonceStr,
             signature: json.signature,
             jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline']
          })

          wx.error(function(res){
            console.log(res);
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
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';

body {

}
.container{
  padding: 0!important;
}
.wechat_btn{
  width: 354px;
  height: 40px;
  border-radius: 4px;
  color: #FFF!important;
  background-color: #0091da!important
}
.weui-tabbar{
	position:fixed!important;
}
.di{
  display: inline-block;
}


.cont_box{
    background-color: #FFF;
    margin: 20px;
    padding: 28px 16px;
    border-radius: 8px;
}
.tc{text-align: center;}
.pd20{padding: 20px;}
.text_link{
  color: #4078c0
}
</style>
