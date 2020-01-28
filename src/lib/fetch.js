import axios from 'axios';
import config from './config.js';



// 创建axios实例
const service = axios.create({
  baseURL: config.base, // api的base_url
  timeout: 5000          // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  return config;
}, error => {
  // Do something with request error
  Promise.reject(error);
})


/**
* respone拦截器
* code为非200是抛错 可结合自己业务进行修改
*/

service.interceptors.response.use(
  response => {

    const res = response.data;
    if (res.code != 200) {
       
       alert('状态码异常');

    } else {
      return response.data;
    }
  },
  error => {
    console.log('err' + error);// for debug
    alert('状态码异常');
    return Promise.reject(error);
  }
)

export default service;
