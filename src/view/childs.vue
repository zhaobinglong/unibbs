<template>

  <div class='childs'>
      <div class="weui-panel weui-panel_access" v-if="list.length">
            <div class="weui-panel__hd">档案列表</div>
            <div class="weui-panel__bd">
                <div @click="editChild(item)" class="weui-media-box weui-media-box_appmsg" v-for="item in list">
                    <div class="weui-media-box__hd" style="overflow: hidden">
                        <img class="weui-media-box__thumb" :src="item.cover_img" alt="">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{ item.name }}</h4>
                        <p class="weui-media-box__desc">性别：{{ item.gender }}，证件号码：{{ item.code }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
          <Empty text="您还没有档案"/>
        </div>
        <ButtonFooter @clickHandle="add" text="新增档案"/>
  </div>
</template>

<script>
import ButtonFooter from '@/components/buttonFooter'
import Empty from '@/components/empty'
import { getChild } from '@/api/index'
import { EventBus } from "../bus/event-bus.js";
export default {
  components: {
    ButtonFooter,
    Empty
  },
  data () {
    return {
      list: [],
      userInfo: {
        phone: ''
      },
      data: {}
    }
  },

  mounted:function(){
    
  },
  // 组件被激活时调用
  activated:function(){
    let phone = localStorage.getItem('phone')
    // console.log(this.$store.state)
    // console.log(this.$store.getters.getTest)
    // if (phone) {
    //   this.userInfo.phone = phone
    // }
    getChild({phone: phone}).then(data => { 
       this.list = data
    })
  },
  destroyed: function(){
    
  },
  methods: {
    add () {
      this.$router.push({
        'path':'/addChild/add'
      })
    },
    editChild(item) {
      this.data = item
      // EventBus.$emit("editChild", this.data)
      this.$router.push({
        'path':'/addChild/' + item.id
      })
    }
  }

}
</script>

<style>

</style>
