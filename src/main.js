// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import './filters'
import router from './router/index';
import Axios  from 'axios'
import store from './store'


// test

// 全局引入loading
import  { LoadingPlugin, ToastPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)


//修改原型链，全局使用axios,这样之后可在每个组件的methods中调用$axios命令完成数据请求
Vue.prototype.$axios = Axios;

// 单独开发的日历组件
// import vueEventCalendar from './components/vueEventCalendar'
// Vue.use(vueEventCalendar, {locale: 'zh'})


// 视频组件
// import VueVideoPlayer from 'vue-video-player'
// Vue.use(VueVideoPlayer)

// 引入第三方JS错误记录
import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";
fundebug.apikey = "63f52b3f806f7a2fc33750965fedde5dee9a3225c22e8523ef031c17f02128fd"
fundebugVue(fundebug, Vue);


// 使用sentry进行全局日志监控，sentry是免费的日志监控平台
// import Raven from 'raven-js';
// import RavenVue from 'raven-js/plugins/vue';
// Raven
//     .config('https://d39230ff9b2e4b57ad1439f5a4b0cec9@sentry.io/1725188')
//     .addPlugin(RavenVue, Vue)
//     .install();

import * as Sentry from '@sentry/browser';
Sentry.init({ dsn: 'https://d39230ff9b2e4b57ad1439f5a4b0cec9@sentry.io/1725188' });


import '@/assets/iconfont/iconfont.css';
import '@/assets/iconfont/iconfont.js';

// 解决单击延迟300ms的移动端问题
FastClick.attach(document.body)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


