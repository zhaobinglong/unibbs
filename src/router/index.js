import Vue from 'vue'
import Router from 'vue-router'
import index from '../view/index'
import home from '../view/home.vue';

// 首页三个tab
import me from '../view/me.vue';
import list from '../view/list.vue';
import start from '../view/start.vue';


// 我的
// import my from '../view/me/index.vue';
// import myPush from '../view/myPush.vue';
// import myClue from '../view/myClue.vue';
// import login from '../view/login.vue';
// import push from '../view/push.vue'; // 发布
// import clue from '../view/clue.vue'; // 发布
// import clue_success from '../view/clue_success.vue'; // 发布
import userInfo from '../view/userInfo.vue'; // 销售查询二维码
// import buy from '../view/buy.vue'; // 扫码后的保险购买
// import buyLevel2 from '../view/buyLevel2.vue'; // 扫码后购买保险156
// import check from '../view/check.vue'; // 下单确认
// import success from '../view/success.vue'; // 下单成功
// import childs from '../view/childs.vue'; // 儿童档案列表
// import addChild from '../view/addChild.vue'; // 编辑档案
// import orders from '../view/orders.vue'; // 我的保单
// import map from '../view/map.vue';


// import userForm from '../view/userForm.vue'; // 申请工号
// import seller from '../view/seller.vue'; // 销售查询二维码
// import record from '../view/record.vue'; // 销售查询二维码
// import groupBuy from '../view/group_buy.vue'; // 销售注册

// import detail from '../view/detail.vue';



Vue.use(Router)

let VueRouter = new Router({
  // mode: 'history',
  routes: [
    // {
    //   path: '/index',
    //   component: index,
    //   children: [
    //     {
    //       path: 'start',
    //       component: start
    //     },
    //     {
    //       path: 'list',
    //       component: list
    //     },
    //     {
    //       path: 'me',
    //       component: me
    //     }
    //   ]
    // },
    // { 
    //   name:'detail',
    //   path: '/detail/:id', 
    //   component: detail
    // },    
    // { 
    //   name:'userForm',
    //   path: '/userForm/:id', 
    //   component: userForm
    // }, 
    // { 
    //   name:'childs',
    //   path: '/childs', 
    //   component: childs
    // },
    // { 
    //   name:'orders',
    //   path: '/orders', 
    //   component: orders
    // },
    // { 
    //   name:'addChild',
    //   path: '/addChild/:id', 
    //   component: addChild
    // },
    // { 
    //   name:'push',
    //   path: '/push/:id', 
    //   component: push
    // },
    // { 
    //   name:'clue_success',
    //   path: '/clue_success/:id', 
    //   component: clue_success
    // },
    // { 
    //   name:'clue',
    //   path: '/clue/:id', 
    //   component: clue
    // },
    // { 
    //   name:'map',
    //   path: '/map',
    //   component: map
    // },
    // { 
    //   name:'login',
    //   path: '/login', 
    //   component: login
    // },
    // { 
    //   name:'seller',
    //   path: '/seller', 
    //   component: seller
    // },    
      { 
        name:'userInfo',
        path: '/userInfo', 
        component: userInfo
      }, 
    // { 
    //   name:'record',
    //   path: '/record', 
    //   component: record
    // }, 
    // { 
    //   name:'myPush',
    //   path: '/myPush', 
    //   component: myPush
    // },     
    // { 
    //   name:'myClue',
    //   path: '/myClue', 
    //   component: myClue
    // },  
    // { 
    //   name:'buy',
    //   path: '/buy/:phone_number', 
    //   component: buy
    // },

    // { 
    //   name:'check',
    //   path: '/check', 
    //   component: check
    // },
    // { 
    //   name:'success',
    //   path: '/success', 
    //   component: success
    // },
    {
      path: '*', 
      redirect: '/userInfo'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

// 全局导航守卫
VueRouter.beforeEach((to, from, next) => {
  const nextRoute = [ 'orders', 'childs', 'myPush','myClue', 'push', 'clue', 'userForm', 'record']; 
  //跳转至上述3个页面 
  // if (nextRoute.indexOf(to.name) >= 0) { 
  //   //未登录 
  //   // console.log(to)
  //   // this.$router.push({'path':'/check'})
  //   if (!localStorage.getItem('phone')) { 
  //     localStorage.setItem('login_from', to.path)
  //     VueRouter.push({name: 'login'}) 
  //   } 
  // } 
  // //已登录的情况再去登录页，跳转至首页 
  // if (to.name === 'login') { 
  //   if (auth.IsLogin) { 
  //     vueRouter.push({name: 'home'}); 
  //   } 
  // } 
  next()
})

export default VueRouter
