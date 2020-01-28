<template>

  <div class='container'>
    <div class="default-view">
      <keep-alive>
       <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { Loading,Group, Cell,CellBox,CellFormPreview,Tabbar, TabbarItem,Panel,XButton } from 'vux'


export default {
  components: {
    Group,
    Cell,
    Tabbar,
    TabbarItem,
    Panel,
    CellFormPreview,
    CellBox,
    XButton,
    Loading
  },
  data () {
    return {

      pointList:[], //处理过的二维数组  用来在页面展示

    }
  },
  // 设备列表并不需要每次返回的时候刷新
  // 设备数量一帮情况下是固定的
  mounted:function(){},
  // 组件被激活时调用
  activated:function(){
    //  this.initPage();
    //  this.start();
  },
  methods: {
    // 初始化页面
    initPage(){
           this.mydevice='';
           this.childs=['0000'];
           this.longAddr=[];
           this.is_load=true;
           window._point='0000';
           if(cookies.get('device')){
              this.list=JSON.parse(cookies.get('device'));
           }else{
              device.log('cookie中没有发现数据')
           }
    },


  }

}
</script>

<style>
li{list-style: none}
.container{
  padding: 0 10px;
  padding-top: 20px;
}
.item{
  overflow: hidden;
  margin-bottom: 20px;
}
.item_block{
  overflow: hidden;
  padding: 8px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc
}
.item_block img{
    float: left;
}
.item_title{
  text-align: left;
  margin-bottom: 10px;
}

.item_right{
  margin-left: 70px;
}
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
.sub-item {
  color: #888;
}
.slide {
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.gray{
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray;
}
</style>
