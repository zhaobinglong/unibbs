<template>
  <div class="userForm" v-if="!show_form">
    <div class="user_type">
      <div class="user_type_item" @click="userSelect('HR销售人员')">内部员工</div>
      <div class="user_type_item" @click="userSelect('外部员工')">外部员工</div>
    </div>
  </div>
  <div class="userForm" v-else >
    <div class="buy_form">
      <div class="weui-cells__title">信息填写</div>
      <div class="weui-cells weui-cells_form">
          <div class="weui-cell weui-cell_select">
              <!-- <div class="weui-cell__bd">员工类型</div> -->
              <div class="weui-cell__bd" style="text-align:right">
                  <!-- {{ form.user_classify }} -->
                <select class="weui-select" name="select1" v-model="form.user_classify" v-if="form.user_classify === '外部员工'">
                    <option value="外部员工">外部员工</option>
                </select>
                <select class="weui-select" name="select1" v-model="form.user_classify" v-else>
                    <option value="HR销售人员">HR销售人员</option>
                    <option value="非HR销售人员">非HR销售人员</option>
                </select>
              </div>
          </div>
          <div class="weui-cell">
              <div class="weui-cell__bd">姓名</div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="text" placeholder="请输入"  v-model="form.user_name"/>
              </div>
          </div>
          <div class="weui-cell">
              <div class="weui-cell__bd">HR号</div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="text" placeholder="请输入"  v-model="form.user_code"  @blur="selectSeller"/>
              </div>
          </div>
          <div v-if="form.user_classify !== '外部员工' " style="border-top: 1px solid #D9D9D9">

            <div class="weui-cell  weui-cell_select weui-cell_select-after">
                <div class="weui-cell__bd">市公司名称</div>
                <div class="weui-cell__db">
                    <!-- <input class="weui-input" type="text" placeholder="请输入"  v-model="form.company_name"/> -->
                  <select class="weui-select text_over" dir="rtl"   v-model="form.company_name" style="padding-right: 10px;"  @change="selectCompany">
                    <option value='' disabled selected >请选择</option>
                    <option :value="item.company_name" v-for="item in companys">{{ item.company_name }}</option>
                  </select>
                </div>
            </div>
<!--             <div class="weui-cell">
                <div class="weui-cell__bd" >市公司代码</div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="请输入"  v-model="form.company_code"/>
                </div>
            </div> -->
<!--             <div class="weui-cell">
                <div class="weui-cell__bd">支公司代码</div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="请输入"  v-model="form.sub_company_code"/>
                </div>
            </div> -->
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__bd">支公司名称</div>
<!--                 <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入"  v-model="form.sub_company_name"/>
                </div> -->
                <div class="weui-cell__db">
                    <!-- <input class="weui-input" type="text" placeholder="请输入"  v-model="form.company_name"/> -->
                  <select class="weui-select text_over" dir="rtl"  v-model="form.sub_company_name" style="padding-right: 10px; width: 200px" @change="selectSubCompany">
                    <option value='' disabled selected >请选择</option>
                    <option :value="item.sub_company_name" v-for="item in sub_company">{{ item.sub_company_name }}</option>
                  </select>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">归属团队/部门代码</div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入"  v-model="form.team_code"/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">归属团队/部门名称</div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入"  v-model="form.team_name"/>
                </div>
            </div>
          </div>
<!--           <div class="weui-cell weui-cell_select ">
              <div class="weui-cell__bd">
                  <select class="weui-select"  v-model="form.parent.identifyType" >
                      <option :value="item.value" v-for="item in types">{{ item.name }}</option>
                  </select>
              </div>
          </div> -->
          <div class="weui-cell">
              <div class="weui-cell__bd">身份证号码</div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="text"  placeholder="请输入" v-model="form.identify_number"/>
              </div>
          </div>
          <div class="weui-cell">
              <div class="weui-cell__bd">银行卡号码</div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="number"  placeholder="请输入" v-model="form.bank_code"/>
              </div>
          </div>
          <div class="weui-cell">
              <div class="weui-cell__bd">开户行</div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="text"  placeholder="请输入" v-model="form.bank_name"/>
              </div>
          </div>
          <div class="weui-cell" >
              <div class="weui-cell__bd">手机号码</div>
              <div class="weui-cell__bd" style="text-align:right">
                  {{ form.phone_number }}
              </div>
          </div>
      </div>
    </div>
<!--     <div>
      <div class="weui-cells__title">家庭地址</div>
      <div class="weui-cells">
        <div class="weui-cell" >
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请选择省市区"  v-model="form.address" style="text-align: left" @focus="inputAddress"/>
            </div>
        </div>
        <div class="weui-cell" >
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请输入家庭详细地址"  v-model="form.detail_address" style="text-align: left"/>
            </div>
        </div>
      </div>
    </div> -->

     <ButtonFooter @clickHandle="sellerApply" text="提交" />

     <div class="selectAddress" v-if="show_address_select">
      <div class="selectAddress_content">
        <v-distpicker type="mobile" @selected="onSelected" :static-placeholder="staticPlaceholder" ></v-distpicker>
      </div>
     </div>
  </div>
</template>

<script>

import ButtonFooter from '@/components/buttonFooter'
import VDistpicker from 'v-distpicker'
import { sellerRegister, sellerApply, getCompanys, getSellerByCode } from '@/api/index'
export default {
  components: {
    ButtonFooter,
    'v-distpicker': VDistpicker
  },
  data () {
    return {
      show_form: false,
      staticPlaceholder: false,
      show_address_select: false,
      companys: [],
      sub_company: [],
      company_name: '',
      loading: false, // 正在保存用户信息
      form: {
        user_classify: '',
        user_name: '',
        user_code: '',
        user_param: '',
        user_office: '',
        user_type: '',
        user_post: '',
        user_trans_code: '',
        company_code: '',
        company_name: '',
        sub_company_code: '',
        sub_company_name: '',
        team_code: '',
        team_name: '',
        team_type: '',
        bank_code: '',
        bank_name: '',
        identify_number: '',
        phone_number: '',
        user_rules: '销售人员' // 用户权限，默认为销售人员
      }
    }
  },

  mounted:function(){
    // this.current_level = this.level1
    // if (this.$route.params.id == 'add') {
    //   return false
    // }
    // sellerApply({phone: this.$route.params.user_code}).then(data => { 
    //    console.log(data)
    //    if(data) {
    //      // user_code长度为6，则为编外员工，非正式员工
    //      if (data.user_code.length == 6) {
    //        this.form.handlerCode = data.user_trans_code
    //      } else {
    //        this.form.handlerCode = data.user_code
    //      }
    //      this.form.channel = data.company_code
         
    //    } else {
    //     this.$vux.toast.show({
    //      text: '工号不存在',
    //      type: 'text'
    //     })
    //    }
    // })
    getCompanys().then(res => {
      this.companys = this.uniqueCompany(res)
      if(this.form.company_name) {
        this.selectCompany()
      }
    })
  },
  // 组件被激活时调用
  activated:function(){
    this.show_form = false
    this.loading = false
    this.form.phone_number = localStorage.getItem('phone')
    // 根据用户手机号码，查询它已经注册的信息
    sellerRegister(this.form).then(data => { 
       console.log(data)
       if (data) {
        this.form = data
        if (data.company_name && this.companys.length) {
          this.selectCompany()
        }
       }
    })
  },
  selectCompany(e) {
    this.companys.map(item => {
      if (item.company_name == this.form.company_name) {
        this.form.company_name = item.company_name
        this.form.company_code = item.company_code
        this.sub_company = item.sub_company
      }
    })
  },
  methods: {
    selectCompany(e) {
      this.companys.map(item => {
        if (item.company_name == this.form.company_name) {
          console.log(item)
          this.form.company_name = item.company_name
          this.form.company_code = item.company_code
          this.sub_company = item.sub_company
        }
      })
    },
    selectSubCompany() {
      this.sub_company.map(item => {
        if (item.sub_company_name == this.form.sub_company_name) {
          this.form.sub_company_code = item.sub_company_code
        }
      })
    },
    uniqueCompany(arr) {
      let res = []
      for (var i = 0; i < arr.length; i++) {
        if (res.length) {
          if (arr[i].company_code != arr[i-1].company_code) {
            res.push({
              company_code: arr[i].company_code,
              company_name: arr[i].company_name,
              sub_company: [{
                sub_company_code: arr[i].sub_company_code,
                sub_company_name: arr[i].sub_company_name,
              }]
            })
          } else {
            res[res.length-1].sub_company.push({
              sub_company_code: arr[i].sub_company_code,
              sub_company_name: arr[i].sub_company_name,
            })
          }
        } else {
          res.push({
            company_code: arr[0].company_code,
            company_name: arr[0].company_name,
            sub_company: [{
              sub_company_code: arr[0].sub_company_code,
              sub_company_name: arr[0].sub_company_name,
            }]
          })
        }
      }
      return res
    },
    
    // 非HR销售用户，输入HR号码完毕后，前端要自动去获取该号码对应的其他信息
    selectSeller() {
      if (this.form.user_classify === 'HR销售人员') {
        return false
      }

      if (this.form.user_code.length) {
        getSellerByCode(this.form).then(data => { 
           console.log(data)
           if(data) {
             this.form.team_code = data.team_code
             this.form.team_name = data.team_name
             this.form.company_code = data.company_code
             this.form.company_name = data.company_name
             this.form.sub_company_code = data.sub_company_code
             this.form.sub_company_name = data.sub_company_name
           } else {
            let str = 'HR号不存在'
            this.$vux.toast.show({
             text: str,
             type: 'text'
            })
           }
        })
      }
    },
    
    // 选择是正式员工还是编外员工
    userSelect(e) {
       console.log(e)
       this.form.user_classify = e
       this.show_form = true
    },
    inputAddress() {
      this.show_address_select = true
    },
    onSelected(data) {
      console.log(data)
      this.form.address = data.province.value + data.city.value + data.area.value
      this.show_address_select = false
    },

    // 提交用户注册的信息
    sellerApply() {      
      if (this.loading) {
        return false
      }
      
      if(!this.form.user_name) {
        this.$vux.toast.show({
         text: '请输入姓名',
         type: 'text'
        })
        return false
      }

      if(!this.form.user_code) {
        this.$vux.toast.show({
         text: '请输入HR号',
         type: 'text'
        })
        return false
      }

      if(!this.form.company_name && this.form.user_classify === 'HR销售人员') {
        this.$vux.toast.show({
         text: '请选择市公司',
         type: 'text'
        })
        return false
      }

      if(!this.form.sub_company_name && this.form.user_classify === 'HR销售人员') {
        this.$vux.toast.show({
         text: '请选择支公司',
         type: 'text'
        })
        return false
      }

      if(!this.form.team_code && this.form.user_classify === 'HR销售人员') {
        this.$vux.toast.show({
         text: '请输入部门代码',
         type: 'text'
        })
        return false
      }

      if(!this.form.team_code && this.form.user_classify === '非HR销售人员') {
        this.$vux.toast.show({
         text: '请检查HR号',
         type: 'text'
        })
        return false
      }

      if(!this.form.identify_number) {
        this.$vux.toast.show({
         text: '请输入证件号码',
         type: 'text'
        })
        return false
      }

      // if(!this.form.child.identifyNumber) {
      //   this.$vux.toast.show({
      //    text: '请输入证件号码',
      //    type: 'text'
      //   })
      //   return false
      // }

      let is_phone=/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.form.phone_number)

      if(!is_phone) {
        this.$vux.toast.show({
         text: ' 手机号码错误',
         type: 'text'
        })
        return false
      }

      this.$vux.loading.show({
       text: '保存中···'
      })
      this.loading = true
      
      // 用户来源 register：主动注册 import：管理员导入
      this.form.user_from = 'register' 
      sellerApply(this.form).then(data => { 
        console.log(data)
        Sentry.setExtra('data', {...this.form, ...data})
        Sentry.captureMessage('用户注册','info');
        setTimeout(() => {
          this.$vux.loading.hide()
          if(data) {
              console.log(data)
              this.$vux.toast.show({
               text: '保存成功',
               type: 'text'
              })
              setTimeout(() => {
                this.loading = false
                this.$router.push({'path':'/seller'})
              }, 1000)
          } else {
            this.$vux.toast.show({
             text: '注册失败',
             type: 'text'
            })
          }

        }, 1000)
      })

    }

  }

}
</script>

<style scoped>
.text_over {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

}
.user_type {
  background: #83c7d4;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

}
.user_type_item {
  width: 100px;
  background: #FFF;
  color: #83c7d4;
  border-radius: 50%;
  text-align: center;
  line-height: 100px;
  margin: 20px;
  font-size: 18px;
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
.userForm {
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
