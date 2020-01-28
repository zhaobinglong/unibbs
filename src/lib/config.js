
module.exports = {

   base:'http://examlab.cn/wechatClassApi/',
   root:'http://examlab.cn/wechatClass/',
   base_img_url:'http://examlab.cn/img/', //图片保存的路径
   // 微信授权路径完整路径
   wechat_oauth_url:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfcacdc74295aabe5&redirect_uri=http%3A%2F%2Fexamlab.cn%2FwechatClassApi%2Fauth.php&response_type=code&scope=snsapi_userinfo&state=home#wechat_redirect',
   // 微信授权模式 如果不需要用户昵称和头衔，建议采用base模式
   // snsapi_userinfo
   // snsapi_base
   wechat_oauth_type:'snsapi_userinfo',
   // 后台授权路径
   oauth_url:'http%3A%2F%2Fexamlab.cn%2FwechatClassApi%2Fauth.php',
   shareTitle:'真题研究所',
   shareLink:'http://examlab.cn/wechatClass/dist/#/share/',
   shareImgUrl:'http://examlab.cn/wechatClass/static/share.jpg',
   shareDesc:'每天的真题都在这里',
   openid:'oBZdn1iFVTjQQx3pEpouMgslYt50',//我的opened
   listen_pic:'http://examlab.cn/wechatClass/static/share.jpg' ,//听力素材的小图片
   static_url:'http://examlab.cn/img/', //静态资源文件夹

}
