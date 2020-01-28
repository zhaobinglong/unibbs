<template>
    <!-- 评论区块 -->
    <div class='comment'>
        <div class="comment-item" v-for='item in list' :key="item.id" >
          <div class="comment-item-left">
            <img src='./assets/user.png' class='comment-item-avatar'/>
            <div>{{item.nickName ? item.nickName : ''}}</div>
          </div>

          <div class='comment-item-right'> 

            <div class='comment-item-content'>
              {{item.info}}
            </div>
              
            <div class='comment-item-imgs'>
              <ImgBox :imgs="[item.cover_img]" />
            </div>
            <div class='comment-item-address'>
               <img src='./assets/address.png' class='comment-item-address-icon'/>{{item.address? item.address.name : '未填写地址'}}
            </div>
            <div class='comment-item-time'>{{item.create_time | filterTime}}</div>
          </div>
        </div>
    </div>
</template>
<script >
import Vue from 'vue'
import ImgBox from '@/components/imgBox'
export default {
  data () {
    return {
    }
  },
  components: {
    ImgBox
  },
  // 组件外部暴露的接口
  props: {
    list: {
        type: Array,
        required: true,
        default: [],
    }
  },
  mounted: function () {
  },
  methods: {
    // clickHandle: function () {
    //   console.log('start')
    //   this.$emit('clickHandle')
    // },

  },
  computed: {

  }
}

</script>
<style scoped lang="less">
@import './index.less';

</style>
