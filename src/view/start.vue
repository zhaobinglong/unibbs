<template>
    <div class="push">
        <div id="container" style="width:100%;" >
        </div>
        <div class="bell_box" @click='goPush'>
          <img src="../assets/start_push.png" >
        </div>
    </div>
</template>
<style>
</style>
<script>

import COS from 'cos-js-sdk-v5'
// 5F5BZ-E4SKQ-3DL5P-GPMES-VSXGZ-5LFRU
import { userPush, getDetail } from '@/api/index'
// import { TMap } from '@/lib/Tmap'
import { EventBus } from "../bus/event-bus.js";
export default {

  components: {
  },
  data () {
      return {
      }
  },

  mounted:function(){
    this.initMap()
  },
  // 组件被激活时调用
  activated:function(){    

  },

  methods:{
    goPush() {
      this.$router.push({
        'path':'/push/new'
      })
    },
    initMap () {
      var map = new BMap.Map("container");
      var point = new BMap.Point(116.331398,39.897445);
      map.centerAndZoom(point,12);
      
      function myFun(result){
        var cityName = result.name;
        map.setCenter(cityName);
      }
      var myCity = new BMap.LocalCity();
      myCity.get(myFun);
      
    }
  }

}
</script>
<style>

  @import '../styles/index.css';

</style>

