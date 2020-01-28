<template>
    <div class='content allCourse'>
       <div v-if="list.length==0" class='no_subject'>
         <p>您还没有购买任何课程</p>
         <p @click="goBuy" class='no_subject_buy'>立即购买</p>
       </div>
       <div class='allCourse_item' v-for='item in list' :key="item.id">
         <p class='title'>{{item.title}}</p>
         <p class='desc'>{{item.desc}}</p>
         <!-- <span @click="goClassItem(item.name)"  class='btn' >了解课程</span> -->
         <!-- 不给导航留下记录 -->
         <!-- 微信内置浏览器，微信支付一直提示当前url没有注册 -->
         <p   class='btn' @click='study(item.id)'>
            进入学习
         </p>
         <img :src="item.img" alt="" class='img'>
       </div>
    </div>
</template>
<style>
</style>
<script>
import { Group, Cell,CellBox,CellFormPreview,Panel } from 'vux'
import config from '../../lib/config'
import cookies from 'js-cookie'
import axios from 'axios'
export default {
  components: {
    Group,
    Cell,
    Panel,
  },
  data (){
    return{
      list:[],
    }
  },
  // 组件被激活时调用
  activated:function(){
     
     if(!cookies.get('openid')){
        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfcacdc74295aabe5&redirect_uri=http%3A%2F%2Fexamlab.cn%2FwechatClassApi%2Fauth.php&response_type=code&scope=snsapi_base&state=myCourse#wechat_redirect';
     }else{

     
     // 获取当前用户的课程
     this.getMySubject(cookies.get('openid'));
   }

  },
  mounted: function () {
    // window.course='math';
      // var dateObj = new Date();
      // var date = dateObj.getFullYear()+'/'+(dateObj.getMonth()+1)+'/'+dateObj.getDate();
      // this.list.map(function(item, index) {
      //   // console.log(item)
      //   return item.url='/index/home/'+item.name+'/'+date;
      // })
      // console.log(this.list)
  },
  methods: {
    click () {

    },

    //
    goBuy(){
      this.$router.push({
        'path':'/allCourse'
      })
    },
    
    goClassItem(id){
       console.log(name)
       window.location.href=config.root+'dist/#/course/'+id;
    },

    // 获取我的课程列表
    getMySubject(openid){

      var self=this;
      var url = config.base+'user.php?code=mySubject&openid='+openid;
      // console.log(url);
      axios.get(url)
        .then(function (response) {
          console.log(response.data);
           // console.log(response);
           var arr=response.data;
           for (var i = 0; i < arr.length; i++) {
             arr[i].img=config.base_img_url+arr[i].thumb_img;
           };
           self.list=arr;
           console.log(self.list)
           
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    
    //  前往课程首页开始学习
    study(id){
       cookies.set('subject', id);
       this.$router.push({'path':'/index/home/'+id+'/0/0/0'});
    }



  }
}
</script>
<style>
.content{
  padding: 20px;
  background-color: #efefef;
  position: absolute;
  top: 0;
  bottom:0;
  left: 0;
  right: 0;

}

.no_subject{
  text-align: center;
  padding:20px;
}
.no_subject_buy{
  line-height: 60px;
  color: blue;
}


.allCourse_item{
  background-color: #FFF;
  padding: 10px;
  position: relative;
  margin-bottom: 20px;
}
.title{
  font-size: 20px;
  padding-bottom: 8px;
  font-weight: 600;
}
.desc{
  font-size: 12px;
  padding-bottom: 8px;
  color: #999
}
.btn{
  background-color: #f7d605;
  color: #fff;
  display: inline-block;;
  text-align: center;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 14px;
}
.img{
  position: absolute;
  top: 0;
  right: 0;
  min-height: 100%;
  max-height: 100%;
}
</style>
