<template>

    <div>

        <tab :animate="false">
          <tab-item :selected="item.select" @on-item-click="onItemClick(item.id)" active-class="course_tab"  v-for="item in tabs" :key="item.index">{{item.name}}</tab-item>
        </tab>
        <div v-if="list.length">
          <List :list="list" />
        </div>
        <div v-else>
          <Empty text="" />
        </div>
    </div>
</template>
<style>
</style>
<script>
import { Tab, TabItem} from 'vux'
import { getList } from '@/api/bird'
import List from '@/components/lostList'
import Empty from '@/components/empty'
export default {
  components: {
    Tab,
    TabItem,
    List,
    Empty
  },
  data (){
    return{
      list:[],
      rawList: [],
      subjects:[],
      tabs:[
        {id: 1, 'select': true, 'name':'全国'},
        {id: 2, 'select': false, 'name':'按时间'},
        // {id: 3, 'select': false, 'name':'按距离'},
        {id: 4, 'select': false, 'name':'已找回'}
      ],
      no_subject:false,
      isAllSubject:true,
      oldName:'',
      form: {
        phone: ''
      }
    }
  },
  // 组件被激活时调用
  activated:function(){
    getList(this.form).then(data => { 
       console.log(data)
       if(data) {
         this.rawList = data
         this.list = data
       }
       this.$store.dispatch('setLostList', data)
    })
  },
  mounted: function () {

  },
  methods: {
    onItemClick(i) {
      console.log(i)
      if (i == 4) {
        this.list = this.rawList.filter(item => {
          return item.status == '2'
        })
      } else if (i == 3) {
        this.list = this.rawList
      } else if (i == 2) {
        this.list = this.rawList.sort(function(a, b) {
          return parseInt(a.create_time) - parseInt(b.create_time)
        })
      } else {
        this.list = this.rawList
      }
      fundebug.notify("clickTab", "点击走失列表索引", {
          metaData: {index: i}
      });
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../styles/index.css';
.course_tab{
  color: #0091da !important;
  border-color: #0091da !important;
}
.vux-tab-selected {
  color: #83c7d4 !important;
  border-color: #83c7d4 !important;
}

</style>
