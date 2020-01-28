<template>
  <div >
    <div class="seller" v-if="!show_down_load" >
      <div class="login_cont" ref="QRcodeSrcImg" style="background: rgb(253,213,94);">
        <!-- <div class='logo' style="margin-top: 0"> <img src="" alt="" ></div> -->

        <div>
          <div class="login_item" v-for="item in accountList">
            <img :src="'https://examlab.cn/unibbs-wechat/unibbs/static/app/'+ item.label + '.png'">
            <input type="" name="" v-model="item.value" placeholder="点击输入账号">
          </div>
          <div style="margin: 20px">
            <img src="../assets/app/qrcode.jpg" style="width: 60px; height:60px">
            <span style="font-size: 12px;">长按识别二维码，一键生成社交名片</span>
          </div>
        </div>
        <ButtonFooter @clickHandle="checkQrcode" text="立刻生成" />
      </div>

    </div>
    <div  class="qrcode_down_wrap" v-if="show_down_load">
      <p>长按图片保存到相册</p>
      <img :src="qrcode" style="width: 80%">
      <!-- <ButtonFooter @clickHandle="clickDown" text="长按图片保存到手机" /> -->
    </div>
    <!-- <loading ></loading> -->
  </div>
</template>

<script>
import { sellerRegister, getShareImg } from '@/api/index'
import ButtonFooter from '@/components/buttonFooter'
import html2canvas from "html2canvas"
export default {
  components: {
    ButtonFooter
  },
  data () {
      return {
        form:{
          weibo: '',
          zhihu: '',
          douyin: '',
          weixin: '',
          kuaishou: '',
          wangyi: ''
        },
        accountList: [
          {
            'name': '微博',
            'label': 'weibo',
            'value': '',
            'hidden': false
          },
          {
            'name': '微信',
            'label': 'weixin',
            'value': '',
            'hidden': false
          },
          {
            'name': '豆瓣',
            'label': 'douban',
            'value': '',
            'hidden': false
          },
          {
            'name': '豆瓣',
            'label': 'douban',
            'value': '',
            'hidden': false
          },
        ],
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
    if(localStorage.getItem('userAccounts')) {
      this.form = JSON.parse(localStorage.getItem('userAccounts'))
    }
    // 
  },
  methods:{
    clickDown() {
      this.$vux.toast.show({
       text: '长按图片保存',
       type: 'text'
      })
    },
    
    // 使用canvas生成base64图片显示出来
    downLoad() {
      let _this = this;
      // this.show_down_load = true
      // this.show_qrcode = false
      // this.$vux.loading.hide()
      // 声明一个画布元素,存储需下载图片范围
      
      // 获取需下载范围元素
      let img = this.$refs["QRcodeSrcImg"];
      // 图片高度
      var w = img.offsetWidth;
      // 图片宽度
      var h = img.offsetHeight
      console.log(w)
      console.log(h)
      // 声明画布宽高
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      let scale = parseInt(this.getPixelRatio(context)); 
      console.log(scale)
      canvas.width = w * scale
      canvas.height = h * scale
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      //context.scale(scale, scale); // 这行代码不能加，不知道为什么我会有这行

      // 利用 html2canvas 下载 canvas
      var opts = {
            scale: scale, 
            canvas: canvas,
            width: w, 
            height: h,
            dpi: window.devicePixelRatio,
            useCORS: true, // 【重要】开启跨域配置
            allowTaint: true,//允许跨域图片
      }
      html2canvas(img,opts).then(function(canvas) {
        _this.qrcode = canvas.toDataURL('image/png', 1.0)
        _this.show_down_load = true
        
      });
    },
    
    // 获取设备的PixelRatio
    getPixelRatio(context) {     
            var backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
    },

    // 检查信息，如果有没输入的，则隐藏
    checkQrcode() {
      this.downLoad()
   },
  },

  events: {
  }

}
</script>
<style scope>

@import '../styles/index.css';

.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.qrcode_down_wrap {
  height: 100vh;
  display: flex;
  background-color: rgba(0,0,0,.5);
  align-items: center;
   justify-content: center
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
.login_item {
  margin: 20px;
  margin-right: 0;
  height: 40px;
  overflow: hidden;
  display: flex;
  justify-content:space-between;
  border-bottom: 1px solid #E5E5E5;
  box-shadow: inset 0 -1px 0 0 #e6e6e6; 
}
.login_item:last-child{
    border-bottom: none;
}
.login_item img {
  width: 40px;
  height: 40px;
}
.login_item input {
  background: none;
  line-height: 40px;
  -webkit-appearance:none;
  border: none;
  font-size: 18px;
  padding-left: 20px;
  outline:none;
  color: #FFF;
}
.login_item input::-webkit-input-placeholder{
　　color: #FFF;
}
.login_item span {
  font-style: normal;
  line-height: 40px;
  font-size: 24px;
}
</style>

