<template>
    <div>

         <group-title>提醒时间</group-title>
        <picker :data='time' v-model='push_time' ></picker>


        <box gap="10px 10px">
           <x-button  @click.native='save' class='wechat_btn'>保存</x-button>
        </box>

        <div class="">
            <loading v-model="is_load" :text="loadContent"></loading>
        </div>
         <toast v-model="showSetBack" type="text" :time="800" is-show-mask :text="setBackContent" position='middle'></toast>
        <!-- <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet> -->
    </div>
</template>
<style>
</style>
<script>
import { Loading,XHeader,Actionsheet,Group,XSwitch,XButton,Cell,Picker, GroupTitle,Box,Toast,PopupPicker} from 'vux'
import userModel  from '../../lib/userModel'
import cookies from 'js-cookie'
let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}
export default {
  components: {
    XHeader,
    Actionsheet,
    Group,
    XSwitch,
    XButton,
    Cell,
    Picker,
    GroupTitle,
    Box,
    Toast,
    PopupPicker,
    Loading
  },
  data () {
      return {

        is_load:false,
        loadContent:'正在添加',
        time:[['01','02','03'],['00分', '30分',]
        ],
        push_time:['09', '00'],
        showSetBack:false,
        setBackContent:'保存成功'
  
      }
  },
  // 获取定时列表  最多五个
  mounted:function(){

  },
  // 组件被激活时调用
  activated:function(){
    var self = this;
    var openid=cookies.get('openid');
    this.initData();
    userModel.getPushTime(openid,function(res){
       console.log(res)
       self.push_time=[res[0]+'点',res[1]+'分'];
    },false)
  },
  methods:{

    initData(){
       this.time[0]=[];
       for (var i = 0; i < 24; i++) {
          if(i<10){
             this.time[0].push('0'+i+'点');
          }else{
             this.time[0].push(i+'点');
          }
       }
    },

    //保存
    save(){
      var self = this;
      var time=this.push_time[0]+'/'+this.push_time[1];
      var openid=cookies.get('openid');   
      time=time.replace(/[\u4E00-\u9FA5]/g,'');
      userModel.editPushTime(openid,time,function(res){
         console.log(res)
         if(res.code == '0'){
           self.showSetBack=true;
           self.setBackContent=res.msg;          
         }

      },false)

    },




  }

}
</script>
