<template>
    <div v-if="!loading">
      <div v-if="list.length">
        <div  class='allCourse'>
           <ul>
               <li  v-for='item in list' :key="item.id" class="">
                 <router-link :to="{path: '/detail/' + item.main_id}" class='allCourse_item between'>
                    <div class='allCourse_item_left'>
                       
                       <p class='allCourse_item_desc'>丢失地址：{{item.address ? item.address.name : ''}}</p>
                       <p class='allCourse_item_desc'>描述：{{item.info}}</p>
                       <p class='allCourse_item_desc'>联系方式：{{item.phone}}</p>
                     </div>
                     <img :src="item.cover_img" alt="" class='allCourse_item_img'>
                 </router-link>
               </li>
           </ul>      
        </div>
      </div>
      <div v-else>
        <Empty text="" />
      </div>
    
    </div>
</template>
<style>
</style>
<script>
import { getClue } from '@/api/index'
import Empty from '@/components/empty'
export default {
  components: {
    Empty
  },
  data (){
    return{
      list:[],
      form: {
        phone: ''
      },
      loading: true
    }
  },
  // 组件被激活时调用
  activated:function(){
    this.form.phone = localStorage.getItem('phone')
      getClue(this.form).then(data => { 
         console.log(data)
         this.loading = false
         if(data) {
           this.list = data
         }
      })

  },
  mounted: function () {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.course_tab{
  color: #0091da !important;
  border-color: #0091da !important;
}
.vux-tab-selected {
  color: #0091da !important;
  border-color: #0091da !important;
}

.allCourse{
  padding: 18px 14px;
}


.allCourse_item{
  background-color: #FFF;
  min-height: 100px;
  padding: 3px;
  position: relative;
  margin-bottom: 12px;
  border-radius: 2px;
  box-shadow: 0 4px 4px 0 #e6e6e6;
  display: flex;


}
.allCourse_item_left{
  display: inline-block;
  margin: 9px 11px;
  position: relative;
  flex-grow:1

}
.course_title{
  font-family: PingFangSC;
  font-size: 16px;
  text-align: left;
  color: #505050;
  padding-bottom: 5px;
}
.allCourse_item_desc{
  font-size: 12px;
  font-family: PingFangSC;
  color: #8c8c8c;
  overflow: hidden;
}
.allCourse_item_btn{
  background-color:  #ff344a;
  color: #fff;
  display: inline-block;
  text-align: center;
  border-radius: 26px;
  font-size: 14px;
  height: 26px;
  line-height: 26px;
  padding: 0 14px;
  position: absolute;
  bottom: 0;
  left: 0
}
.allCourse_item_img{
  height: 114px;
  width: 122px;
  margin: 3px;
}

.flex{
  display: -webkit-flex;
  box-sizing: border-box;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;  
}

.between{justify-content: space-between!important;}

</style>
