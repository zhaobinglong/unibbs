<template>
	<div class='upload' >
    <img :src="imgSrc" alt="" class='upload-icon'> 
    <input  type="file" @change="uploadChange($event, 'cover_img')" class="file-selector">
	</div>
</template>
<script >
import Vue from 'vue'
import COS from 'cos-js-sdk-v5'
import OSS from 'ali-oss';
export default {
  data () {
    return {
      cover_img: '',
      name: ''
    }
  },

  // 组件外部暴露的接口
  props: {
    imgSrc: {
      type: String,
      required: true,
      default: 'data:image/png;base64,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',
    },
  },
  // link:https://help.aliyun.com/document_detail/64041.html?spm=a2c4g.11186623.2.11.13f674b8jFbp7X#h2-url-3
  mounted: function () {
      // this.$axios({
      //   method: "get",
      //   url: "http://guichaokeji.com/bird/api/aliyun-sts-server/sts.php",
      // })
      // .then(data => {
      //   console.log(data)
      // })
    // console.log(client)
  },
  activated:function(){
    // this.cover_img = this.imgSrc
    // console.log(this.imgSrc)
  },
  methods: {
    changeImg(x) {
      // this.cover_img = 
    },
    aliyunUpload(file) {
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
          _this.$emit('uploadSuccess', result.url)
        } catch (e) {
          console.log(e);
        }
      }
      putBlob();
    },
    // 监听图片选择
    uploadChange (res, params) {
      const self = this
      var fileObj = res.target.files[0];
      // const reader = new FileReader()
      // reader.readAsDataURL(fileObj)
      // reader.onloadend = function() {
      //   self.imgSrc = this.result
      // }
      // this.current_upload = params
      this.upLoad(fileObj)
    },
    //腾讯云oss上传之前需要获取签名
    upLoad(fileObj) {
      // var fileObj = document.getElementById("file-selector").files[0];
      var blobFile = this.$options.methods.dataURLtoBlob.bind(this)(fileObj);
      // let name = fileObj.name;
      // this.name = new Date().getTime() + this.randomString(5) + name.substring(name.lastIndexOf('.'))
      this.aliyunUpload(blobFile)
      return false
      var filename = fileObj.name;
      this.$axios({
        method: "post",
        url: "http://guichaokeji.com/bird/api/upload_tencent_cloud_sts.php",
        data: {
          modelName: 'resource',
          bucketName: 'unibbs-1251120507',
          fileName: filename
        }
      })
        .then(data => {
          this.sign = data.data
          this.$options.methods.uploadFile.bind(this)(data,blobFile, filename);
        })
    },

    //上传腾讯云
    uploadFile(data, file, filename) {
      var bucket ='unibbs-1251120507';
      var appid = '1251120507';
      var region = 'ap-beijing';
      var _this = this;
      let key = new Date().getTime() + filename.substring(filename.lastIndexOf('.'))
      let cos = new COS({
        // 必选参数
        getAuthorization: function (config, callback) {
          callback({
             TmpSecretId: _this.sign.credentials.tmpSecretId, 
             TmpSecretKey: _this.sign.credentials.tmpSecretKey, 
             XCosSecurityToken:_this.sign.credentials.sessionToken, 
             ExpiredTime: _this.sign.expiredTime
            // XCosSecurityToken: data.XCosSecurityToken, // 如果是临时密钥计算出来的签名，需要提供 XCosSecurityToken
          });
        },
        // 可选参数
        FileParallelLimit: 3, // 控制文件上传并发数
        ChunkParallelLimit: 3, // 控制单个文件下分片上传并发数
        ProgressInterval: 1000 // 控制上传的 onProgress 回调的间隔
      });
      
      cos.putObject({
        Bucket: bucket,
        Region: region,
        Key: 'bird/' + key,
        Body: file
      }, function (err, data) {
        console.log(data)
        if (data.statusCode === 200) {
          //上传成功得到的资源地址
          let path = 'https://' + bucket + '.cos.'+ region +'.myqcloud.com/bird/' + key 
          console.log(path)
          _this.$emit('uploadSuccess', path)
        }
      });
    },

    //DataURL转Blob
    dataURLtoBlob(fileObj) {
      console.log(fileObj.size)
      return new Blob([fileObj], { type: fileObj.type });
    },
    randomString(length) {
        var str = '';
        for ( ; str.length < length;){
           str += Math.random().toString(36).substr(2);
        } 
        return str.substr(0, length);
    }

  },
  computed: {

  },
  watch: {
  }
}

</script>
<style scoped>

.upload{
  width: 100%;
  height: 100%;
  color: #8a8a8a;
  display: flex;
  align-items: center;
 justify-content: center;
 overflow: hidden
}
.upload-icon {
  width: 100%;
  height: auto;
}
</style>
