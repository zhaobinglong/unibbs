import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

const store = new vuex.Store({
  state: {
    test: 'this is test',
    lostList: [] // 儿童走失列表数据
  },
  // gettter类似于vue中的computed属性，学名计算属性，如果依赖的值发生变化，那么它的输出也会变化
  getters: {
    getTest: function(state){
      return state.test + '111111'
    },
    getLostList: function(state) {
      return state.lostList
    }
  },
  // 业务逻辑中可以通过commit来调用mutation中的方法，来修改state
  mutations: {
    test(state) {
      state.test = state.test + '2222'
    },
    setLostList(state, arr) {
      state.lostList = arr
    }

  },
  // action类似于vue中的methods
  actions: {
    // 定义一个action，设置走失儿童信息列表
    setLostList(context, arr) {
      context.commit('setLostList', arr)
    }
  }

})



export default store;