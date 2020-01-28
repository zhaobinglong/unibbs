<template>

  <div class='page_me'>
    <div class="me_top"  @click='toLogin'>
      <img src="../assets/noLogin.png" class='me_img'>
      <p class='me_nickname'>{{userInfo.phone ? userInfo.phone : '未登录' }}</p>
    </div>
    <div class='me'>
       <router-link :to="{ path: '/childs' }" class='me_item' tag="p">
          <span>儿童档案</span>
          <span class='me_item_right'></span>
       </router-link>
       <router-link :to="{ path: '/orders' }" class='me_item' tag="p">
          <span>我的保单</span>
          <span class='me_item_right'></span>
       </router-link>
       <router-link :to="{ path: '/myPush' }" class='me_item' tag="p">
          <span>我的发布</span>
          <span class='me_item_right'></span>
       </router-link>
       <router-link :to="{ path: '/myClue' }" class='me_item' tag="p">
          <span>我的线索</span>
          <span class='me_item_right'></span>
       </router-link>
<!--        <router-link :to="{ path: '/seller' }" class='me_item' tag="p">
          <span>二维码注册</span>
          <span class='me_item_right'></span>
       </router-link> -->
       <router-link :to="{ path: '/buy/add' }" class='me_item' tag="p">
          <span>保险购买</span>
          <span class='me_item_right'></span>
       </router-link>
       <!-- 缓存中有手机号码，认为登录 -->
       <div class='me_item'  @click="handleLoginOut" v-if="userInfo.phone">
          <span>退出登录</span>
          <span class='me_item_right'></span>
       </div>
    </div>
    <div v-transfer-dom >
      <confirm v-model="showLoginOut"
      title="提示"
      @on-confirm="onConfirm">
        <p style="text-align:center;">确定退出登录吗?</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import { Confirm, TransferDomDirective as TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Confirm
  },
  data () {
    return {
      obj:{
        avatarUrl: ''
      },
      userInfo: {
        phone: ''
      },
      showLoginOut: false
    }
  },

  mounted:function(){
    
  },
  // 组件被激活时调用
  activated:function(){
    let phone = localStorage.getItem('phone')
    // console.log(this.$store.state)
    // console.log(this.$store.getters.getTest)
    if (phone) {
      this.userInfo.phone = phone
    }
  },
  methods: {
    onConfirm () {
      localStorage.setItem('phone', '')
      this.userInfo.phone = ''
    },
    handleLoginOut() {
      this.showLoginOut = true
    },
    toLogin() {
      if (localStorage.getItem('phone')) {
        return false
      }
      this.$router.push({
        'path':'/login'
      })
    }

  }

}
</script>

<style>
li{list-style: none}
.me_top{
  text-align:center;
  padding: 33px 0 20px 0;
  background-color: #83c7d4;
  color: #FFF;
}
.me_img{
  width:72px;
  height: 72px;
  border-radius: 50%
}
.me_nickname{
  margin-bottom: 22px;
}
.me_data{
  text-align: center;
}
.me_data_item{
  display: inline-block;
  width:40%;
}
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
.page_me{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.me{
  padding: 0 19px;
  background-color: #fff;
}
.me_item{
  position: relative;
  line-height: 64px;
  box-shadow: inset 0 -1px 0 0 #e6e6e6;
  font-family: PingFangSC;
  font-size: 16px;
  color: #505050;
  background-color: #FFF;
}
.me_item:last-child{
  box-shadow: none;
}

.me_item_right{
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    position: absolute;
    right: 19px;
    top: 50%;
    transform:rotate(45deg) translate(0,-50%);
}
.border_none{
  box-shadow: none
}
</style>
