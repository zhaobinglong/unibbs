<template>
<!-- 
<div class="weui-msg" v-if="!show_qrcode">
    <div class="weui-msg__icon-area">
      <img src="../assets/logo.png" alt="" style="width: 200px">
    </div>
    <div class="weui-msg__opr-area">
        <p class="weui-btn-area">
            <a class="weui-btn" @click="checkStatus" style="background-color: #83c7d4;">返回首页</a>
        </p>
    </div>
    <div class="weui-msg__text-area">
        <h2 class="weui-msg__title">线索已成功提交！</h2>
        <p class="weui-msg__desc">感谢您为寻回走失儿童贡献的力量！结案后，由警方和监护人共同认定有效线索，对应线索提供人将平分搜救补偿金，清单将在归巢平台上公示</p>
    </div>

    <div class="weui-msg__extra-area">
        <div class="weui-footer">
            <p class="weui-footer__links">
                <a href="javascript:void(0);" class="weui-footer__link">归巢科技</a>
            </p>
            <p class="weui-footer__text">Copyright &copy; 2018-2019 归巢科技</p>
        </div>
    </div>
</div> -->
<div class="success">
  <img src="../assets/clue_success.jpeg" class="success_qrcode" style="width: 100%" @click="checkStatus">
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
    // this.show_qrcode = false
    // this.form = JSON.parse(localStorage.getItem('responsebody'))
    // let url = encodeURIComponent(this.form.prpjfwechatlist)
    // this.img = 'http://qr.liantu.com/api.php?&w=200&text=' + url

  },
  methods: {
    checkStatus() {
      this.$router.push({'path':'/detail/' + this.$route.params.id})
    },
    goHome() {
      this.$router.push({'path':'/index/start'})
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
