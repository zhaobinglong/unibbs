<template>

<div class="weui-msg" v-if="!show_qrcode">
    <!-- <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div> -->
    <div class="weui-msg__icon-area" style="height: 200px">
      <img :src="img">
    </div>
    <div class="weui-msg__text-area">
        <h2 class="weui-msg__title">请长按二维码立即支付</h2>
        <!-- <p class="weui-msg__desc">内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现<a href="javascript:void(0);">文字链接</a></p> -->
        <!-- <p class="weui-msg__desc">您的保单号码是：{{ form.exchangeno }}</p> -->
    </div>
    <div class="weui-msg__opr-area">
        <p class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" @click="checkStatus">查询支付状态</a>
            <a class="weui-btn weui-btn_default" @click="goFollow">查询保单</a>
        </p>
    </div>
    <div class="weui-msg__extra-area">
        <div class="weui-footer">
            <p class="weui-footer__links">
                <a href="javascript:void(0);" class="weui-footer__link">归巢科技</a>
            </p>
            <p class="weui-footer__text">Copyright &copy; 2018-2019 归巢科技</p>
        </div>
    </div>
</div>
<div v-else class="success">
  <img src="../assets/wechat.jpeg" class="success_qrcode" style="width: 100%">
</div>

</template>

<script>
import { EventBus } from "../bus/event-bus.js"
import { checkOrder } from '@/api/index'
export default {
  components: {
  },
  data () {
    return {
      show_qrcode: false,
      img: '',
      form: {}
    }
  },

  mounted:function(){
    
  },
  // 组件被激活时调用
  activated:function(){
    this.show_qrcode = false
    this.form = JSON.parse(localStorage.getItem('responsebody'))
    let url = encodeURIComponent(this.form.prpjfwechatlist)
    this.img = 'http://qr.liantu.com/api.php?&w=200&text=' + url

  },
  methods: {
    checkStatus() {
      this.$vux.loading.show({
       text: '查询中···'
      })
      checkOrder({exchangeno: this.form.exchangeno}).then(res => {
        this.$vux.loading.show({
         text: res.responsehead.error_message
        })
      })
      setTimeout( () => {
        this.$vux.loading.hide()
      }, 2000)
    },
    goHome() {
      this.$router.redirect({'path':'/index/start'})
    },
    goFollow() {
      this.show_qrcode = true
    }
  }

}
</script>
<style scoped>
.success {
  background-color: #83c7d4;
  position: fixed;
  top:0;
  right: 0;
  bottom: 0;
  left: 0
}
</style>
