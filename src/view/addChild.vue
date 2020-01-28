<template>

  <div class="child_edit">
    <div class="buy_form">
      <div class="weui-cells__title">编辑儿童档案</div>
      <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
              <div class="weui-cell__bd">照片</div>
              <div class="weui-cell__ft" >
                  <div class="photo" >
                    <Upload @uploadSuccess="uploadSuccess" v-bind:imgSrc="form.cover_img" />
                  </div>
              </div>
          </div>
          <div class="weui-cell">
              <div class="weui-cell__bd">姓名</div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="text" placeholder="请输入姓名"  v-model="form.name"/>
              </div>
          </div>
          <div class="weui-cell weui-cell_select ">
              <div class="weui-cell__bd">
                  <select class="weui-select"  v-model="form.gender" >
                      <option :value="item" v-for="item in types">{{ item }}</option>
                  </select>
              </div>
          </div>
          <div class="weui-cell">
              <div class="weui-cell__bd">证件号码</div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="number"  placeholder="请输入证件号码" v-model="form.code"/>
              </div>
          </div>

<!--           <div class="weui-cell" >
              <div class="weui-cell__bd">家庭住址</div>
              <div class="weui-cell__bd">
                  <input class="weui-input" type="text" placeholder="请输入家庭住址"  v-model="form.parent.address"/>
                  <v-distpicker></v-distpicker>
              </div>
          </div> -->
      </div>
    </div>

     <ButtonFooter @clickHandle="saveInfo" text="保存" />
  </div>
</template>

<script>
import { userAddChild, getChild } from '@/api/index'
import moment  from 'moment'
import ButtonFooter from '@/components/buttonFooter'
import Upload from '@/components/upload'
import VDistpicker from 'v-distpicker'
import { EventBus } from "../bus/event-bus.js";
export default {
  components: {
    ButtonFooter,
    'v-distpicker': VDistpicker,
    Upload
  },
  data () {
    return {
      form: {
        name: '',
        code: '',
        gender: '男',
        address: '',
        phone: '',
        province: '省',
        city: '市',
        area: '区',
        cover_img: ''
      },
      cover_img: '',
      types: ['男','女'],
    }
  },

  mounted:function(){
    // EventBus.$on("editChild", (r) => {
    //   this.form = r
    // });
  },
  created: function(){

  },
  // 组件被激活时调用
  activated:function(){
    let phone = localStorage.getItem('phone')
    getChild({phone: phone}).then(data => { 
      data.map(x => {
        if (x.id === this.$route.params.id) {
          this.form = x
        }
      })
    })
    if (this.$route.params.id === 'add') {
      this.form = {
        name: '',
        code: '',
        gender: '男',
        address: '',
        phone: '',
        province: '省',
        city: '市',
        area: '区',
        cover_img: 'https://unibbs-1251120507.cos.ap-beijing.myqcloud.com/bird/1557142678390.png'
      }
    }
  },
  methods: {
    uploadSuccess(path) {
      console.log(path)
      this.form.cover_img = path
    },

    saveInfo() {
      if(!this.form.cover_img) {
        this.$vux.toast.show({
         text: '请添加照片',
         type: 'text'
        })
        return false
      }

      if(!this.form.name) {
        this.$vux.toast.show({
         text: '请输入姓名',
         type: 'text'
        })
        return false
      }

      if(!this.form.code) {
        this.$vux.toast.show({
         text: '请输入证件号码',
         type: 'text'
        })
        return false
      }
      
      // 档案信息和手机号码关联
      this.form.parent = localStorage.getItem('phone')
      userAddChild(this.form).then(data => { 
         console.log(data)
         if(data) {
           this.$vux.loading.hide() 
           this.toast = true
           this.$router.back()
         }
      })
    }

  }

}
</script>

<style scoped>
.photo {
  width: 100px;
  height: 100px;
  border-radius: 50%
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
</style>
