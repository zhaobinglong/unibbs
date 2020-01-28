<template>

  <div class='record' v-if="list.length">
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
    <Empty text="您还没有业绩"/>
  </div>
</template>

<script>
import { getAllOrders, getSellerByPhone } from '@/api/index'
import Empty from '@/components/empty'
export default {
  
  components: {
    Empty
  },
  data () {
    return {
      list: [],
      userInfo: {
        phone: '',
        identify_number: ''
      },

    }
  },

  mounted:function(){
    
  },
  // 组件被激活时调用
  activated:function(){
    let phone = localStorage.getItem('phone')
    getSellerByPhone({phone_number: phone}).then(res => {
      console.log(res)
      if (res) {
        localStorage.setItem('userInfo', res)
        this.userInfo = res
        this.getAllOrders(res)
      }
    })
  },
  methods: {
    getAllOrders(data) {
      getAllOrders(data).then(res => {
        this.list = res.filter(item => {
          if (this.userInfo.identify_number === item.channel) {
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
          }
        })
        Sentry.setExtra('data', this.list)
        Sentry.captureMessage('查询业绩','info');
      })
    },
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
.record {
  background-color: #ededed;
}

</style>
