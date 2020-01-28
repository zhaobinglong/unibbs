<template>

  <div class="buy_wrap">
    <img src="../assets/buy/1.jpeg" class="buy">
    <img src="../assets/buy/2.jpeg" class="buy">
    <img src="../assets/buy/3.jpeg" class="buy">
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
      <div class="buy_form_title">保险方案</div>
      <div class="weui-tab">
            <div class="weui-navbar" >
                <div class="weui-navbar__item" v-bind:class="{'weui-bar__item_on_custome': current_index == '2'}" @click="clickBar('2')">
                    156元
                </div>
            </div>
            <div class="weui-tab__panel">
              <div class="weui-cells" style="margin-top: 0">
                <div class="weui-cell" v-for="item in current_level">
                    <div class="weui-cell__bd"><p>{{ item.title }}</p></div>
                    <div class="weui-cell__ft">{{ item.value }}</div>
                </div>
              </div>
            </div>
        </div>
    </div>
     <ButtonFooter @clickHandle="buy" text="下一步" />

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
      staticPlaceholder: false,
      show_address_select: false,
      obj:{
        avatarUrl: ''
      },
      level1: [
        {value: '25000元', title: '合计保额'},
        {value: '5000元', title: '搜救补偿金'},
        {value: '3公里至100公里', title: '寻人范围'},
        {value: '20000元', title: '寻人启事发布费'}
      ],
      level2: [
        {value: '50000元', title: '合计保额'},
        {value: '10000元', title: '搜救补偿金'},
        {value: '3公里至300公里', title: '寻人范围'},
        {value: '40000元', title: '寻人启事发布费'}
      ],
      current_level: [
        {value: '50000元', title: '合计保额'},
        {value: '10000元', title: '搜救补偿金'},
        {value: '3公里至300公里', title: '寻人范围'},
        {value: '40000元', title: '寻人启事发布费'}
      ],
      current_index: '2',
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
    this.current_level = this.level2
  },

  // 组件被激活时调用
  activated:function(){
    // 拿到之前保存的保单信息
    let form = JSON.parse(localStorage.getItem('order'))
    if (form) {
      this.form = form
    }

    this.form.handlerCode = '18271906'
    this.form.channel = ''
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

      fundebug.notify("BuyNext", "保险资料填写", {
          metaData: this.form
      });
      this.$router.push({'path':'/check'})
    }

  }

}
</script>

<style >
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
