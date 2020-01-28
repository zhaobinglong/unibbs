<template>

  <div class='orders'>
      <div class="" v-if="list.length">
            <div class="weui-panel__hd">保单列表</div>
        <div class="weui-form-preview" v-for="item in list" style="margin-bottom: 20px;">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">保费金额</label>
                    <em class="weui-form-preview__value">¥{{  item.planCode | filterPlanCode}}</em>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item" v-if="item.policyno">
                    <label class="weui-form-preview__label" >保单号</label>
                    <span class="weui-form-preview__value">{{ item.policyno}}</span>
                </div>
                <div class="weui-form-preview__item" v-else>
                    <label class="weui-form-preview__label">支付号</label>
                    <span class="weui-form-preview__value">{{ item.exchangeNo }}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">投保人</label>
                    <span class="weui-form-preview__value">{{ item.parent}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">被保险人</label>
                    <span class="weui-form-preview__value">{{ item.child}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">购买日期</label>
                    <span class="weui-form-preview__value">{{ item.flowintime | filterMicroTime}}</span>
                </div>
            </div>
            <div class="weui-form-preview__ft">
                <a class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:">{{ item.error_message ? item.error_message : '' }}</a>
            </div>
        </div>
        </div>
        <div v-else>
          <Empty text=""/>
          <ButtonFooter @clickHandle="add" text="去购买"/>
        </div>
  </div>
</template>

<script>
import ButtonFooter from '@/components/buttonFooter'
import Empty from '@/components/empty'
import { getOrders, checkOrder } from '@/api/index'
import { EventBus } from "../bus/event-bus.js";
export default {
  components: {
    ButtonFooter,
    Empty
  },
  data () {
    return {
      list: [],
      userInfo: {
        phone: ''
      },
      data: {}
    }
  },

  mounted:function(){
    
  },
  // 组件被激活时调用
  activated:function(){
    getOrders({phone: localStorage.getItem('phone')}).then(data => {
      console.log(data)
      let arr = data.map(item => {
        let insuredInfos = item.insuredInfos
        insuredInfos.map(i => {
          if (i.insuredType === '1') {
            item.parent = i.insuredName
          }
          if (i.insuredType === '2') {
            item.child = i.insuredName
          }
        })
        return item
      })
      this.list = arr
      if (arr.length) {
        this.checkOrder(arr, 0)
      }
    })
  },
  destroyed: function(){
    
  },
  methods: {
    add () {
      this.$router.push({
        'path':'/buy'
      })
    },
    checkOrder(arr, index) {
      if (!arr[index].policyno) {
        checkOrder({exchangeno: arr[index].exchangeNo}).then(data => {
          console.log(data)
          if ( data.responsehead && data.responsehead.error_message === "Success") {
            this.$set(this.list[index], 'policyno', data.BODY.policynodatalist.policydata.policyno)
          } else {
            let error_message = ''
            if (data.responsehead) {
              error_message = data.responsehead.error_message
            } else {
              error_message = data
            }
            this.$set(this.list[index], 'error_message', error_message)
          }
          if (index < arr.length - 1 ) {
            this.checkOrder(arr, index + 1)
          }
        })
      } else {
          if (index < arr.length - 1 ) {
            this.checkOrder(arr, index + 1)
          }
      }
    }
  }

}
</script>

<style>
.orders {
  background-color: #ededed;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0
}
</style>
