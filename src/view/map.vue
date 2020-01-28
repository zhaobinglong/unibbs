<template>
    <div>
        <div id="container" style="width:100%;" >
        </div>
        <div class="search_box" >
          <div class='bell_p1' >搜索</div>
          <x-input  v-model="text" placeholder="请输入地址" @on-change="inputAddress" style="flex-grow:1"></x-input>
          <div class="search_session" v-if="show_session">
            <div v-for="item in session" class='session_item' @click="clickAddress(item)">{{ item.name }}</div>
          </div>
        </div>
    </div>
</template>
<style>
</style>
<script>
import { XInput,TransferDomDirective as TransferDom} from 'vux'
import axios from 'axios';
import { getAddressList } from '@/api/bird'
import { EventBus } from "../bus/event-bus.js";
export default {
  directives: {
    TransferDom
  },
  components: {
    XInput
  },
  data () {
      return {
        text: '',
        city: '北京',
        show_session: false,
        session: []
      }
  },
  mounted:function(){
    let self = this
    var map = new BMap.Map("container");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);
    
    function myFun(result){
      console.log(result)
      var cityName = result.name;
      map.setCenter(cityName);
      self.city = cityName
      fundebug.notify("map", "位置定位", {
          metaData: result
      });
    }
    let myCity = new BMap.LocalCity();
    myCity.get(myFun); 
  },
  // 组件被激活时调用
  activated:function(){
  },
  methods:{
    
    inputAddress(r) {
      let data = {
        key: r,
        city: this.city
      }
      if (r.length) {
        this.show_session = true
      } else {
        this.show_session = false
      }
      getAddressList(data).then(r => { 
         console.log(r)
         this.session = r.result
      })
    },
     
    // 点击地址 
    clickAddress(r) {
      console.log(r)
      EventBus.$emit("clickAddress",r)
      this.$router.back()
    },

    onConfirmDateTime(res) {
      console.log(res)
    },   

  }

}
</script>
<style>

  @import '../styles/index.css';

</style>

