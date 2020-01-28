<template>
  <div >
    <div class="seller" v-bind:class="{'bk_white': !show_form}" v-if="show_form">
      <div class="login_cont" >
        <div class='logo' style="margin-top: 0"> <img src="../assets/logo.png" alt="" ></div>
        <div>
          <div class="login_item">
            <input type="" name="" v-model="form.phone_number" placeholder="请输入手机号码">
            <i @click="checkQrcode">获取二维码</i>
          </div>
        </div>
        <ButtonFooter @clickHandle="userForm" text="员工注册" />
      </div>

      <!-- 这里要截图保存的dom -->
<!--       <div v-if="show_qrcode" class="qrcode_wrap" id="imgDownload" ref="QRcodeSrcImg">
        <img src="../assets/qrcode_bk_1.jpeg" class="qrcode_bk">
        <div id="qrcode" class="qrcode"></div>
      </div> -->

      <!-- 这里是截图后base64图片显示的容器 -->

      
    </div>
    <div v-if="show_down_load" class="qrcode_down_wrap" >
      <p>长按图片保存到相册</p>
      <img :src="qrcode" class="qrcode_bk">
      <!-- <ButtonFooter @clickHandle="clickDown" text="长按图片保存到手机" /> -->
    </div>
  </div>
</template>

<script>
import { sellerRegister, getShareImg } from '@/api/index'
import { EventBus } from "../bus/event-bus.js";
import ButtonFooter from '@/components/buttonFooter'
import html2canvas from "html2canvas"
import QRCode from 'qrcodejs2'  // 引入qrcode
export default {
  components: {
    ButtonFooter
  },
  data () {
      return {
        form:{
          user_code: ''
        },
        qrcode: '',
        sign: {},
        genders:  [['男', '女']],
        toast: false,
        qq: null,
        show_form: true,
        show_qrcode: false,
        show_down_load: false
      }
  },
  mounted:function(){
  },
  // 组件被激活时调用
  activated:function(){
    this.show_form = true
    this.show_qrcode = false
    this.show_down_load = false
    
    // this.qrcode="http://guichaokeji.com/bird-api/images/v2/15101056160.jpeg"
    // this.show_form = false
    // this.show_qrcode = false
    // this.show_down_load = true
  },
  methods:{
    clickDown() {
      this.$vux.toast.show({
       text: '长按图片保存',
       type: 'text'
      })
    },

    // 利用插生成二维码
    makeQrcode(url) {
      this.show_qrcode = true
      setTimeout(() => {
        let qrcode = new QRCode('qrcode', {
          width: 80,  
          height: 80,
          text: url, // 二维码地址
          colorDark : "#000",
          colorLight : "#fff",
        })
        this.downLoad()
      }, 200)
    },
    
    // 使用canvas生成base64图片显示出来
    downLoad() {
      let _this = this;
      this.show_down_load = true
      this.show_qrcode = false
      this.$vux.loading.hide()
      // 声明一个画布元素,存储需下载图片范围
      let canvas = document.createElement("canvas");
      // 获取需下载范围元素
      let img = this.$refs["QRcodeSrcImg"];
      // 图片高度
      var w = parseInt(window.getComputedStyle(img).width);
      // 图片宽度
      var h = parseInt(window.getComputedStyle(img).height);
      // 声明画布宽高
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      // console.log(w, h);
      // let context = canvas.getContext("2d");
      // context.scale(2, 2);
      // 利用 html2canvas 下载 canvas
      html2canvas(img, { canvas: canvas }).then(function(canvas) {
        _this.qrcode = canvas.toDataURL()
        console.log(_this.qrcode)
      });
    },
    userForm () {
      this.$router.push({
        path: '/userForm/add'
      })
    },
    applyCode() {
      // console.log('')
    },
    
    // 获取远端用户信息，准备生成二维码获取二维码
    getQrcode() {
      sellerRegister(this.form).then(data => { 
         fundebug.notify("sellQrcode", "二维码查询结果", {
            metaData: data
         });
         if(data) {
           // let url = encodeURIComponent('http://guichaokeji.com/bird/index.html#/buy/' + this.form.phone_number )
           let url = 'http://guichaokeji.com/bird/index.html#/buy/' + this.form.phone_number
           // this.qrcode = url
           this.makeQrcode(url)
           // this.qrcode = 'http://qr.liantu.com/api.php?&w=200&text=' + url
           this.toast = true
         } else {
          this.$vux.loading.hide()
          this.$vux.toast.show({
           text: '号码不存在',
           type: 'text'
          })
         }
      })
    },
    
    // 检查信息getShareImg
    checkQrcode() {
      let is_phone=/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.form.phone_number)

      if(!is_phone) {
        this.$vux.toast.show({
         text: ' 手机号码错误',
         type: 'text'
        })
        return false
      }
      
      this.show_form = false
      this.$vux.loading.show({
       text: '生成中···'
      })

      Sentry.setExtra('data', this.form)
      Sentry.captureMessage('查询二维码','info');
      
      getShareImg(this.form).then(data => { 
        console.log(data)
        this.qrcode = data
        this.show_form = false
        this.show_down_load = true
        this.$vux.loading.hide()

      })
   },
  },

  events: {
  }

}
</script>
<style scope>

@import '../styles/index.css';

#imgDownload {
  transform: translate(999px,999px)
}

.bk_white {
  background-color: rgba(0,0,0,.5);
  color: #FFF;
  text-align: center;

}
.bk_white p {
  font-size: 16px;

  line-height: 30px;
  
}
.qrcode_down_wrap p{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: rgba(0,0,0,.5);
    line-height: 30px;
    color: #FFF
}

input::-webkit-input-placeholder { /* WebKit browsers */
  color: #FFF;
  font-size: 16px;
}

input::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #FFF;
  font-size: 16px;
}

input::-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #FFF;
} 
</style>

