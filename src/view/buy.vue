<template>

  <div class="buy_wrap">
    <img src="../assets/v2/buy/1.png" class="buy">
    <div class="buy_form">
      <div class="buy_form_title">投保人信息(监护人)</div>
      <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
              <div class="weui-cell__bd">姓名</div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="text" placeholder="请输入姓名"  v-model="form.parent.insuredName"/>
              </div>
          </div>
          <div class="weui-cell weui-cell_select ">
              <div class="weui-cell__bd">
                  <select class="weui-select"  v-model="form.parent.identifyType" >
                      <option :value="item.value" v-for="item in types">{{ item.name }}</option>
                  </select>
              </div>
          </div>
          <div class="weui-cell">
              <div class="weui-cell__bd">证件号码</div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="text"  placeholder="请输入证件号码" v-model="form.parent.identifyNumber"/>
              </div>
          </div>
          <div class="weui-cell" >
              <div class="weui-cell__bd">手机号码</div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="number" placeholder="请输入手机号码"  v-model="form.parent.phoneNumber"/>
              </div>
          </div>
      </div>
    </div>
    <div>
      <div class="weui-cells__title">家庭地址</div>
      <div class="weui-cells">
        <div class="weui-cell" >
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请选择省市区"  v-model="form.address" style="text-align: left" @focus="inputAddress"/>
            </div>
        </div>
        <div class="weui-cell" >
            <!-- <div class="weui-cell__bd"></div> -->
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请输入家庭详细地址"  v-model="form.detail_address" style="text-align: left"/>
            </div>
        </div>
      </div>
    </div>

    <div class="buy_form">
      <div class="buy_form_title">被保险人信息(少儿)</div>
      <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
              <div class="weui-cell__bd">姓名</div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="text" placeholder="请输入姓名"  v-model="form.child.insuredName"/>
              </div>
          </div>
          <div class="weui-cell weui-cell_select ">
              <div class="weui-cell__bd">
                  <select class="weui-select"  v-model="form.child.identifyType" >
                      <option :value="item.value" v-for="item in types">{{ item.name }}</option>
                  </select>
              </div>
          </div>
          <div class="weui-cell">
              <div class="weui-cell__bd">证件号码</div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="text"  placeholder="请输入证件号码" v-model="form.child.identifyNumber"/>
              </div>
          </div>
          <div class="weui-cell" >
              <div class="weui-cell__bd">保障期限</div>
              <div class="weui-cell__ft" style="font-size: inherit;">一年</div>
          </div> 
      </div>
    </div>
    <div class="buy_form">
<!--       <div class="buy_form_item">
        <div>理赔须知</div>
        <span class='me_item_right'></span>
      </div> -->
      <div class="buy_form_title">方案选择</div>
      <div class="weui-tab">
            <div class="weui-navbar" >
                <div class="weui-navbar__item" v-bind:class="{'weui-bar__item_on_custome': current_index == '1'}" @click="clickBar('1')">
                    81元
                </div>
                <div class="weui-navbar__item" v-bind:class="{'weui-bar__item_on_custome': current_index == '2'}" @click="clickBar('2')">
                    156元
                </div>
            </div>
            <div class="weui-tab__panel">
              <div class="weui-cells" style="margin-top: 0">
                <div class="weui-cell" v-for="item in current_level">
                    <div class="weui-cell__bd">
                      <p style="white-space: nowrap; width: 120px; text-align: center">{{ item.title }}</p></div>
                    <div class="weui-cell__ft" style="white-space: pre-line; text-align: left">{{ item.value }}</div>
                </div>
              </div>
            </div>
        </div>
    </div> 
    <div style="font-size: 0">
      <img src="../assets/v2/buy/2.jpeg" class="buy">
      <img src="../assets/v2/buy/3.jpeg" class="buy">
      <img src="../assets/v2/buy/4.jpeg" class="buy">
      <img src="../assets/v2/buy/5.jpeg" class="buy">
    </div>

    <ButtonFooter @clickHandle="buy" :text="button_text" />

    <div class="selectAddress" v-if="show_address_select">
      <div class="selectAddress_content">
        <v-distpicker type="mobile" @selected="onSelected" :static-placeholder="staticPlaceholder" ></v-distpicker>
      </div>
    </div>
  </div>
</template>

<script>

import moment  from 'moment'
import ButtonFooter from '@/components/buttonFooter'
import VDistpicker from 'v-distpicker'
import { sellerRegister } from '@/api/index'
export default {
  components: {
    ButtonFooter,
    'v-distpicker': VDistpicker
  },
  data () {
    return {
      button_text:"下一步",
      staticPlaceholder: false,
      show_address_select: false,
      obj:{
        avatarUrl: ''
      },
      level1: [
        {value: '走失地点3至100公里（商圈，机场，车站，码头交通枢纽）。', title: '寻人范围'},
        {value: '及时找寻服务：失联一小时内，在走失地点3至100公里进行110万人次时时广告发布。\r\n跟踪找寻服务：持续3天，扩大范围至300公里进行110万人次持续广告发布。', title: '寻人启事发布'},
        {value: '提供5000元搜救补偿金，激励好心人帮助寻找，提供线索者可均分搜救补偿金。', title: '悬赏寻人'}
      ],
      level2: [
        {value: '走失地点3至300公里（商圈，机场，车站，码头交通枢纽）。', title: '寻人范围'},
        {value: '及时找寻服务：失联一小时内，在走失地点3至300公里进行220万人次时时广告发布。\n跟踪找寻服务：持续3天，扩大范围至500公里进行220万人次持续广告发布。', title: '寻人启事发布'},
        {value: '提供10000元搜救补偿金，激励好心人帮助寻找，提供线索者可均分搜救补偿金。', title: '悬赏寻人'}
      ],
      current_level: [
        {value: '走失地点3至100公里（商圈，机场，车站，码头交通枢纽）。', title: '寻人范围'},
        {value: '及时找寻服务：失联一小时内，在走失地点3至100公里进行110万人次时时广告发布。\r\n跟踪找寻服务：持续3天，扩大范围至300公里进行110万人次持续广告发布。', title: '寻人启事发布'},
        {value: '提供5000元搜救补偿金，激励好心人帮助寻找，提供线索者可均分搜救补偿金。', title: '悬赏寻人'}
      ],
      current_index: '1',
      form: {
        parent: {
          insuredName: '',
          insuredType: '1', //1是投保人 2是被保险人
          identifyNumber: '',
          identifyType: '01', // 证件类型
          phoneNumber: '',
          postAddress: '',

        },
        child: {
          insuredName: '',
          insuredType: '2', //1是投保人 2是被保险人
          identifyNumber: '',
          identifyType: '01', // 证件类型
          phoneNumber: '',
          postAddress: ''
        },
        address: '',
        detail_address: '',
        planCode: 'JCV4500001',
        channel: ''
      },
      types: [
       {name: '身份证',value: '01'},
       {name: '户口本',value: '02'},
       {name: '护照',value: '03'},
       {name: '军人证件',value: '04'},
       {name: '港澳居民身份证',value: '07'},
       {name: '港澳居民来往内地通行证',value: '25'},
       {name: '台湾居民来往内地通行证',value: '26'},
       {name: '港澳台居民居住证',value: '17'}
      ]
    }
  },

  mounted:function(){
    this.current_level = this.level1
  },


  activated:function(){
    // 拿到之前保存的保单信息
    let form = JSON.parse(localStorage.getItem('order'))
    if (form) {
      this.form = form
    }


    // 判断url中的手机号码，如果不存在，使用默认的渠道
    if (this.$route.params.phone_number.length != 11) {
      this.form.handlerCode = '18271906' //默认HR销售-常婧雯
      if (this.$route.params.phone_number == 'add') {
        this.$route.params.phone_number = '归巢科技'  // 默认渠道值为归巢科技
      }
      this.form.channel = this.$route.params.phone_number 
      this.form.comCode = '45010200' // 默认归属机构代码
      this.form.makeCode = '45010200' // 默认出单机构代码,
      return false
    }
    
    // 手机号码存在，使用数据库中保存的销售信息
    sellerRegister({phone_number: this.$route.params.phone_number}).then(data => { 
       console.log(data)
       if(data) {
         // handlerCode必须填写HR正式销售人员的代码
         // channel则为谁的保单，就是谁的身份证号码，
         this.form.handlerCode = data.user_code
         this.form.channel = data.identify_number
         this.form.comCode = data.team_code // 归属机构代码
         this.form.makeCode = data.team_code // 出单机构代码,

         // 异常情况下没有team_code，给出提示
         if(!data.team_code) {
            this.$vux.toast.show({
             text: '归属团队不存在',
             type: 'cancel',
             time: 2000
            })
         }
       } else {
        this.$vux.toast.show({
         text: '二维码不存在',
         type: 'text'
        })
       }
    })
  },
  methods: {
    inputAddress() {
      this.show_address_select = true
    },
    onSelected(data) {
      console.log(data)
      this.form.address = data.province.value + data.city.value + data.area.value
      this.show_address_select = false
    },
    clickBar(i) {
      let name = 'level' + i
      this.current_index = i
      this.current_level = this[name]
      if (i == '1') {
        this.form.child.level = '保费81元'
      } else {
        this.form.child.level = '保费156元'
      }

      this.form.planCode = 'JCV450000' + i
     },
    buy() {

      if (this.button_text == '此产品备案中 暂时无法购买') {
        this.$vux.toast.show({
         text: '此产品备案中',
         type: 'text'
        })
        return false
      }

       // 归属代码不存在
       if(!this.form.comCode) {
          this.$vux.toast.show({
           text: '归属团队不存在',
           type: 'text'
          })
          return false
       }

      if(!this.form.parent.insuredName) {
        this.$vux.toast.show({
         text: '请输入姓名',
         type: 'text'
        })
        return false
      }

      if(!this.form.parent.identifyNumber) {
        this.$vux.toast.show({
         text: '请输入证件号码',
         type: 'text'
        })
        return false
      } else {
        this.form.parent.identifyNumber = this.form.parent.identifyNumber.replace(/ /g,'')
      }

      let is_phone=/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.form.parent.phoneNumber)

      if(!is_phone) {
        this.$vux.toast.show({
         text: ' 手机号码错误',
         type: 'text'
        })
        return false
      }

      if(!this.form.detail_address) {
        this.$vux.toast.show({
         text: '请输入地址',
         type: 'text'
        })
        return false
      }

      if(!this.form.child.insuredName) {
        this.$vux.toast.show({
         text: '请输入儿童姓名',
         type: 'text'
        })
        return false
      }

      if(!this.form.child.identifyNumber) {
        this.$vux.toast.show({
         text: '请输入证件号码',
         type: 'text'
        })
        return false
      } else {
        this.form.child.identifyNumber = this.form.child.identifyNumber.replace(/ /g,'')
      }

      // 超过12岁的儿童不能购买保险

      // if(this.form.child.is_school && !this.form.child.banjiName) {
      //   this.$vux.toast.show({
      //    text: '请输入班级',
      //    type: 'text'
      //   })
      //   return false
      // }
      
      this.form.parent.postAddress = this.form.address + this.form.detail_address
      this.form.child.postAddress = this.form.parent.postAddress
      this.form.child.phoneNumber = this.form.parent.phoneNumber

      localStorage.setItem('order', JSON.stringify(this.form))

      Sentry.setExtra('data', this.form)
      Sentry.captureMessage('保险资料填写完毕','info');
      this.$router.push({'path':'/check'})
    }

  }

}
</script>

<style >
.red{
  color: red;
}
img {
  font-size: 0
}

.weui-cells_form {
  margin-top: 0!important;
  padding-top: 0
}
.weui-bar__item_on_custome {
  background-color: #83c7d4;
  color: #FFF;
}
.weui-input {
  text-align: right
}
.weui-select {
  padding-left: 0;
  height: auto;
  line-height: 24px;
}
.weui-navbar {
  z-index: 1;
}
.buy_wrap {
  background-color: #f3f3f3;
  padding-bottom: 50px;
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
.weui-cell input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.5);
}
.distpicker-address-wrapper select {
  width: 33%!important
}
.myAddress {
  display: flex;
}
.myAddress select{
    padding: .5rem .75rem;
    height: 40px;
    font-size: 1rem;
    line-height: 1.25;
    color: #464a4c;
    background-color: #fff;
    border: none;
    width: 32%;
    padding: 0
}
.selectAddress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.5);
  z-index: 99
}
.selectAddress_content {
  background: #FFF;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.address-container {
  overflow-y:scroll;
  height: 500px;
}
</style>
