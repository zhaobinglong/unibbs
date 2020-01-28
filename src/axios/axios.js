import axios from 'axios'; //使用axios作为基础
// import { Toast } from 'vux'
// import { Message } from 'element-ui';
// import store from '../store';


// 创建axios实例
const service = axios.create({
  // baseURL: 'https://examlab.cn/uniapi/', // api的base_url
  baseURL: 'https://examlab.cn/uniapi/unibbs/',
  timeout: 10000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['X-Token'] = store.getters.token; // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

//对拦截的参数进行处理，post的参数，需要转换一次


// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data;
    if (res.code !== '200') {
      // Message({
      //   message: res.data || '发生未知错误，请联系管理员',
      //   type: 'error',
      //   duration: 5 * 1000
      // });

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload();// 为了重新实例化vue-router对象 避免bug
      //     });
      //   })
      // }
      return Promise.reject(res.data);
    } else {
      // return Promise.reject(res.msg);
      return response.data.data;

    }
  },
  error => {
    console.log(error);// for debug
    return Promise.reject(error);
  }
)

export default service;
