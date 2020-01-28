<template>
	<div @click="clickHandle" class="buttonItem">
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
      console.log('start')
      this.$emit('clickHandle')
    },

  },
  computed: {

  },
  watch: {
    progress: function (newValue, oldValue) {
      if (Math.abs(newValue - oldValue) > 1) {
        this.current = Vue.options.filters.timeToStr(newValue)
        this.$refs.player.currentTime = newValue
      }
    },
  }
}

</script>
<style scoped>


.buttonItem {
  line-height: 40px;
  color: #83c7d4;
  text-align: center;
  background: #FFF;
  margin: 0 20px;
  border-radius: 5px;
  font-size: 18px;
}

</style>
