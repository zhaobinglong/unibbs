<template>
	<div class="empty">
    <img src="./assets/logo.png" alt="" class='logo'>
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
      default: '',
    },
  },
  mounted: function () {
  },
  methods: {


  },
  computed: {

  },
  watch: {
  }
}

</script>
<style scoped>

.empty{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  color: #8a8a8a;
}

</style>
