<template>
    <div class='upload-pictures'>
        <div class="upload-picture-item upi" v-for='item in imgs' :key="item">
          <img class="image" :src="item" />
        </div>
    </div>
</template>
<script >
import Vue from 'vue'

export default {
  data () {
    return {
    }
  },

  // 组件外部暴露的接口
  props: {
    imgs: {
      type: Array,
      default: []
    },
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
