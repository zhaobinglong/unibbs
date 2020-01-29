<template>
  <div >
    <!-- 第一页：输入信息 -->
    <div  v-if="show_form" >
      <div class="login_cont" ref="QRcodeSrcImg" v-bind:class="{'bk_yellow': show_down_load}">
        <h1 v-if="show_down_load">来互粉吧</h1>
        <!-- 账户列表 -->
        <div class="login_item" v-for="item in accountList" v-if="!item.hidden">
          <img :src="'https://examlab.cn/unibbs-wechat/unibbs/static/app/'+ item.label + '.png'" v-bind:class="{'img_second': show_down_load}">
          <div  class="login_item_right">
            <label :for=item.label style="color: #303030; font-size: 18px; width: 100%" v-if="!show_down_load">{{ item.name }}</label>
            <input type="" name="" v-model="item.value" placeholder="点击输入账号" :id=item.label>
          </div>
        </div>
        <!-- 底部公众号 -->
        <div style="margin: 20px; text-align: right; padding-bottom: 24px;" class="share_bottom" v-if="show_down_load">
          <div class="share_bottom_left_">
            <p>长按识别前往公众号</p>
            <p>一键生成你的社交名片</p>
          </div>
          <img src="../assets/app/qrcode.jpg" style="width: 60px; height:60px">
        </div>
      </div>
      <div style="padding: 28px 80px 56px 80px">
        <span href="javascript:;" class="weui-btn weui-btn_primary" @click="checkQrcode">生成分享图片</span>
      </div>
    </div>

    <!-- 第二页：保存图片 -->
    <div  class="qrcode_down_wrap" v-if="show_down_load">
      <p>长按图片保存，分享至朋友圈</p>
      <img :src="qrcode" style="width: 80%; border-radius: 8px">
      <div style="padding: 28px 80px 56px 80px">
        <span href="javascript:;" class="weui-btn weui-btn_primary" >长按图片分享</span>
      </div>
    </div>
    <div v-if="loading" >
      <loading ></loading>
    </div>
    
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
        loading: false,
        //社交app图标顺序如下：微博、抖音、网易云音乐、知乎、豆瓣、微信、Instagram
        accountList: [
          {
            'name': '微博',
            'label': 'weibo',
            'value': '',
            'hidden': false
          },
          {
            'name': '抖音',
            'label': 'douyin',
            'value': '',
            'hidden': false
          },
          {
            'name': '网易云音乐',
            'label': 'wangyi',
            'value': '',
            'hidden': false
          },
          {
            'name': '知乎',
            'label': 'zhihu',
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
            'name': '微信',
            'label': 'wechat',
            'value': '',
            'hidden': false
          },

          {
            'name': 'Instagram',
            'label': 'ins',
            'value': '',
            'hidden': false
          },

        ],
        qrcode: '',
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
        _this.qrcode = canvas.toDataURL('image/png', 0)
        _this.loading = false
        _this.show_form = false
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
      this.loading = true;
      for (var i = 0; i < this.accountList.length; i++) {
        if (!this.accountList[i].value) {
          this.accountList[i].hidden = true
        }
      }
      this.show_down_load = true;
      window.scrollTo(0,0);
      setTimeout(res => {
        this.downLoad()
      }, 500);
      
   },
  },

  events: {
  }

}
</script>
<style scope>

@import '../styles/index.css';
.bk_yellow {
  background-color: #ffdc68;
  border-radius: 8px;
}
.img_second {
  width: 30px!important;
  height: 30px!important;
}
.login_cont h1 {
  font-size: 46px;
  font-weight: bold;
  letter-spacing: -1.11px;
  color: #303030;
  text-align: center;
  padding: 36px 0;
}
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
  justify-content: center;
  flex-direction: column;
}
.qrcode_down_wrap p{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: rgba(0,0,0,.5);
    line-height: 40px;
    font-size: 24px;
    color: #FFF
}

input::-webkit-input-placeholder { /* WebKit browsers */
  /*//color: #FFF;*/
  font-size: 16px;
}

.login_item {
  padding: 16px 0;
  margin-left: 14px;
  margin-right: 0;
  overflow: hidden;
  display: flex;
  font-family: PingFang-SC;
  color: #303030;
  /*justify-content:space-between;*/
  box-shadow: inset 0 -1px 0 0 #868686; 
}
.login_item:last-child{
    border-bottom: none;
}
.login_item_right {
  display: flex;
  align-items: center;
  /*flex-direction: column;*/
  flex-grow: 1;
  flex-wrap:  wrap  
}
.login_item img {
  width: 50px;
  height: 50px;
  padding-right: 12px;
}
.login_item input {
  background: none;
  -webkit-appearance:none;
  border: none;
  font-size: 18px;
  line-height: 18px;
  outline:none;
  width: 100%;
}

.login_item span {
  font-style: normal;
  line-height: 40px;
  font-size: 24px;
}
.share_bottom {
  display: flex;
  justify-content: flex-end;
  align-items: center
}
.share_bottom p {
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.21px;
  text-align: right;
  color: #303030;
}
.share_bottom_left_ {
  display: flex;
  align-items: right;
  flex-direction: column;
   justify-content: center;
  height: 60px; 
  padding-right: 5px;
}
</style>

