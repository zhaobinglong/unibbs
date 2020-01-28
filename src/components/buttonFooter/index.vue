<template>
	<div @click="clickHandle" class="buttonFooter">
    {{ text }}
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
    text: {
      type: String,
      required: true,
      default: '确定',
    },
  },
  mounted: function () {
  },
  methods: {
    clickHandle: function () {
      this.$emit('clickHandle')
    },

  },
  computed: {

  },
  watch: {
  }
}

</script>
<style scoped lang="less">
@import './index.less';

</style>

