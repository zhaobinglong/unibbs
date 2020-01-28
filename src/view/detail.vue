<template>
    <div class="detail">
       <img :src="form.cover_img"  class='course_detil_img'>      
       <div class="detail_info">        
           <div class='course_detail'>
              <div class='item_p'>姓名：{{form.name}}</div>               
              <div class='item_p'>身高：{{form.height}}</div>                            
              <div class='item_p'>地址：{{form.address}}</div>               
              <div class='item_p'>走失日期：{{form.lost_date}}</div>               
              <div class='item_p'>特征：{{form.info}}</div>               
              <div class='item_p'>备注信息：{{form.remark}}</div>               
           </div>
       </div>
       <div class="detail_comment_title">线索列表</div>
       <Comment :list="form.clues" />
      <ButtonFooter :text="btn_text" @clickHandle="handelClick"/>
    </div>
</template>
<style>
</style>
<script>
import { Alert,Loading,XButton,Box,TransferDomDirective as TransferDom} from 'vux'

import config from '../lib/config'

import axios from 'axios'

import { EventBus } from "../bus/event-bus.js";
import ButtonFooter from '@/components/buttonFooter'
import Comment from '@/components/comment'
import { getList, getDetail } from '@/api/index'
export default {
  directives: {
    TransferDom
  },
  components: {
    Alert,
    XButton,
    Loading,
    Box,
    ButtonFooter,
    Comment
  },
  data () {
      return {
        id: null,
        form:{
          phone: localStorage.getItem('phone') ? localStorage.getItem('phone') : '',
          clues: []
        },
        btn_text: ''
      }
  },

  mounted:function(){

  },

  activated:function(){
    this.id = this.$route.params.id
    this.getDetail(this.$route.params.id)

  },
  methods:{

     getDetail(id) {
        getDetail({id: this.$route.params.id}).then(data => { 
          console.log(data)
           this.form = data
           if (data.phone === localStorage.getItem('phone')) {
             this.btn_text = '编辑'
           } else {
             this.btn_text = '提供线索'
           }
           
        })
     },

     // 点击底部按钮
     handelClick(){
        let path = ''
        if (this.btn_text === '编辑') {
          path = '/push/' + this.id
        } else {
          path = '/clue/' + this.id
        }
        EventBus.$emit("detailEdit", this.id)
        this.$router.push({
          path: path
        })
        
     }


  }

}
</script>
<style lang="less">
  @import '../styles/main.less';
</style>
<style>
  @import '../styles/index.css';
.course_detil_img{
  width: 100%;
  max-height: auto;
}
.course_detil_startDate{
  text-align: center;
  line-height: 50px;
  background-color: #efefef
}
.course_button_box{
  position: fixed;
  bottom: 0;
  left: 0;
  right:0;
  display: -webkit-flex;
  display: flex;
  align-items:center;
}
.course_detail{
  padding-top: 10px;
  overflow: hidden
}
.course_detil_video{
  width:100%;
}
.course_detail_btn{
  text-align: center;
  line-height: 48px;
  flex-grow:1;
}
.course_detail_btn_buy{
  font-family: PingFang-SC;
  font-size: 16px;
  font-weight: 500;
  color: #FFF;
  background-color: #83c7d4;
}
.course_detail_btn_extend{
  background-color: #ff344a;
  color: #FFF;
}
.item_p{
  padding: 18px;
  padding-top: 0
}
.item_video{
  width:100%; 
  background-color: #999;
  margin-bottom: 20px;
}
.item_image{
  width:100%;
  height: auto;
}
</style>