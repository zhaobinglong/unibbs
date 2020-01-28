<template>
  <div >
    <div >
      <keep-alive>
       <router-view ></router-view>
      </keep-alive>
    </div>
    <tabbar :key="key">
      <tabbar-item :link="{path:'/index/push/new'}" icon-class="index_tab_icon" :selected="home">
        <img slot="icon" src="../assets/tab/tab_push.png">
        <img slot="icon-active" src="../assets/tab/tab_push_true.png">
        <span slot="label">发布预警</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/index/list'}" icon-class="icon_select" :selected="calendar">
        <img slot="icon" src="../assets/tab/tab_list.png">
        <img slot="icon-active" src="../assets/tab/tab_list_true.png" >
        <span slot="label" icon-class="icon_select">失联儿童</span>
      </tabbar-item>
<!--       <tabbar-item  :link="{path:'/index/timeline'}" :selected="my">
        <img slot="icon" src="../assets/tab/tab_news.png">
        <img slot="icon-active" src="../assets/tab/tab_news_true.png">
        <span slot="label">平台动态</span>
      </tabbar-item> -->
      <tabbar-item  :link="{path:'/index/me'}" :selected="my">
        <img slot="icon" src="../assets/tab/tab_user.png">
        <img slot="icon-active" src="../assets/tab/tab_user_true.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>

import { Group, Cell,Tabbar, TabbarItem } from 'vux'
import cookies from 'js-cookie'
import subjectModel  from '../lib/subjectModel'
import util  from '../lib/util'
import moment  from 'moment'
export default {
  components: {
    Group,
    Cell,
    Tabbar,
    TabbarItem
  },
  name: 'index',
  data () {
    return {
      today_course:'',
      calendar_subject:'math',
      home:true,
      calendar:false,
      my:false
    }
  },
  watch: {
    "$route"(to,from){

       if(to.name == 'home'){
          this.home = true;
          this.calendar = false;
          this.my = false;
       }
    }
  },
  mounted :function(){
    //  device.debug = true;
  },
  computed: {
    key() {
        return new Date().getTime();
    }
  },

  // 点击今日课程，前往今日天所对应的日期
  activated:function(){
    
    this.today_course = '/index/home/'+cookies.get('subject')+'/'+moment().format('YYYY-MM-DD');
    this.calendar_subject = '/index/calendar/'+cookies.get('subject');
  }
}
</script>


<style >
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}


.index_tab_icon{
  color: #333;
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
  color: #83c7d4!important;
}
</style>
