<template>
	<div id="player" class='flex'>

    <!-- 控制器 -->
    <div class="player_control">
      <img class="player_play" @click="playMusic" src="../assets/music_play.png" :style="{display: !play ? '' : 'none'}">
      <img class="player_play" @click="pauseMusic" src="../assets/music_stop.png" :style="{display: !play ? 'none' : ''}">
    </div>

    <!-- 进度条 -->
    <div class="player_progress ">
      
      <vue-slider class="playprogress" ref="slider" v-bind="setting" style="display:inline-block;padding:15px 10px;" v-model="progress"></vue-slider>

      <div class='player_time'>
        <span>{{current}}</span>
        <span>{{end}}</span>
      </div>

    </div>

    <audio 
        @canplay="audioInit" 
        ref="player" 
        @ended="ended" 
        @error="errorLoad"
        style="display:none" 
        :src="mp3Url"  
        controls="controls">
        </audio>    
	</div>
</template>
<script >
import VueSlider from 'vue-slider-component'
import Vue from 'vue'

export default {
  name: 'player',
  components: {
    VueSlider
  },
  data () {
    return {
      app: 'player',
      setting: {
        width: 150,
        tooltip: false,
        dotSize: 13,
        processStyle: {
          'background-color': 'rgb(232,60,60)'
        },
        min: 0,
        max: 200,
        clickable: true,
        speed: 1.0
      },
      progress: 0,
      play: false,
      current: '00:00',
      end: '00:00',
      update: '',
      drag: false,
      mp3Url:'http://examlab.cn/img/20171016105751.mp3'
    }
  },

  // 组件外部暴露的接口
  props: {
    url: {
      type: String,
      required: true,
      default: '',
    },
  },
  mounted: function () {
  },
  methods: {
    audioInit: function () {
      console.log(this.$refs.player)
      const duration = this.$refs.player.duration
      this.end = Vue.options.filters.timeToStr(duration)
      this.setting.max = Number.parseInt(duration, 10)
    },
    getCurrent: function () {
      const currentTime = this.$refs.player.currentTime
      this.current = Vue.options.filters.timeToStr(currentTime)
      this.progress = Number.parseInt(currentTime, 10)
    },
    playMusic: function () {
      if (!this.mp3Url) {
        return
      }
      this.update = setInterval(this.getCurrent, 1000 / 60)
      this.$refs.player.play()
      this.play = true
    },
    pauseMusic: function () {
      clearInterval(this.update)
      this.$refs.player.pause()
      this.play = false
    },
    ended: function () {
      clearInterval(this.update)
      this.play = false
      this.progress = 0
    },
    errorLoad: function () {
      if (this.mp3Url === 'error') {
        return
      }
      this.play = false
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


#player{
	height: 40px;
	width: 100%;
  background-color: rgb(246,246,248);
  border: 1px solid rgb(225,225,226);
  position: relative;
}

.player_play{
  width: 40px;
  height: 40px;
  border: 40px;
  cursor: pointer;
  margin: 0 15px;

}

.player_control{
  position: absolute;
  top:0;
  left:0;
  bottom:0;
  width:70px;
  line-height: 50px;


}
.player_progress{
  display: inline-block;
  height: 100%;
  line-height: 50px;
  vertical-align: top;
  margin-left: 70px;
  line-height: 50px
}
.player_time{
  position: absolute;
  right:10px;
  top:0;
  bottom:0;
  line-height: 40px;
  font-size: 11px
}

 .vue-slider-dot{
  background: url('../assets/point.png') no-repeat;
  box-shadow: none;
  border-radius: 0;
  position: relative;
}
.playprogress .vue-slider-dot{
  background-size: 5px 5px;
  background-position: 4px;
}


</style>
