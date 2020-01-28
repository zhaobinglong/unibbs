<template>
    <div>
        <div >
          <group title="基本信息" label-width="5em">
             <cell title="照片:" value-align="left">
               <div style="width:100px; height: 100px; float: right">
                <Upload @uploadSuccess="uploadSuccess" v-bind:imgSrc="form.cover_img" />
              </div>
             </cell>
          </group>
          <group title="补充信息">
             <x-textarea placeholder="建议填写儿童具体信息，如衣着，发型等体貌特征" v-model="form.info"></x-textarea>
             <x-input @on-focus="selectAddress" placeholder-align="right" text-align="right" title="地址:"   v-model="form.address.name" placeholder="编辑"></x-input >
             <x-input placeholder-align="right" text-align="right" title="手机号码:"  v-model="form.phone" placeholder="编辑"></x-input>
          </group>
          
          <ButtonFooter @clickHandle="push" text="提交"/>
        </div>
    </div>
</template>
<style>
</style>
<script>
import { Selector,Datetime,XAddress, Actionsheet,Group,XButton,Cell,Picker, GroupTitle,Box,Toast,PopupPicker,XInput,XTextarea,Alert,TransferDomDirective as TransferDom} from 'vux'

// 5F5BZ-E4SKQ-3DL5P-GPMES-VSXGZ-5LFRU
import { userClue } from '@/api/index'
// import { TMap } from '@/lib/Tmap'
import { EventBus } from "../bus/event-bus.js";
import ButtonFooter from '@/components/buttonFooter'
import Upload from '@/components/upload'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    XButton,
    Cell,
    Picker,
    GroupTitle,
    Box,
    Toast,
    PopupPicker,
    XInput,
    XTextarea,
    Alert,
    Datetime,
    Actionsheet,
    XAddress,
    Selector,
    ButtonFooter,
    Upload
  },
  data () {
      return {
        form:{
          main_id: '',
          name: '',
          cover_img: 'https://unibbs-1251120507.cos.ap-beijing.myqcloud.com/bird/1557142678390.png',
          address: {},
          info: '',
          phone: ''
        },
        sign: {},
        genders:  [['男', '女']],
        toast: false,
        qq: null,
        show_map: true
      }
  },
  mounted:function(){
    // var map = new BMap.Map("container");
    // var point = new BMap.Point(116.331398,39.897445);
    // map.centerAndZoom(point,12);
    
    // function myFun(result){
    //   var cityName = result.name;
    //   map.setCenter(cityName);
    // }
    // var myCity = new BMap.LocalCity();
    // myCity.get(myFun); 
  },
  // 组件被激活时调用
  activated:function(){
    this.form.main_id = this.$route.params.id
    EventBus.$on("clickAddress", (r) => {
      console.log(r)
      this.form.address = r
    });
    let phone = localStorage.getItem('phone')
    this.form.phone = phone
  },
  methods:{
    uploadSuccess(path) {
      console.log(path)
      this.form.cover_img = path
    },

    selectAddress() {
      this.$router.push({
        'path':'/map'
      })
    },

    getLocation(){
      var geolocation = new this.qq.Geolocation("5F5BZ-E4SKQ-3DL5P-GPMES-VSXGZ-5LFRU", "归巢系统-移动web端");
      console.log(geoLocation)
    },
    
    // 监听性别选择
    onChange(res) {
      console.log(res)
    },
  
    //DataURL转Blob
    dataURLtoBlob(fileObj) {
      console.log(fileObj.size)
      return new Blob([fileObj], { type: fileObj.type });
    },


    onConfirmDateTime(res) {
      console.log(res)
    },   
   
   // 提交线索
   push(){
    if(!this.form.cover_img) {
      this.$vux.toast.show({
       text: '请上传一张照片',
       type: 'text'
      })
      return false
    }

    if(!this.form.address) {
      this.$vux.toast.show({
       text: '请编辑地址',
       type: 'text'
      })
      return false
    }

    console.log(this.form)
    userClue(this.form).then(data => { 
       console.log(data)
       if(data) {
         this.$router.push({'path':'/clue_success/' + this.form.main_id})
       }
    })

   },


  }

}
</script>
<style>

  @import '../styles/index.css';

</style>

