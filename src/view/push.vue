<template>
    <div class="push">
        <div >
          <group title="基本信息" label-width="6em">
             <cell title="照片:" value-align="left">
               <div class='upload' >
                  <img :src="form.cover_img" class='icon_upload'>
                  <input  type="file" @change="uploadChange($event, 'cover_img')" class="file-selector">
               </div>
             </cell>
             <x-input placeholder-align="right" text-align="right" title="姓名:"  v-model="form.name" placeholder="编辑"></x-input>
             <x-input placeholder-align="right" text-align="right" title="年龄:"  v-model="form.birthday" placeholder="编辑"></x-input>
             <x-input placeholder-align="right" text-align="right" title="身高:"  v-model="form.height" placeholder="编辑"></x-input>
             <!-- <x-input placeholder-align="right" title="籍贯:" text-align="right" v-model="form.birth_place" placeholder="编辑"></x-input> -->
             <x-textarea  title="特征:"placeholder="建议填写儿童走失时的具体信息，如衣着，发型等体貌特征" v-model="form.info"></x-textarea>
             <x-input placeholder-align="right" text-align="right" title="详细地址:"  v-model="form.address" placeholder="编辑"></x-input>
             <datetime
              v-model="form.lost_date"
              title="走失时间:"
              @on-confirm="onConfirmDateTime"></datetime>
              <x-textarea placeholder="补充信息" v-model="form.remark"></x-textarea>
             <x-input placeholder-align="right" title="联系方式:" text-align="right" v-model="form.phone" placeholder="编辑"></x-input>
             <cell title="报警回执单:" value-align="left">
              <div class='upload' >
                  <img :src="form.police_receipt" class='icon_upload'>
                  <input type="file" @change="uploadChange($event, 'police_receipt')"  class="file-selector">
               </div>
             </cell>
          </group>
          <toast v-model="toast" :time="1000">提交成功</toast>
          <ButtonFooter text="确定" @clickHandle="push"/>
        </div>
    </div>
</template>
<style>
</style>
<script>
import { Selector,Datetime,XAddress, Actionsheet,Group,XButton,Cell,Picker, GroupTitle,Box,Toast,PopupPicker,XInput,XTextarea,Alert,TransferDomDirective as TransferDom} from 'vux'

// 5F5BZ-E4SKQ-3DL5P-GPMES-VSXGZ-5LFRU
import { userPush, getDetail } from '@/api/index'
// import { TMap } from '@/lib/Tmap'
import { EventBus } from "../bus/event-bus.js";
import ButtonFooter from '@/components/buttonFooter'
import OSS from 'ali-oss';
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
    ButtonFooter
  },
  data () {
      return {
        form:{
          name: '',
          height: '',
          cover_img: 'https://unibbs-1251120507.cos.ap-beijing.myqcloud.com/bird/1557142678390.png',
          police_receipt: 'https://unibbs-1251120507.cos.ap-beijing.myqcloud.com/bird/1557142678390.png',
          gender: [],
          address: '',
          lost_date: '',
          birthday: '',
          birth_place: '',
          info: '',
          lat: null,
          lng: null
        },
        sign: {},
        genders:  [['男', '女']],
        toast: false,
        qq: null,
        show_map: true,
        current_upload: ''
      }
  },

  mounted:function(){

  },
  // 组件被激活时调用
  activated:function(){    
    // EventBus.$on("clickAddress", (r) => {
    //   this.form.address = r.name
    //   this.form.lat = r.location.lat
    //   this.form.lng = r.location.lng
    // });

    this.getDetail(this.$route.params.id)
  },

  methods:{
      getDetail(id) {
        // id为new，表单要重新初始化
        if (id === 'new') {
          this.form = {
                        name: '',
                        cover_img: 'https://unibbs-1251120507.cos.ap-beijing.myqcloud.com/bird/1557142678390.png',
                        police_receipt: 'https://unibbs-1251120507.cos.ap-beijing.myqcloud.com/bird/1557142678390.png',
                        gender: [],
                        address: '',
                        lost_date: '',
                        birthday: '',
                        birth_place: '',
                        info: '',
                        height: '',
                        remark: '',
                        lat: null,
                        lng: null
                      }
        } else {
          getDetail({id: id}).then(data => { 
            console.log(data)
            if (data.gender) {
              data.gender = [data.gender]
            } else {
              data.gender = []
            }
            this.form = data
          })
        }
     },

    // selectAddress() {
    //   this.$router.push({
    //     'path':'/map'
    //   })
    // },

    startPush () {
      this.show_map = !this.show_map
    },

    getLocation(){
      var geolocation = new this.qq.Geolocation("5F5BZ-E4SKQ-3DL5P-GPMES-VSXGZ-5LFRU", "归巢系统-移动web端");
      console.log(geoLocation)
    },
    
    // 监听性别选择
    onChange(res) {
      console.log(res)
    },
    
    // 监听图片选择
    uploadChange (res, params) {
      const self = this
      var fileObj = res.target.files[0];
      const reader = new FileReader()
      reader.readAsDataURL(fileObj)
      reader.onloadend = function() {
        self.form[params] = this.result
      }
      this.current_upload = params
      this.upLoad(fileObj)
    },
    //腾讯云oss上传之前需要获取签名
    upLoad(fileObj) {
      // var fileObj = document.getElementById("file-selector").files[0];
      console.log(fileObj)
      let file = this.$options.methods.dataURLtoBlob.bind(this)(fileObj);
      // var filename = fileObj.name;

      let client = new OSS({
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAI1OYzgCMdPBO2',
        accessKeySecret: 'wQnEecSjLxE0RzHzxxZBIuXmaRDYtj',
        bucket: 'guichaokeji'
      });
      let name = new Date().getTime() + this.randomString(5)
      let _this = this
      async function putBlob () {
        try {
          let result = await client.put(name, file);
          console.log(result);
          _this.form[_this.current_upload] = result.url
        } catch (e) {
          console.log(e);
        }
      }
      putBlob();

      // this.$axios({
      //   method: "post",
      //   url: "https://examlab.cn/uniapi/upload_tencent_cloud_sts.php",
      //   data: {
      //     modelName: 'resource',
      //     bucketName: 'unibbs-1251120507',
      //     fileName: filename
      //   }
      // })
      //   .then(data => {
      //     this.sign = data.data
      //     this.$options.methods.uploadFile.bind(this)(data,blobFile, filename);
      //   })
    },

    //上传腾讯云
    // uploadFile(data, file, filename) {
    //   var bucket ='unibbs-1251120507';
    //   var appid = '1251120507';
    //   var region = 'ap-beijing';
    //   var _this = this;
    //   let key = new Date().getTime() + filename.substring(filename.lastIndexOf('.'))
    //   let cos = new COS({
    //     // 必选参数
    //     getAuthorization: function (config, callback) {
    //       callback({
    //          TmpSecretId: _this.sign.credentials.tmpSecretId, 
    //          TmpSecretKey: _this.sign.credentials.tmpSecretKey, 
    //          XCosSecurityToken:_this.sign.credentials.sessionToken, 
    //          ExpiredTime: _this.sign.expiredTime
    //         // XCosSecurityToken: data.XCosSecurityToken, // 如果是临时密钥计算出来的签名，需要提供 XCosSecurityToken
    //       });
    //     },
    //     // 可选参数
    //     FileParallelLimit: 3, // 控制文件上传并发数
    //     ChunkParallelLimit: 3, // 控制单个文件下分片上传并发数
    //     ProgressInterval: 1000 // 控制上传的 onProgress 回调的间隔
    //   });
      
    //   cos.putObject({
    //     Bucket: bucket,
    //     Region: region,
    //     Key: 'bird/' + key,
    //     Body: file
    //   }, function (err, data) {
    //     console.log(data)
    //     if (data.statusCode === 200) {
    //     //上传成功得到的资源地址
    //       let path = 'https://' + bucket + '.cos.'+ region +'.myqcloud.com/bird/' + key 
    //       _this.form[current_upload] = path
    //     }
    //   });
    // },

    //DataURL转Blob
    dataURLtoBlob(fileObj) {
      console.log(fileObj.size)
      return new Blob([fileObj], { type: fileObj.type });
    },


    onConfirmDateTime(res) {
      console.log(res)
    },   

   push(){
    if(this.form.cover_img == 'https://unibbs-1251120507.cos.ap-beijing.myqcloud.com/bird/1557142678390.png') {
      this.$vux.toast.show({
       text: '请上传一张照片',
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

    if(!this.form.address) {
      this.$vux.toast.show({
       text: '请编辑地址',
       type: 'text'
      })
      return false
    }

    if(!this.form.phone || this.form.phone.length !== 11) {
      this.$vux.toast.show({
       text: '请输入手机号码',
       type: 'text'
      })
      return false
    }

    if(this.form.police_receipt == 'https://unibbs-1251120507.cos.ap-beijing.myqcloud.com/bird/1557142678390.png') {
      this.$vux.toast.show({
       text: '请上传报警回执单',
       type: 'text'
      })
      return false
    }

    this.$vux.loading.show({
     text: '提交中···'
    })
    console.log(this.form)
    userPush(this.form).then(data => { 
       console.log(data)
       if(data) {
         this.$vux.loading.hide() 
         this.toast = true
         this.$router.push({
          path: '/index/list'
         })
       }
    })

   },

    randomString(length) {
        var str = '';
        for ( ; str.length < length;){
           str += Math.random().toString(36).substr(2);
        } 
        return str.substr(0, length);
    }

  }

}
</script>
<style>

  @import '../styles/index.css';

</style>

