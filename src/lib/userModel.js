

import axios from 'axios'
import qs from 'qs';
import config from './config'
import cookies from 'js-cookie'

var userModel = {
    
    'openid':cookies.get('openid'),
    // 更新用户信息
    editUser:function(data,callback,fail){
      var url = config.base+'user.php?code=editInfo';
      axios.post(url,qs.stringify(data))
        .then(function (response) {
           var obj = response.data;
           callback(obj)
        })
    },

    // 推送微信通知
    pushByGrade:function(data,callback,fail){
      var url = config.base+'push.php?action=pushByGrade';
      axios.post(url,qs.stringify(data))
        .then(function (response) {
           var obj = response.data;
           callback(obj)
        })      
    },


    getUser:function(callback,fail){
      var url = config.base+'user.php?code=getInfo&openid='+this.openid;
      axios.get(url)
        .then(function (response) {
           var obj = response.data;
           callback(obj)
        })     
    },

    // 获取我的推送时间
    getPushTime:function(openid,callback,fail){
      var self=this;
      var url = config.base+'user.php?code=myPushTime&openid='+openid;
      axios.get(url)
        .then(function (response) {
       　   callback(response.data.push_time.split('/'));
            
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // 保存用户推送时间
    editPushTime(openid,time,callback,fail){
      var url = config.base+'user.php?code=pushTime&time='+time+'&openid='+openid;
      axios.get(url)
        .then(function (response) {
           callback(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });

    },    

     // 获取所有学校
     getSchools(callback,fail){
      var url = config.base+'admin.php?code=getSchools';
      axios.get(url)
        .then(function (response) {
           callback(response.data)
        })
     },
     

     // 获取班级
      getGrades(school,callback,fail){
        var url = config.base+'admin.php?code=getGrades&school='+school;
        axios.get(url)
          .then(function (response) {
             callback(response.data)
          })
     },    


}



export default userModel;

