<template >
    <div class='page_home'>
<!--        <img :src="form.everyday_img" alt="" class='home_img'>
       <div class='home_box'>
          <p class='home_title' >
            <span>{{form.date}}</span>
            <span>Day {{form.len}}</span>
          </p>
           
           <router-link :to="{path:today_course}" class='home_link'>
               <div class='home_link_box q'>
                <p >
                  <span class='home_link_left'>今日课程</span><br/>
                  <span class='home_link_title_lab'>Today's Questions</span>
                </p>
                <span class='home_link_right'>
                   <img src="../assets/home_link.png" alt="" class='home_link_right'>
                </span>
              </div>

               <div class='home_link_title_tip q_bk'>{{form.title1}}</div>
           </router-link>
           <router-link :to="{path:today_answer}" class='home_link'>
               <div  class='home_link_box a'>
                 <p >
                    <span class='home_link_left'>今日练习</span></br>
                    <span class='home_link_title_lab'>Today's Answers</span>
                  </p>
                 <span class='home_link_right'>
                   <img src="../assets/home_link.png" alt="" class='home_link_right'>
                 </span>
               </div>
               <div class='home_link_title_tip t_bk'>{{form.title2}}</div>
           </router-link>
       </div> -->
       <!-- <div style='height:74px'></div> -->
    </div>
</template>
<style>
</style>
<script>
import { Cell } from 'vux'
import config from '../lib/config'
import util from '../lib/util'
import cookies from 'js-cookie'
import axios from 'axios'
import moment  from 'moment'
export default {
  components: {
  },
  data (){
    return{
       form:{
          date:'',
          everyday_img:'',
          len:'1',
          title1:'',
          title2:''
       },
       today_course:'',
       today_answer:'',
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route"(to,from){

       if(to.name == 'home'){
          this.buildData();
       }
    }
  },

  activated:function(){
    cookies.set('subject', this.$route.params.subject, { expires: 1 });
    this.getDate(this.$route.params.subject);

  },

  methods: {



     getDate(subject){
        var self=this;
        var url = config.base+'user.php?code=getStartDate&subject='+subject;
        axios.get(url)
          .then(function (res) {

              cookies.set('home_startDate',res.data.startDate , { expires: 1 });
              if(res.data.everyday_img){
                 cookies.set('home_everyday_img', res.data.everyday_img, { expires: 1 }); 
              }else{
                 cookies.set('home_everyday_img', '', { expires: -1 }); 
              }

              if(res.data.everyday_title){
                 cookies.set('home_everyday_title', res.data.everyday_title, { expires: 1 }); 
              }else{
                 cookies.set('home_everyday_title', '', { expires: -1 }); 
              }
                  
              self.buildData();  

          })
          .catch(function (error) {
            console.log(error);
          });       
     },
     
     // 编译数据
     buildData(){

        let len = util.diffDate(cookies.get('home_startDate'),this.$route.params.date);


        this.today_course='/index/today/q/'+this.$route.params.subject+'/'+(len+1);
        this.today_answer='/index/today/t/'+this.$route.params.subject+'/'+(len+1);
        

        
        this.form.len = len+1;
        this.form.date = this.$route.params.date;


        if(cookies.get('home_everyday_img')){
            var everyday_img =   JSON.parse(cookies.get('home_everyday_img')) ; 
            this.form.everyday_img=config.base_img_url+ everyday_img[len] 
        }else{
            this.form.everyday_img=''           
        }

        if(cookies.get('home_everyday_title')){
           var everyday_title =   JSON.parse(cookies.get('home_everyday_title')) ; 
           this.form.title1=everyday_title[len].title1;
           this.form.title2=everyday_title[len].title2;
        }

    },

  }


}
</script>
<style>
.top{
  margin-bottom:20px;
}
.home_img{
  width:100%;
  min-height: 200px;
  max-height: 250px
}
.home_box{
  padding: 0 14px;
}
.home_title{
  line-height: 50px;
  font-family: PingFang-SC;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: #161817;
  display: flex;
  display: -webkit-flex;  
  justify-content: space-between;  
}
.home_link{
  border-radius:2px;
  margin-bottom:20px;
  display: block;
  border-radius: 4px;
  background-color: #FFF;
  box-shadow: 0 4px 4px 0 #e6e6e6;
}
.home_link_box{
  border-radius:2px;
  padding: 0 20px;
  background-color: #FFF;
  height: 100px;
  display: flex;
  display: -webkit-flex;  
  align-items:center;
  justify-content: space-between;
}
.home_link_left{
  font-size:30px;
}
.home_link_title_lab{
  font-family: PingFangSC;
  font-size: 12px;
  color: #161817;
}
.home_link_right{
  width: 24px;
  height: 24px;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
  color: #FFF
}
.home_link_title_tip{
  padding: 0 20px;
  line-height: 36px;
  color: #FFF;

}
.q_bk{
  background-color: #f6a623;
}
.t_bk{
  background-color: #0eb8a5;
}
.q{
  color:#f6a623;
}
.a{
  color: #00c88b;
}


</style>
