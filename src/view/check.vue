<template>

<div class="check">
<div class="weui-form-preview">
    <div class="weui-form-preview__hd">
        <label class="weui-form-preview__label">投保人信息(监护人)</label>
        <em class="weui-form-preview__value" style="color: #FFF">-</em>

    </div>
    <div class="weui-form-preview__bd">
        <p v-for="(value, key, index)  in form.parent" v-if="key != 'identifyType' && key != 'insuredType'" class="weui-check_p">
            <label class="weui-form-preview__label">{{ value }}</label>
            <span class="weui-form-preview__value"  @click="change">修改</span>
        </p>
    </div>
</div>
<div class="weui-form-preview">
    <div class="weui-form-preview__hd">
        <label class="weui-form-preview__label">被保险人信息(少儿)</label>
        <em class="weui-form-preview__value" style="color: #FFF">-</em>
    </div>
    <div class="weui-form-preview__bd">
        <p v-for="(value, key, index)  in form.child" v-if="key != 'is_school' && key != 'identifyType' &&  key != 'insuredType' && value && key != 'postAddress' && key != 'phoneNumber'">
            <label class="weui-form-preview__label">{{ value }}</label>
            <span class="weui-form-preview__value" @click="change">修改</span>
        </p>
    </div>
</div>
  <div>
      <label for="weuiAgree" class="weui-agree">
        <input id="weuiAgree" type="checkbox" class="weui-agree__checkbox" v-model="rule" />
        <span class="weui-agree__text">
          本人承诺：本人已认真阅读并理解
          <a href="http://guichaokeji.com/bird-api/doc/toubao.html">《投保须知》</a>、
          <a href="http://guichaokeji.com/bird-api/doc/baoxian.html">《保险条款》</a>、
          <a href="http://guichaokeji.com/bird-api/doc/xieyi.html">《平台服务协议内容》</a>、
          <a href="http://guichaokeji.com/bird-api/doc/gaozhishu.html">《广东广福宏宇保险经纪有限公司客户告知书》</a>、
          <a href="http://guichaokeji.com/bird-api/doc/weituoxieyi.html">《保险经纪服务委托书》</a>全部内容。
          <br/>本人同意：
          <br/>1、如案件最后经公安机关认定为被保险人自行离家出走，即认为该案件不属于本产品的保障范围，保险人有权向投保人追偿已支付的赔款。
          <br/>2、如果未按本页面要求填写个人信息，或所填的信息非真实有效，则不享受本产品保险保障。
          <br/>
          <span>本平台仅提供技术支持，所有保险产品的销售、理赔等服务均由广东广福宏宇保险经纪有限公司提供。</span>
        </span>
      </label>
    </div>
    <div id="loadingToast" v-if="buyLoading" >
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-loading weui-icon_toast"></i>
            <p class="weui-toast__content">正在下单</p>
        </div>
    </div>
     <ButtonFooter @clickHandle="buy" text="我要投保" />
  </div>
</template>

<script>

import ButtonFooter from '@/components/buttonFooter'
import {createrOrder} from '@/api/index'
import { EventBus } from "../bus/event-bus.js";
export default {
  components: {
    ButtonFooter
  },
  data () {
    return {
      form: {},
      buyLoading: false,
      rule: false,
      types: [
       {name: '身份证',value: '01'},
       {name: '户口本',value: '02'},
       {name: '护照',value: '03'},
       {name: '军人证件',value: '04'},
       {name: '港澳居民身份证',value: '07'},
       {name: '港澳居民来往内地通行证',value: '25'},
       {name: '台湾居民来往内地通行证',value: '26'},
       {name: '港澳台居民居住证',value: '17'}
      ],
      error_message_map:{
        '0': '网络超时',
        '1': '归属关系错误',
        '2': '渠道码信息不符',
        '27': '年龄超过12岁',
        '44': 'HR没有权限'
      }
    }
  },

  mounted:function(){
    
  },
  // 组件被激活时调用
  activated:function(){
    let form = JSON.parse(localStorage.getItem('order'))
    console.log(form)

    this.form = form
    
    this.form.handler1Code = form.handlerCode // 归属业务员代码
    this.form.operatorCode = form.handlerCode  // 操作员业务代码

  },
  methods: {
    change() {
      this.$router.back()
    },

    buy() {
      if(!this.rule) {
        this.$vux.toast.show({
         text: '请勾选协议',
         type: 'text'
        })
        return false
      }
      // this.buyLoading = true
      this.$vux.loading.show({
       text: '下单中···'
      })

      // 下单
      createrOrder(this.form).then(res => {
        this.$vux.loading.hide()
        // fundebug.notify("createOrder", "保单新建结果", {
        //     metaData: res
        // });

        Sentry.setExtra('data', res)
        Sentry.captureMessage('保单新建结果','info');

        // 进入熔断器就没必要继续执行下面的逻辑了
        if (res === '进入熔断器了') {
          this.$vux.toast.show({
           text: res,
           type: 'text'
          })
          return false
        }

        // 下单成功
        if (res.responsehead.error_message == 'Success') {
          localStorage.setItem('responsebody', JSON.stringify(res.responsebody.infos))
          // 订单确认成功后，销毁本地保存的订单信息
          localStorage.removeItem('order')
          this.$router.push({'path':'/success'})
        } else {
          // 下单失败
          let error_message = res.responsehead.error_message
          console.log(error_message.length)
          
          this.$vux.toast.show({
           text: this.error_message_map[error_message.length],
           type: 'text'
          })
        }
      }).catch( (res) => {
        console.log(res);
        this.$vux.loading.hide()
        this.$vux.toast.show({
         text: this.error_message_map[0],
         type: 'text'
        })
      });
      // setTimeout( () => {
      //   this.$router.push({'path':'/success'})
      // }, 500)
    }

  }

}
</script>

<style scoped>
.weui-toast_text {
  width: 10em!important;
}
.check {
  padding-bottom: 50px;
}
.weui-check_p {
  display: flex;
  justify-content:space-between;
  overflow: hidden

}
.weui-form-preview__label {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

}
.weui-form-preview__value {
  white-space: nowrap;
  flex-shrink: 0
}
.weui-cells_form {
  margin-top: 0
}
.weui-input {
  text-align: right
}
.weui-select {
  padding-left: 0;
  height: auto;
  line-height: 24px;
}
.buy_wrap {
  background-color: #f3f3f3;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0
}
.buy_form {
  font-size: 18px;
  margin-bottom: 10px;
  background-color: #FFF
}
.buy_form_title {
  text-align: center;
  line-height: 40px;
  background-color: #f3f3f3;
}
.buy_form_item {
  display: flex;
  justify-content:space-between;
  align-items:center;
  padding: 0 20px;
  box-shadow: inset 0 -1px 0 0 #e6e6e6;
  line-height: 50px;
  position: relative
}

.buy_form_item:last-child{
  box-shadow: none;
}

.buy {
  width: 100%;
  font-size: 0
}
.buy_form_btn {
  line-height: 50px;
  text-align: center;
  background-color: #83c7d4;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  color: #FFF;
  font-size: 20px;
}
.buy_form_rule {
  font-size: 14px;
  color: #38f;
  font-style: normal
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
select {
  text-align: right
}
option {
  text-align: right
}
input::-webkit-input-placeholder { /* WebKit browsers */
    color:    rgba(0, 0, 0, 0.5);
}
input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    rgba(0, 0, 0, 0.5);
}
input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    rgba(0, 0, 0, 0.5);
}
 input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    rgba(0, 0, 0, 0.5);
}

</style>
