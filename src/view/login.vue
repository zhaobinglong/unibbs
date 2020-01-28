<template>
    <div class="login">
      <div class="login_cont">
        <div class='logo'>
          <img src="../assets/logo.png" alt="" >
        </div>
        
        <div>

          <div class="login_item">
            <input type="" name="" v-model="form.phone" placeholder="请输入手机号码" @blur="inputBlur">
            <i @click="getCode"> {{ timer }}</i>
          </div>

          <div class="login_item">
            <input type="" name="" v-model="form.code"  placeholder="请输入四位数验证码" style="width: 100%" @blur="inputBlur">
          </div>

          <div class="login_rule">
            <label for="weuiAgree" class="weui-agree">
              <input id="weuiAgree" type="checkbox" class="weui-agree__checkbox" v-model="form.agree">
              <span class="weui-agree__text">
                  我同意<a href="http://guichaokeji.com/bird-api/doc/xieyi.html">《归巢平台用户协议》</a><a href="http://guichaokeji.com/bird-api/doc/yinsi.html">《归巢隐私政策》</a>
              </span>
            </label>
          </div>
          <buttonItem text="登录" @clickHandle="login"/>
        </div>
      </div>
        
      </div>
    </div>
</template>
<style>
</style>
<script>

import buttonItem from '@/components/buttonItem'
import { sendSMS, login } from '@/api/index'
export default {
  components: {
    buttonItem
  },
  data () {
      return {
        timer: '点击获取验证码',
        is_load:false,
        loadContent:'正在添加',
        time:[['01','02','03'],['00', 30,]
        ],
        push_time:['09', '00'],
        showSetBack:false,
        setBackContent:'保存成功',
        showAddress: false,
        form:{
          phone: '',
          code: '',
          agree: false
        },
        seconds: 60
      }
  },
  // 获取定时列表  最多五个
  mounted:function(){

  },
  // 组件被激活时调用
  activated:function(){
  },
  methods:{
    inputBlur() {
      setTimeout(function() {
         let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
         window.scrollTo(0, Math.max(scrollHeight - 1, 0));
         console.log(scrollHeight)
      }, 100);
    },
    login () {
       console.log(this.form)
      if (this.form.phone.length !== 11) {
        this.$vux.toast.show({
         text: '请输入手机号码',
         type: 'text'
        })
        return 
      }

      if (this.form.code.length !== 4) {
        this.$vux.toast.show({
         text: '请输入验证码',
         type: 'text'
        })
        return 
      }    

      if (!this.form.agree) {
        this.$vux.toast.show({
         text: '请勾选用户协议',
         type: 'text'
        })
        return 
      }  

      // this.buyLoading = true
      this.$vux.loading.show({
       text: '登录中···'
      })
      login(this.form).then(res => {
        // 日志记录用户登录信息
        fundebug.notify("Login", "用户登录结果", {
            metaData: this.form
        });
        this.$vux.loading.hide()
        if (res) {
          localStorage.setItem('phone', this.form.phone)
          let login_from = localStorage.getItem('login_from')
          if (login_from) {
            localStorage.removeItem('login_from')
            this.$router.push({'path': login_from})
          } else {
            this.$router.back()
          }
        } else {
          this.$vux.toast.show({
           text: '验证码错误',
           type: 'text'
          })
        }
      })

    },
    getCode () {
      if (this.form.phone.length !== 11) {
        this.$vux.toast.show({
         text: '请检查手机号码',
         type: 'text'
        })
        return 
      } else {
        console.log(this.form)
        this.timer = '倒计时' + this.seconds + '秒'
        let interval = setInterval( () => {
          if (this.seconds === 0) {
            this.timer = '点击获取验证码'
            clearInterval(interval);
          } else {
            this.timer = '倒计时' + this.seconds + '秒'
            this.seconds -- 
          }

        }, 1000)
        sendSMS({phone: this.form.phone}).then(res => {
          console.log(res)
        })
      }
      
    },


  },

  events: {
  }

}
</script>
<style scoped>
  @import '../styles/index.css';
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
.weui-agree__text {
  color: #FFF
}
</style>
