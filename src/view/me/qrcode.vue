<template>
    <div class='page_qrcode'>
          <!-- <canvas id="cv" width="300px" height="400px" class='canvas'></canvas> -->
          <img :src="src" class='qrcode_img'>
          <div class='qrcode_rules'>
              <p>长按上图后，选择保存都相册，然后分享给好友，得到好友关注后就能获得一个支持者</p>
              <p>获得3个好友关注即可免费获得该课程</p>
          </div>
          <div class=''>
              <p class='qrcode_fans_title'>我的支持者{{fans.length}}/3</p>
              <div  v-for='item in fans' :key="item.id" class='fans'>
                <img :src="item.headimgurl" alt="" class='fans_head'>
                <span class='fans_text'>{{item.nickname}}</span>
              </div>            
          </div>

    </div>
</template>
<style>
</style>
<script>
import { Cell} from 'vux'
import route from 'vue-router'
import config from '../../lib/config'
import axios from 'axios'
import qs from 'qs';
import cookies from 'js-cookie'
import moment from 'moment'
import util from '../../lib/util'
export default {
  components: {
    Cell
  },
  data () {
      return {
          form:{},//图片上的数据
          src:'./assets/qrcode.png',
          fans:[] ,//我的支持者
          fans_number:'我的支持者',
          qrcode:'',
      }
  },

  mounted:function(){
   
    this.fans_number=this.fans_number+this.fans.length+'/3';
  },
  // 每次激活组件
  activated:function(){
    var openid = cookies.get('openid');
    var subject = this.$route.params.subject;
    this.getFans(openid,subject);
    this.qrcode = config.base_img_url+this.$route.params.openid+'@'+this.$route.params.subject+'.jpg';
    console.log(this.qrcode);
    this.getShareData()
  },
  methods:{

    // 获取出现在图片上的数据
    getShareData(){
       var self = this;
        var openid = cookies.get('openid');
        var subject = this.$route.params.subject;
        var url = config.base+'user.php?code=wechatShare&openid='+openid+'&subject='+subject;
        axios.get(url)
           .then(function (response) {
                var form = response.data;
                form.subscribe_date = parseInt(form.subscribe_date)*1000;
                form.date = moment(form.subscribe_date).format('YYYY-MM-DD');
                form.now = moment().format('YYYY-MM-DD');
                form.diffDate = util.diffDate(form.date,form.now);
                self.form = form;
                self.drawBK();

           })
           .catch(function (error) {
               console.log(error);
           });
    },  


    // 请求支持者
    getFans(openid,subject){
      var self=this;
      var url = config.base+'user.php?code=fans&openid='+openid+'&subject='+subject;
      axios.get(url)
        .then(function (response) {
          self.fans=response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

     
     // 画背景
     drawBK(){
         var c=document.createElement('canvas');
         c.width = 300;
         c.height = 400;
         var self=this;
         var ctx=c.getContext('2d');
         var img=new Image();
         img.src='./static/qrcodebk.png';
         img.onload=function(){
            ctx.drawImage(img,0,0,c.width,c.height);
            self.drawQrcode(c)
         }
     },

     // 画二维码
     drawQrcode(c){
         var ctx=c.getContext('2d');
         var self=this;
         var img=new Image();
         img.src=this.qrcode;
         img.onload=function(){

            ctx.drawImage(img,200,300,50,50);
            self.drawText(ctx)
            var base64url=c.toDataURL("image/png",1);
            self.src = base64url;
         }
     },     

     // 画文字
     drawText(ctx){
        var joinLen  = '坚持学习'+this.form.diffDate+'天';
        var testNum  = '做了'+this.form.all_count+'题';
        ctx.fillStyle = '#FFF';
        ctx.font = "normal 24pt Arial";   
        ctx.fillText('我在真题研究所', 20, 60); 
        ctx.font = "normal 20pt Arial";  
        ctx.fillText(joinLen, 20, 110);         
        ctx.font = "normal 20pt Arial";  
        ctx.fillText(testNum, 20, 150); 
        ctx.fillText('真的有用!', 20, 190); 
        ctx.font = "normal 8pt Arial";  
        ctx.fillText('长按识别二维码', 20, 350);
     },


    // 输入
    push(src){
      //  console.log(src);
       this.src=src;
    }


  }

}
</script>
<style media="screen">
.canvas{
  margin: 0 auto;
}
.page_qrcode{
  padding: 19px 23px;
}
.qrcode_img{
  width:100%;
}
.qrcode_rules{
  padding: 10px 0px;
  font-size: 14px;
  font-family: PingFangSC;
  font-size: 13px;
  text-align: justify;
  color: #8c8c8c;
}
.qrcode_fans_title{
  width: 108px;
  height: 22px;
  font-family: PingFang-SC;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: #505050;  
  margin-bottom: 11px;
}
  .fans{
    text-align:left;
    padding: 10px 0;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    
  }
  .fans_head{
    width:30px;
    height:30px;
    border-radius:6px;
  }
  .fans_text{
    line-height:30px;
    vertical-align:top;
    padding-left:6px;
  }
</style>
